import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const categories = [
  { name: 'Agile Management', courses: 8, href: '/category/agile-management' },
  { name: 'Project Management', courses: 8, href: '/category/project-management' },
  { name: 'Software Testing', courses: 3, href: '/category/software-testing' },
  { name: 'BI & Visualization', courses: 2, href: '/category/bi-visualization' },
  { name: 'Cyber Security', courses: 7, href: '/category/cyber-security' },
  { name: 'Cloud Computing', courses: 3, href: '/category/cloud-computing' },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

const InterviewQuestions = () => {
  return (
    <div className="bg-white text-black dark:bg-[#181c2f] dark:text-white py-16 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-extrabold text-center mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-teal-400 dark:to-pink-500"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          Course Categories
        </motion.h2>
        <motion.p
          className="text-center text-gray-600 dark:text-gray-400 mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={2}
        >
          Explore learning paths to level up your skills
        </motion.p>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((category, index) => (
            <motion.a
              key={index}
              href={category.href}
              className="group bg-gray-100 dark:bg-white dark:text-black rounded-2xl p-8 text-center text-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:rotate-1"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={index + 3}
            >
              <div className="flex justify-center mb-4">
                <BookOpen className="w-10 h-10 text-blue-500 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-semibold mb-1">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.courses} Courses</p>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewQuestions;
