import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Check, CheckCircle2, Lock } from "lucide-react";
import React, { useState } from "react";
import { FaCertificate, FaClock } from "react-icons/fa";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);
  const [selectedOption, setSelectedOption] = useState(null); // 👈 state for selected pricing option
  // const [selectedOption, setSelectedOption] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);


  // const handleOptionChange = (option) => {
  //   setSelectedOption(option); // Update selected option when user selects a pricing option
  // };
  const handleBatchSelect = (batch) => {
    setSelectedBatch(batch);
    setIsBatchModalOpen(false); // close popup after selection
  };
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setSelectedBatch(null); // reset batch on option change
    setIsBatchModalOpen(true); // open batch modal
  };



  if (isLoading) return <h1>Loading...</h1>;
  if (isError || !data) return <h1>Failed to load course details</h1>;

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="space-y-5">
      {/* Course Header */}
      <div
        className="text-white"
        style={{
          background: "#020024",
          backgroundImage: `linear-gradient(90deg, 
      rgb(151, 147, 215) 0%, 
      rgb(119, 101, 193) 2%, 
      rgb(92, 92, 156) 23%, 
      rgb(80, 48, 149) 37%, 
      rgb(59, 167, 188) 53%, 
      rgba(47, 130, 156, 1) 82%, 
      rgb(110, 165, 177) 91%)`
        }}
      >
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center">
            <FaCertificate className="text-yellow-400 me-2" />
            {course?.courseTitle}
          </h1>
          <p className="text-base sm:text-lg leading-relaxed">{course?.subTitle || "Course Sub-title"}</p>
          <p className="text-sm font-semibold">
            Created By{" "}
            <span className="text-blue-950 underline italic">
              {course?.creator?.name || "Instructor Name"}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {course?.createdAt?.split("T")[0]}</p>
          </div>
          {/* <p>Students enrolled: {course?.enrolledStudents?.length}</p> */}
        </div>
      </div>

      {/* Main Content */}
      {/* <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10"> */}
      <div className="flex flex-col-reverse lg:flex-row gap-6 max-w-7xl mx-auto my-5 px-4 md:px-8 lg:flex-row justify-between gap-10">

        {/* Left Side */}
        <div className="w-full lg:w-1/2 space-y-5">
          {/* Course Description */}
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: course?.description }}
          />

          <div className="relative rounded-2xl p-6 border border-[#e8e2d0] bg-[#fdf6e3] shadow-lg animate-brighten overflow-hidden transition-all duration-700 ease-in-out">
            <h1 className=" font-playfair font-semibold text-[#3d3d3d] mb-4 tracking-wide">
              🌟 Course Overview
            </h1>

            <div
              className="text-base text-[#555] font-[Poppins] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: course.courseOverview }}
            />
          </div>




          {/* Curriculum Section */}
          {/* <Card className='mt-6'>
            <CardHeader>
              <CardTitle>Curriculum</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {course?.lectures?.length > 0 ? (
                course?.lectures?.map((lecture, idx) => (
                  <div
                    key={idx}
                    className="h-20 flex items-center gap-4 px-4 rounded-xl border bg-card text-card-foreground shadow"
                  >
                    <span>
                      {true ? (
                        <div className="w-5 h-5 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </div>
                      ) : (
                        <Lock size={14} className="text-gray-600 dark:text-gray-400" />
                      )}
                    </span>
                    <p className="text-left">{lecture.lectureTitle}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No lectures available.</p>
              )}
            </CardContent>
          </Card> */}
          <Card className="mt-6">
  <CardHeader>
    <CardTitle>Curriculum</CardTitle>
  </CardHeader>
  <CardContent className="space-y-3">
    {course?.lectures?.length > 0 ? (
      course.lectures.map((lecture, idx) => (
        <div
          key={idx}
          className="h-20 flex items-center gap-4 px-4 rounded-xl border bg-card text-card-foreground shadow overflow-hidden"
        >
          <span className="flex-shrink-0">
            {true ? (
              <div className="w-5 h-5 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center">
                <Check size={12} className="text-white" />
              </div>
            ) : (
              <Lock size={14} className="text-gray-600 dark:text-gray-400" />
            )}
          </span>
          <p className="text-left text-sm font-medium truncate w-full">
            {lecture.lectureTitle}
          </p>
        </div>
      ))
    ) : (
      <p className="text-gray-500">No lectures available.</p>
    )}
  </CardContent>
