// import { Skeleton } from "@/components/ui/skeleton";
// import React from "react";
// import Course from "./Course";
// import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
 
// const Courses = () => {
//   const {data, isLoading, isError} = useGetPublishedCourseQuery();
 
//   if(isError) return <h1>Some error occurred while fetching courses.</h1>

//   return (
//     <div className="bg-gray-50 dark:bg-[#141414]">
//       <div className="max-w-7xl mx-auto p-6">
//         <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {isLoading ? (
//             Array.from({ length: 8 }).map((_, index) => (
//               <CourseSkeleton key={index} />
//             ))
//           ) : (
//            data?.courses && data.courses.map((course, index) => <Course key={index} course={course}/>) 
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Courses;

// const CourseSkeleton = () => {
//   return (
//     <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
//       <Skeleton className="w-full h-36" />
//       <div className="px-5 py-4 space-y-3">
//         <Skeleton className="h-6 w-3/4" />
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Skeleton className="h-6 w-6 rounded-full" />
//             <Skeleton className="h-4 w-20" />
//           </div>
//           <Skeleton className="h-4 w-16" />
//         </div>
//         <Skeleton className="h-4 w-1/4" />
//       </div>
//     </div>
//   );
// };

// import { Skeleton } from "@/components/ui/skeleton";
// import React, { useRef } from "react";
// import Course from "./Course";
// import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // <-- arrow icons

// const Courses = () => {
//   const { data, isLoading, isError } = useGetPublishedCourseQuery();
//   const scrollRef = useRef(null); // <-- reference for scrolling

//   if (isError) return <h1>Some error occurred while fetching courses.</h1>;

//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       const scrollAmount = 250; // adjust scroll amount (good for mobile too)
//       if (direction === "left") {
//         scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
//       } else {
//         scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
//       }
//     }
//   };

//   return (
//     <div className="bg-gray-50 dark:bg-[#141414]">
//       <div className="max-w-7xl mx-auto p-6 relative">
//         <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>

//         {/* Arrow Buttons - Now visible on Mobile also */}
//         <button
//           onClick={() => scroll("left")}
//           className="flex items-center justify-center absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-black shadow p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
//         >
//           <FaChevronLeft />
//         </button>
//         <button
//           onClick={() => scroll("right")}
//           className="flex items-center justify-center absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-black shadow p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
//         >
//           <FaChevronRight />
//         </button>

//         {/* Scrollable container */}
//         <div
//           ref={scrollRef}
//           className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide py-4"
//         >
//           {isLoading
//             ? Array.from({ length: 8 }).map((_, index) => (
//                 <div key={index} className="min-w-[250px] sm:min-w-[300px]">
//                   <CourseSkeleton />
//                 </div>
//               ))
//             : data?.courses &&
//               data.courses.map((course, index) => (
//                 <div key={index} className="min-w-[250px] sm:min-w-[300px]">
//                   <Course course={course} />
//                 </div>
//               ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Courses;

// const CourseSkeleton = () => {
//   return (
//     <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
//       <Skeleton className="w-full h-36" />
//       <div className="px-5 py-4 space-y-3">
//         <Skeleton className="h-6 w-3/4" />
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Skeleton className="h-6 w-6 rounded-full" />
//             <Skeleton className="h-4 w-20" />
//           </div>
//           <Skeleton className="h-4 w-16" />
//         </div>
//         <Skeleton className="h-4 w-1/4" />
//       </div>
//     </div>
//   );
// };



// import { Skeleton } from "@/components/ui/skeleton";
// import React, { useRef, useState } from "react";
// import Course from "./Course";
// import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// const Courses = () => {
//   const { data, isLoading, isError } = useGetPublishedCourseQuery();
//   const scrollRef = useRef(null);
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       const scrollAmount = 250;
//       scrollRef.current.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   const allCourses = data?.courses || [];

//   // Extract unique categories
//   const categories = ["All", ...new Set(allCourses.map(course => course.category))];

//   // Filtered courses based on selected category
//   const filteredCourses =
//     selectedCategory === "All"
//       ? allCourses
//       : allCourses.filter(course => course.category === selectedCategory);

//   if (isError) return <h1>Error fetching courses.</h1>;

//   return (
//     <div className="bg-gray-50 dark:bg-[#141414]">
//       <div className="max-w-7xl mx-auto p-6 relative">
//         <h2 className="font-bold text-3xl text-center mb-6">Our Courses</h2>

