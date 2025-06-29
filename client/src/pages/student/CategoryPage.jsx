import React from 'react';
import { useParams, Link } from 'react-router-dom';

const courseData = {
    'agile-management': [
        { name: 'SAFe Agile', questions: 20, slug: 'SAFe' },
        { name: 'CSM', questions: 20, slug: 'CSM' },
        { name: 'CSPO', questions: 20, slug: 'CSPO' },
        { name: 'RTE', questions: 20, slug: 'RTE' },
        { name: 'Agile Leadership Masters', questions: 20, slug: 'Agile_Leadership' },
        { name: 'A-CSM', questions: 20, slug: 'A_CSM' },
        { name: 'POPM', questions: 20, slug: 'POPM' },
        { name: 'A-CSPO', questions: 20, slug: 'A_CSPO' },
    ],
    'bi-visualization': [
        { name: 'Tableau', questions: 20, slug: 'tableau' },
        { name: 'Power BI (PL-300)', questions: 20, slug: 'power-BI-(PL-300)' },
    ],
    'cloud-computing': [
        { name: 'SAA-C03', questions: 20, slug: 'SAP-C03' },
        { name: 'SAP-C01', questions: 20, slug: 'SAP-C01' },
        { name: 'AZ-900', questions: 20, slug: 'AZ-900' },
    ],
    'cyber-security': [
        { name: 'CISSP', questions: 20, slug: 'CISSP' },
        { name: 'CISA', questions: 20, slug: 'CISA' },
        { name: 'CISM', questions: 20, slug: 'CISM' },
        { name: 'CompTIA Sec+', questions: 20, slug: 'CompTIA-Sec+' },
        { name: 'CompTIA Network+', questions: 20, slug: 'CompTIA-Network+' },
        { name: 'CompTIA SecurityX', questions: 20, slug: 'CompTIA-SecurityX' },
        { name: 'CompTIA Server+', questions: 20, slug: 'CompTIA-Server+' },

    ],
    'project-management': [
        { name: 'PMP', questions: 20, slug: 'PMP' },
        { name: 'PMP Masters Program', questions: 20, slug: 'PMP-Masters-Program' },
        { name: 'PRINCE2', questions: 20, slug: 'PRINCE2' },
        { name: 'CAPM', questions: 20, slug: 'CAPM' },
        { name: 'PgMP', questions: 20, slug: 'PgMP' },
        { name: 'PMI-RMP', questions: 20, slug: 'PMI-RMP' },
        { name: 'PMI-ACP', questions: 20, slug: 'PMI-ACP' },
        { name: 'PfMP', questions: 20, slug: 'PfMP' },
    ],
    'software-testing': [
        { name: 'ISTQB', questions: 20, slug: 'ISTQB' },
        { name: 'CUCUMBER', questions: 20, slug: 'CUCUMBER' },
        { name: 'Automation Testing', questions: 20, slug: 'Automation_Testing' },
    ],
    // add more categories here
};

const CategoryPage = () => {
    const { slug } = useParams();
    const courses = courseData[slug] || [];

    const formattedTitle = slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

    return (
        <div className="min-h-screen bg-white text-black dark:bg-[#181c2f] dark:text-white py-12 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl text-center font-bold mb-10">
                    {formattedTitle} Courses
                </h2>

                {courses.length > 0 ? (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {courses.map((course, i) => (
                            <Link
                                to={`/course/${course.slug}`}
                                key={i}
                                className="no-underline"
                            >
                                <div className="bg-gray-100 dark:bg-white text-black rounded-lg p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
                                    <strong>{course.name}</strong>
                                    <br />
                                    <small className="text-sm text-gray-600">
                                        {course.questions} Questions
                                    </small>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-lg text-red-300">
                        No courses found for this category.
                    </p>
                )}

                <div className="mt-10 text-center">
                    <Link
                        to="/interview-questions"
                        className="inline-block bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                        ← Back to Categories
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