</Card>

        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">

              {/* Course Video */}
              <div className="w-full aspect-video mb-4">
                {course?.lectures?.[0]?.videoUrl ? (
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    url={course.lectures[0].videoUrl}
                    controls={true}
                    light={course?.courseThumbnail || "/default-thumbnail.jpg"}
                  />
                ) : (
                  <img
                    src={course?.courseThumbnail || "/default-thumbnail.jpg"}
                    alt="Course Thumbnail"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>


              {/* Course Highlights */}
              {[
                "Boost Your Skills, Elevate Your Career!",
                "Your Growth Starts Here!",
                "Turn Knowledge into Action!",
                "Learn Fast, Earn Faster!",
              ].map((text, index) => (
                <div className="flex items-center mt-[15px]" key={index}>
                  <CheckCircle2 size={24} className="text-green-500 mx-2" />
                  <h1>{text}</h1>
                </div>
              ))}

              <Separator className="my-4" />

              {/* Pricing Options */}
              {/* <h1 className="text-lg md:text-xl font-semibold mb-2">Pricing Options</h1>
              <div className="space-y-2">
                {course?.pricingOptions?.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-3 cursor-pointer border rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <input
                      type="radio"
                      name="pricingOption"
                      value={option.optionName}
                      onChange={() => handleOptionChange(option)}
                      checked={selectedOption?.optionName === option.optionName}
                    />
                    <div className="flex justify-between w-full">
                      <span>{option.optionName}</span>
                      <span className="font-semibold">${option.price}</span>
                    </div>
                  </label>
                ))}
              </div> */}
              {/* Pricing Options */}
              <h1 className="text-lg md:text-xl font-semibold mb-2">Pricing Options</h1>
              <div className="space-y-2">
                {course?.pricingOptions?.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-3 cursor-pointer border rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <input
                      type="radio"
                      name="pricingOption"
                      value={option.optionName}
                      onChange={() => {
                        handleOptionChange(option);
                        setSelectedBatch(null); // Reset batch selection when option changes
                        setIsBatchModalOpen(true); // Open batch selection modal immediately
                      }}
                      checked={selectedOption?.optionName === option.optionName}
                    />
                    <div className="flex justify-between w-full">
                      <span>{option.optionName}</span>
                      <span className="font-semibold">${option.price}</span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Show selected batch info */}
              {selectedBatch && (
                <div className="mt-2 text-sm text-green-600">
                  Selected Batch: <strong>{selectedBatch.batchName}</strong> ({selectedBatch.startDate} - {selectedBatch.endDate})
                </div>
              )}

              {/* Batch Selection Modal */}
              {isBatchModalOpen && selectedOption && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn"
                  aria-modal="true"
                  role="dialog"
                  aria-labelledby="batch-selection-title"
                >
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl max-w-lg w-full p-8 space-y-6">
                    <h2
                      id="batch-selection-title"
                      className="text-xl sm:text-2xl font-bold text-blue-900 flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left"
                    >
                      <img
                        src={course.courseThumbnail}
                        alt={course.courseTitle}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <span>
                        Select Batch for <span className="text-blue-700">{selectedOption.optionName}</span>
                      </span>
                    </h2>



                    {selectedOption.batches && selectedOption.batches.length > 0 ? (
                      <ul className="space-y-4 max-h-72 overflow-y-auto pr-2">
                        {selectedOption.batches.map((batch, idx) => (
                          <li key={batch._id || idx}>
                            <label
                              htmlFor={`batch-${batch._id || idx}`}
                              className={`flex items-center cursor-pointer rounded-lg p-3 transition 
                  ${selectedBatch?._id === batch._id
                                  ? "bg-blue-100 border border-blue-400 shadow-md"
                                  : "hover:bg-blue-50"
                                }`}
                            >
                              <input
                                id={`batch-${batch._id || idx}`}
                                type="radio"
                                name="batch"
                                value={batch.batchName}
                                onChange={() => handleBatchSelect(batch)}
                                checked={selectedBatch?._id === batch._id}
                                className="hidden"
                              />
                              <div
                                className={`w-5 h-5 flex justify-center items-center rounded-full border-2 transition
                    ${selectedBatch?._id === batch._id
                                    ? "border-blue-600 bg-blue-600"
                                    : "border-gray-300"
                                  }`}
                                aria-hidden="true"
                              >
                                {selectedBatch?._id === batch._id && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                              <div className="ml-4">
                                <p className="font-semibold text-blue-900">{batch.batchName}</p>
                                <p className="text-sm text-gray-500">
                                  {batch.startDate} - {batch.endDate}
                                </p>
                              </div>
                            </label>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-center italic">No batches available for this pricing option.</p>
                    )}

                    {/* Disable "Cancel" button if no batch is selected */}
                    <div className="flex justify-end space-x-4">
                      {/* <button
          onClick={() => {
            if (selectedBatch) {
              setIsBatchModalOpen(false);
            } else {
              alert("Please select a batch before proceeding.");
            }
          }}
          className={`px-6 py-2 rounded-full font-semibold transition
            ${selectedBatch ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          disabled={!selectedBatch}
        >
          Confirm
                        </button> */}
                      <button
                        onClick={() => {
                          // Optional: allow cancel only if no batch is selected
                          if (!selectedBatch) {
                            setIsBatchModalOpen(false);
                            // setSelectedOption(null); // Optionally clear option if canceling batch selection
                          } else {
                            alert("Please confirm your batch selection.");
                          }
                        }}
                        className="px-6 py-2 rounded-full bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}


            </CardContent>

            {/* Action Button */}
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button onClick={handleContinueCourse} className="w-full">
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} selectedOption={selectedOption} />
              )}
            </CardFooter>

          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;



