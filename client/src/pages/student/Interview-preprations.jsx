import React from 'react';

const Interview = () => {
  return (
    <div className="text-gray-800">
      {/* Header Image with Overlay */}
      <div className="w-full h-[400px] relative rounded-lg overflow-hidden my-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://www.unitasterdays.com/bespoke-pages/bpid161/img2020430275.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 text-white">
          <p className="text-5xl font-semibold mb-5">Interview Preparation</p>
          <h2 className="text-xl font-medium">You have all the assets to reach this goal.</h2>
          <h2 className="text-xl font-medium">I am looking forward to hearing good news about this interview!</h2>
        </div>
      </div>

      {/* Interview Preparation Block */}
      <div className="bg-white shadow-xl rounded-lg mx-4 md:mx-10 my-10 flex flex-col md:flex-row overflow-hidden">
        {/* Text */}
        <div className="md:w-1/2 p-6">
          <h1 className="text-center text-3xl font-bold mb-4">Interview Preparation</h1>
          <p className="text-lg leading-relaxed">
            Interview preparing is an important asset for anybody hoping to further develop their meeting
            abilities and increment their odds of coming out on top in genuine meetings.
          </p>
        </div>
        {/* Image */}
        <div className="md:w-1/2 p-4 flex items-center justify-center">
          <img
            src="https://icdb.info/wp-content/uploads/2019/02/2.jpg"
            alt="Exam Prep"
            className="w-full max-w-[700px] h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Interview Details */}
      <div className="max-w-7xl mx-auto px-5 py-10">
        <p className="text-lg leading-8">
          <b className="text-2xl">Practice:</b> Interview preparing permit you to rehearse your meeting skills and get
          feedback on your performance. This can help you become more comfortable and confident in real interviews.
          <br />
          <b className="text-2xl">Feedback:</b> Interview preparing gives an opportunity to receive input from an experienced
          professional. This can help you identify areas for improvement and learn new ways to answer questions.
        </p>

        <p className="text-lg leading-8 mt-4">
          <b className="text-2xl">Realistic simulation:</b> Simulates real interviews to give a better understanding of what
          to expect and how to prepare.
        </p>

        <p className="text-lg leading-8 mt-4">
          <b className="text-2xl">Customized training:</b> Focuses on specific skills or weaknesses. Includes:
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>3000+ real interview questions from top companies (FAANG)</li>
            <li>Tech interview handbook with detailed knowledge</li>
            <li>Mock interview with a Silicon Valley engineer (45–60 mins)</li>
            <li>Detailed strategy shared before and feedback after session</li>
            <li>Optional: Resume feedback to enhance your CV</li>
          </ul>
        </p>

        <p className="text-lg leading-8 mt-4">
          All of these are available for a flat fee, with no hidden costs.
        </p>

        {/* Technical Interview Section */}
        <h3 className="text-2xl font-semibold mt-10">What is a Technical Interview?</h3>
        <p className="text-lg leading-8 mt-2">
          Technical Interviews are unpredictable and can include various types of questions like behavioral, situational,
          technical skills, certifications, and project-based discussions. Here are some examples:
        </p>

        <ol className="list-decimal list-inside text-lg leading-8 mt-4 space-y-2">
          <li>Which programming languages do you use regularly in your work?</li>
          <li>Do you have any technical certifications that make you qualified for this job?</li>
          <li>Can you explain the most rewarding project you have worked on and your role in it?</li>
          <li>What steps do you take to ensure accurate estimates for a project?</li>
          <li>Are you familiar with two-tier architecture? Explain its elements and uses.</li>
        </ol>

        <h3 className="text-2xl font-semibold mt-10">How to Prepare for a Technical Interview?</h3>
        <ul className="list-disc list-inside text-lg leading-8 mt-4 space-y-2">
          <li>Study the job description thoroughly to know what to prepare.</li>
          <li>Focus on problem-solving and logical thinking techniques.</li>
          <li>Ask questions when a question is unclear, or probe deeper if needed.</li>
          <li>Practice coding challenges and brain teasers regularly.</li>
        </ul>
      </div>
    </div>
  );
};

export default Interview;
