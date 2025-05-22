import Razorpay from "razorpay";
import nodemailer from 'nodemailer'; // Import nodemailer
import crypto from "crypto";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ------------------------------
// 1. CREATE CHECKOUT
// ------------------------------

// Inside backend route: purchaseController.js or route handler
export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const courseId = req.body.courseId;
    const selectedOptionName = req.body.selectedOptionName;

    // Validate if selectedOptionName is provided
    if (!selectedOptionName) {
      return res.status(400).json({ message: "Selected option name is required!" });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });

    console.log('Course pricing options:', course.pricingOptions);

    const selectedOption = course.pricingOptions?.find(option => option.optionName === selectedOptionName);
    if (!selectedOption) {
      return res.status(400).json({ message: "Selected pricing option not found!" });
    }

    const amountUSD = selectedOption.price;
    const amountInCents = Math.round(amountUSD * 100);

    // Construct the receipt ID ensuring it is no more than 40 characters
    let receipt = `${courseId}-${selectedOptionName}`;
    if (receipt.length > 40) {
      receipt = receipt.substring(0, 40);  // Truncate to 40 characters
    }

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInCents,
      currency: "USD",
      receipt: receipt,
      payment_capture: 1,
    });

    return res.status(200).json({
      success: true,
      orderId: razorpayOrder.id,
      amount: amountInCents,
      currency: "USD",
      key: process.env.RAZORPAY_KEY_ID,
      courseTitle: course.courseTitle,
      thumbnail: course.courseThumbnail,
      selectedOptionName: selectedOption.optionName,
    });
  } catch (error) {
    console.error("Checkout Error:", error);
    return res.status(500).json({
      message: "Razorpay error",
      error: error.message,
      stack: error.stack,
      razorpayError: error.error, // This may contain detailed Razorpay error
    });
  }
};


export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, courseId, selectedPricingOption } = req.body;
    const userId = req.id;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !courseId || !userId) {
      return res.status(400).json({ message: "Missing required parameters!" });
    }

    // Create Razorpay instance with credentials
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    // Fetch payment details using Razorpay API
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    // Check if payment was successful
    if (payment.status === 'captured') {
      // Get user and course details from the database
      const user = await User.findById(userId);
      const course = await Course.findById(courseId);

      if (!user || !course) {
        return res.status(404).json({ message: "User or Course not found!" });
      }

      // Select the first pricing option from the course (or loop through all)
      const pricingOptions = course.pricingOptions;  // All pricing options

      if (!pricingOptions || pricingOptions.length === 0) {
        return res.status(404).json({ message: "No pricing options found!" });
      }

      // Save the purchase in the CoursePurchase model
      await CoursePurchase.create({
        courseId,
        userId,
        amount: payment.amount / 100,  // Convert amount from cents to USD
        status: "completed",
        paymentId: razorpay_payment_id,
        // pricingOption: pricingOptions.map(option => option.optionName).join(", "), // Store all option names
        pricingOption: selectedPricingOption, 
      });

      // Setup nodemailer transporter for email sending
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.SMTP_EMAIL, // your email
          pass: process.env.SMTP_PASSWORD, // your email password or app password
        },
      });

      // Prepare email content
      const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: process.env.ADMIN_EMAIL,  // admin email
        subject: 'New Course Purchase',
        html: `
          <h3>New Course Purchase</h3>
          <p><strong>User Email:</strong> ${user.email}</p>
          <p><strong>Course Name:</strong> ${course.courseTitle}</p>
           <p><strong>Pricing Option:</strong> ${selectedPricingOption}</p>
          <p><strong>Price:</strong> $${(payment.amount / 100).toFixed(2)}</p>  <!-- Display price in USD -->
        `,
      };

      // Send email notification
      await transporter.sendMail(mailOptions);

      return res.status(200).json({ message: "Payment verified and email sent successfully!" });
    } else {
      return res.status(400).json({ message: "Payment verification failed!" });
    }
  } catch (error) {
    console.error("Payment Verify Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};




export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate("creator")
      .populate("lectures");

    if (!course) return res.status(404).json({ message: "Course not found!" });

    const purchase = await CoursePurchase.findOne({
      userId,
      courseId,
      status: "completed", // ✅ Only completed purchases
    });

    return res.status(200).json({
      course,
      purchased: !!purchase,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ------------------------------
// 4. GET ALL PURCHASED COURSES
// ------------------------------
export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");

    return res.status(200).json({
      purchasedCourse: purchasedCourse || [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
