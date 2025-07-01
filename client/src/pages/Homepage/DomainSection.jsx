import { Code, Database, Cloud, BarChart3, Shield, Clock } from "lucide-react";

const domains = [
  {
    id: 1,
    name: "BI and Visualization",
    icon: <BarChart3 className="h-6 w-6 text-blue-400 dark:text-blue-300" />,
    color: "bg-blue-100 dark:bg-blue-900",
    // link: "#",
  },
  {
    id: 2,
    name: "Programming",
    icon: <Code className="h-6 w-6 text-green-400 dark:text-green-300" />,
    color: "bg-green-100 dark:bg-green-900",
    // link: "#",
  },
  {
    id: 3,
    name: "IT Service Management",
    icon: <Clock className="h-6 w-6 text-purple-400 dark:text-purple-300" />,
    color: "bg-purple-100 dark:bg-purple-900",
    // link: "#",
  },
  {
    id: 4,
    name: "Quality",
    icon: <Shield className="h-6 w-6 text-yellow-400 dark:text-yellow-300" />,
    color: "bg-yellow-100 dark:bg-yellow-900",
    // link: "#",
  },
  {
    id: 5,
    name: "Business Management",
    icon: <BarChart3 className="h-6 w-6 text-red-400 dark:text-red-300" />,
    color: "bg-red-100 dark:bg-red-900",
    // link: "#",
  },
  {
    id: 6,
    name: "Cybersecurity",
    icon: <Shield className="h-6 w-6 text-indigo-400 dark:text-indigo-300" />,
    color: "bg-indigo-100 dark:bg-indigo-900",
    // link: "#",
  },
  {
    id: 7,
    name: "Cloud Computing",
    icon: <Cloud className="h-6 w-6 text-blue-400 dark:text-blue-300" />,
    color: "bg-blue-100 dark:bg-blue-900",
    // link: "#",
  },
  {
    id: 8,
    name: "Data Science",
    icon: <Database className="h-6 w-6 text-purple-400 dark:text-purple-300" />,
    color: "bg-purple-100 dark:bg-purple-900",
    // link: "#",
  },
];

export default function DomainsSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900" id="domains">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Heading */}
    <div className="text-center mb-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        High-Impact Skills for the Future of Work
      </h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-sm sm:text-base">
        Choose From 25+ In-Demand Domains
      </p>
      <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-2 text-sm sm:text-base">
        Our immersive courses in booming fields like Data Science, AI, and Cloud Computing provide you
        with the practical knowledge and experience you need to succeed in the ever-evolving job market.
        Don&apos;t just learn — get future-ready with <strong>The EduOcean</strong>.
      </p>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {domains.map((domain) => (
        <a
          key={domain.id}
          className={`${domain.color} rounded-lg p-5 sm:p-6 flex flex-col items-center justify-center text-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-md dark:hover:shadow-lg`}
        >
          <div className="mb-3 sm:mb-4 text-2xl sm:text-3xl">{domain.icon}</div>
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-100">
            {domain.name}
          </h3>
        </a>
      ))}
    </div>
  </div>
</section>

  );
}