//         {/* Category Selector */}
//         <div className="flex flex-wrap justify-center gap-3 mb-6">
//           {categories.map((cat, idx) => (
//             <button
//               key={idx}
//               onClick={() => setSelectedCategory(cat)}
//               className={`px-4 py-2 rounded-full border text-sm ${
//                 selectedCategory === cat
//                   ? "bg-indigo-600 text-white"
//                   : "bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* Arrow Buttons */}
//         <button
//           onClick={() => scroll("left")}
//           className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-black shadow p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
//         >
//           <FaChevronLeft />
//         </button>
//         <button
//           onClick={() => scroll("right")}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-black shadow p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
//         >
//           <FaChevronRight />
//         </button>

//         {/* Slider */}
//         <div
//           ref={scrollRef}
//           className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide py-4"
//         >
//           {isLoading
//             ? Array.from({ length: 8 }).map((_, index) => (
//                 <div key={index} className="min-w-[250px] sm:min-w-[300px]">
//                   <CourseSkeleton />
//                 </div>
//               ))
//             : filteredCourses.map((course, index) => (
//                 <div key={index} className="min-w-[250px] sm:min-w-[300px]">
//                   <Course course={course} />
//                 </div>
//               ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Courses;

// const CourseSkeleton = () => (
//   <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
//     <Skeleton className="w-full h-36" />
//     <div className="px-5 py-4 space-y-3">
//       <Skeleton className="h-6 w-3/4" />
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <Skeleton className="h-6 w-6 rounded-full" />
//           <Skeleton className="h-4 w-20" />
//         </div>
//         <Skeleton className="h-4 w-16" />
//       </div>
//       <Skeleton className="h-4 w-1/4" />
//     </div>
//   </div>
// );

import React, { useRef, useState } from "react";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Course from "./Course";
import { Skeleton } from "@/components/ui/skeleton";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryScrollRef = useRef(null);

  const allCourses = data?.courses || [];
  const allCategories = ["All", ...new Set(allCourses.map(c => c.category))];

  const filteredCourses =
    selectedCategory === "All"
      ? allCourses
      : allCourses.filter(c => c.category === selectedCategory);

  const chunkCourses = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const paginatedCourses = chunkCourses(filteredCourses, 6);
  const disableCourseNavigation = filteredCourses.length <= 6;

  const scrollCategory = (dir) => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({
        left: dir === "left" ? -250 : 250,
        behavior: "smooth",
      });
    }
  };

  const handleSlide = (dir) => {
    if (dir === "left" && pageIndex > 0) {
      setPageIndex(prev => prev - 1);
    } else if (dir === "right" && pageIndex < paginatedCourses.length - 1) {
      setPageIndex(prev => prev + 1);
    }
  };

  if (isError) return <h1 className="text-white">Error loading courses</h1>;

  return (
    <div className="dark:bg-[#141414] py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-200 mb-6">
          Our Courses
        </h2>

        {/* Category Slider */}
        <div className="relative mb-8">
          <button
            onClick={() => scrollCategory("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-99 p-2 rounded-full bg-white dark:bg-gray-700 shadow hover:bg-gray-200"
          >
            <FaChevronLeft />
          </button>

          <div
            ref={categoryScrollRef}
            className="flex overflow-x-auto no-scrollbar gap-4 px-12"
          >
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setPageIndex(0);
                }}
                className={`px-4 py-2 whitespace-nowrap rounded-full border text-sm transition ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-white border-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollCategory("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-99 p-2 rounded-full bg-white dark:bg-gray-700 shadow hover:bg-gray-200"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Course Slider */}
        <div className="relative overflow-hidden">
          <button
            onClick={() => handleSlide("left")}
            disabled={pageIndex === 0 || disableCourseNavigation}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-99 p-2 rounded-full bg-white dark:bg-gray-700 shadow hover:bg-gray-200 disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>

          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${pageIndex * 100}%)` }}
            >
              {paginatedCourses.map((group, idx) => (
                <div
                key={idx}
                className="w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                style={{ gap: 0 }} // no gap here
              >
                {group.map((course, i) => (
                  <div key={i} className="p-4"> {/* padding inside card */}
                    <Course course={course} />
                  </div>
                ))}
              </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleSlide("right")}
            disabled={pageIndex === paginatedCourses.length - 1 || disableCourseNavigation}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-99 p-2 rounded-full bg-white dark:bg-gray-700 shadow hover:bg-gray-200 disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Courses;


const CourseSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
    <Skeleton className="w-full h-36" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-16" />
    </div>
  </div>
);
