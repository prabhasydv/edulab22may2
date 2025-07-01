import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// const mockQuestions = {
//     'PMI-ACP': {
//         beginner: [
//             "How do you align portfolio components with organizational strategy?",
//             "What techniques do you use to prioritize components within a portfolio?",
//             "How do you manage resource conflicts across portfolio components?",
//             "Describe your approach to portfolio risk management.",
//             "How do you ensure portfolio governance is effective?",
//         ],
//         advanced: [
//             "How do you drive strategic agility within portfolio management in a dynamic business environment?",
//             "Describe your approach to optimizing portfolio value across competing business units.",
//             "How do you integrate portfolio governance with enterprise risk management (ERM) frameworks?",
//             "How do you measure and communicate the cumulative value of portfolio investments to executive leadership?",
//         ],
//     },
//     'A_CSM': {
//         beginner: [
//             "How do you facilitate self-organization within Scrum Teams?",
//             "What techniques do you use to improve team dynamics and collaboration?",
//             "How do you handle scenarios where stakeholders disrupt Sprint commitments?",
//             "What’s your approach to coaching a Scrum Team through a challenging Sprint Retrospective?",
//             "How do you help Product Owners improve their backlog refinement practices?",
//             "What is your role in managing cross-team dependencies in multi-team Scrum environments?",
//             "How do you balance the needs for delivery speed with sustainable pace in Scrum Teams?",
//             "What methods do you use to make impediments visible and resolved efficiently?",
//             "How do you measure the effectiveness of Scrum implementation?",
//             "Describe how you coach teams in adopting technical excellence while following Scrum.",
//         ],
//         advanced: [
//             "How do you coach leadership to support Agile adoption at the enterprise level?",
//             "What strategies do you apply to resolve deeply rooted organizational impediments?",
//             "Describe how you promote and sustain a culture of continuous improvement across multiple teams.",
//             "How do you enable high-performing Scrum Teams to scale without losing autonomy?",
//             "What techniques do you apply to mentor Scrum Masters and Agile Coaches in a scaling environment?",
//             "How do you address resistance from experienced team members during Agile transformation?",
//             "What is your role in enabling technical excellence while focusing on Scrum process maturity?",
//             "How do you influence organizational design to better support Scrum?",
//             "How do you measure your impact as an Agile leader or ScrumMaster at scale?",
//             "Describe your approach to facilitating organizational change that aligns with Agile values.",
//         ],
//     },
//     'A_CSPO': {
//         beginner: [
//             "How do you ensure that product backlog items deliver measurable value?",
//             "Describe how you balance stakeholder requests with long-term product vision.",
//             "How do you refine and maintain the product backlog to maximize transparency?",
//             "What techniques do you use to effectively communicate product goals to the Scrum Team?",
//             "How do you incorporate customer feedback into backlog prioritization?",
//             "What is your approach to managing dependencies across multiple Scrum Teams?",
//             "How do you ensure backlog items are INVEST-compliant (Independent, Negotiable, Valuable, Estimable, Small, Testable)?",
//             "How do you handle conflicting priorities among stakeholders?",
//             "What is your role in facilitating Sprint Reviews for maximum business impact?",
//             "How do you ensure alignment between the Definition of Done and product quality expectations?",
//         ],
//         advanced: [
//             "How do you align product strategy with organizational goals in a scaled Agile environment?",
//             "Describe how you manage value delivery when multiple teams contribute to a complex product.",
//             "How do you incorporate quantitative and qualitative data into strategic backlog prioritization?",
//             "What is your approach to balancing innovation with managing technical debt?",
//             "How do you facilitate alignment among diverse stakeholders with conflicting objectives?",
//             "What techniques do you apply to ensure continuous discovery and delivery?",
//             "How do you ensure compliance and regulatory requirements are met without impacting agility?",
//             "How do you influence organizational culture to support Agile product ownership?",
//             "Describe your role in optimizing flow across the entire value stream.",
//             "How do you measure the success of your product beyond standard delivery metrics?",
//         ],
//     },
//     'Agile_Leadership': {
//         beginner: [
//             "How do you model Agile leadership behaviors within your organization?",
//             "How do you create an environment that promotes self-organization in teams?",
//             "What is your approach to handling resistance to Agile transformation at the team or middle management level?",
//             "How do you measure the success of your Agile leadership efforts?",
//             "How do you balance alignment with autonomy across multiple Agile teams?",
//             "What practices do you use to cultivate a culture of continuous learning?",
//             "How do you facilitate cross-team collaboration in a scaled Agile environment?",
//             "Describe how you encourage innovation while maintaining focus on delivery.",
//             "How do you ensure psychological safety in your teams?",
//             "How do you support Agile teams in aligning with business outcomes rather than just outputs?",
//         ],
//         advanced: [
//             "How do you drive enterprise-level Agile transformation beyond individual teams?",
//             "Describe how you foster systems thinking as an Agile leader.",
//             "How do you lead in an environment of high uncertainty and frequent market disruptions?",
//             "What approaches do you use to shift leadership mindsets across the organization?",
//             "How do you integrate Lean Portfolio Management into Agile leadership at scale?",
//             "Describe how you enable innovation and operational excellence simultaneously.",
//             "How do you measure leadership effectiveness in an Agile enterprise?",
//             "How do you handle conflicts between business priorities and Agile team autonomy?",
//             "What’s your approach to embedding continuous improvement at an organizational level?",
//             "How do you ensure Agile leadership principles are sustained as the organization scales?",
//         ]
//     },

//     'Automation_Testing': {
//         beginner: [
//             "How do you design an automation testing framework that is scalable and maintainable across large teams?",
//             "What strategies do you use to ensure automation reliability and reduce flaky tests?",
//             "How do you implement parallel execution, and what challenges have you addressed?",
//             "What is your approach to integrating automation tests within CI/CD pipelines?",
//             "Describe your experience with integrating automation tools for API and UI validation in unified test strategies.",
//             "How do you ensure automation frameworks remain adaptable to evolving technologies and requirements?",
//             "How do you manage test data for automation in complex environments?",
//             "What reporting and analytics strategies do you implement for automation results?",
//             "How do you approach testing of applications with dynamic content and asynchronous operations?",
//             "What is your strategy for automation in microservices or cloud-native architectures?"
//         ],
//         advanced: [
//             "How do you architect an automation testing solution that supports multi-layer, cross-technology, and distributed system validation?",
//             "What’s your approach to implementing AI/ML capabilities in automation testing?",
//             "Explain your strategy for achieving continuous testing in large-scale DevOps environments.",
//             "How do you design automation to validate microservices in event-driven architectures?",
//             "What are the key considerations when implementing automation in a multi-cloud or hybrid-cloud environment?",
//             "Describe your approach to test data strategy for enterprise-level automation across multiple systems.",
//             "How do you ensure automation aligns with compliance, security, and regulatory requirements?",
//             "How do you design automation for high-availability systems with zero-downtime deployments?",
//             "How do you apply observability principles in automation testing?",
//             "How do you future-proof your automation framework for emerging trends like serverless, edge computing, and quantum-safe validation?"
//         ]
//     },
//     'AZ-900': {
//         beginner: [
//             "Can you explain the shared responsibility model in Azure, and why it is important?",
//             "How would you differentiate between Azure regions, availability zones, and resource groups?",
//             "Describe the key differences between Platform as a Service (PaaS) and Infrastructure as a Service (IaaS) in Azure.",
//             "How does Azure ensure data protection and privacy for its customers?",
//             "Explain how Azure pricing works and how cost optimization can be achieved.",
//             "What is Azure Resource Manager (ARM), and how does it support cloud governance?",
//             "Can you describe Azure’s approach to high availability and disaster recovery?",
//             "What are Azure Policies and how do they contribute to compliance?",
//             "How would you secure identities and access management within Azure?",
//             "What is the purpose of Azure Monitor, and how does it support operational excellence?"
//         ],
//         advanced: [
//             "How would you design a governance strategy in Azure for a large enterprise with multiple subscriptions?",
//             "How do Azure Availability Zones differ from region pairing, and how would you leverage both in a high availability architecture?",
//             "Explain how Azure supports hybrid cloud and multicloud strategies while maintaining security and operational consistency.",
//             "In what scenarios would you recommend Azure Reserved Instances (RIs), and how do they impact cost management?",
//             "How can Azure help an organization meet regulatory compliance requirements in highly regulated industries?",
//             "How would you ensure secure and efficient identity federation between on-premises directories and Azure AD?",
//             "Describe the role of Azure Resource Locks and when they should be applied in a production environment.",
//             "How does Azure Monitor integrate with other Azure services to provide end-to-end observability?",
//             "What strategies would you use to design a secure data lake in Azure that supports both structured and unstructured data?",
//             "How does Azure’s pricing calculator and Total Cost of Ownership (TCO) tool assist in strategic decision-making?"
//         ]
//     },
//     'CAPM': {
//         beginner: [
//             "How do the process groups interact throughout a project’s life cycle?",
//             "What is the significance of the Project Charter in CAPM?",
//             "How would you differentiate between a risk and an issue in a project context?",
//             "What is the purpose of a Work Breakdown Structure (WBS) in CAPM?",
//             "How do you approach stakeholder management in CAPM?",
//             "Explain the importance of lessons learned in CAPM projects.",
//             "What is the difference between qualitative and quantitative risk analysis?",
//             "How do you ensure effective change control within a CAPM framework?",
//             "Describe how earned value management (EVM) supports project performance tracking.",
//             "How do you ensure project scope is effectively managed?"
//         ],
//         advanced: [
//             "How do you align project objectives with organizational strategy within the CAPM framework?",
//             "What approach do you take to integrate CAPM knowledge areas in complex projects?",
//             "How do you tailor CAPM processes for high-risk or innovative projects?",
//             "Describe how you ensure robust stakeholder engagement in politically complex environments.",
//             "How would you apply CAPM concepts to manage virtual or geographically dispersed teams?",
//             "How do you apply integrated change control to large-scale, multi-phase projects?",
//             "How do you use EVM data to influence executive decision-making?",
//             "How do you ensure continuous alignment of the project’s scope with evolving business needs?",
//             "What strategies do you apply to manage integration of multiple vendors or third parties?",
//             "How do you manage knowledge transfer and organizational learning at project closure?"
//         ]
//     },
// };


const mockQuestions = {
    'CAPM': {
        beginner: [
            {
                question: "How do the process groups interact throughout a project’s life cycle?",
                answer: "The five process groups—Initiating, Planning, Executing, Monitoring & Controlling, and Closing—are interdependent and often iterative. They ensure structured progression, where outputs of one group become inputs for another, facilitating continuous alignment with project objectives.",
            },
            {
                question: "What is the significance of the Project Charter in CAPM?",
                answer: "The Project Charter formally authorizes the project, granting the project manager authority to apply organizational resources. It provides a high-level overview of objectives, stakeholders, and key constraints, setting the foundation for detailed planning.",
            },
            // Add more beginner Q&A here...
        ],
        advanced: [
            {
                question: "How do you align project objectives with organizational strategy within the CAPM framework?",
                answer: "I ensure that project objectives are directly traceable to organizational goals by collaborating with sponsors and stakeholders during initiation. The Business Case and Project Charter serve as alignment tools, while the project plan maintains this alignment through measurable success criteria.",
            },
            // Add more advanced Q&A here...
        ]
    },
    // Add other course categories like A_CSM, AZ-900, etc., following the same format.
};


const CourseQuestions = () => {
    const { slug } = useParams();
    const [tab, setTab] = useState('beginner');
    const [openIndex, setOpenIndex] = useState(null);

    const courseTitle = slug.replace(/-/g, ' ').toUpperCase();
    const courseData = mockQuestions[slug] || { beginner: [], advanced: [] };

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-gray-100 dark:bg-[#181c2f] text-black dark:text-white min-h-screen py-12 px-4 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-6">
                    {courseTitle} Interview Questions
                </h2>

                {/* Tabs */}
                <div className="flex justify-center gap-6 mb-8 border-b border-gray-300 dark:border-gray-600">
                    {['beginner', 'advanced'].map((label) => (
                        <button
                            key={label}
                            onClick={() => {
                                setTab(label);
                                setOpenIndex(null);
                            }}
                            className={`px-4 py-2 font-semibold capitalize ${
                                tab === label
                                    ? 'border-b-4 border-black dark:border-white'
                                    : 'text-gray-500 dark:text-gray-400'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Questions */}
                <div className="space-y-4">
                    {courseData[tab].length > 0 ? (
                        courseData[tab].map((item, i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                                <div
                                    className="flex justify-between items-center cursor-pointer font-medium"
                                    onClick={() => toggleAnswer(i)}
                                >
                                    <span>{`${i + 1}. ${item.question}`}</span>
                                    <span className="text-lg">🔍</span>
                                </div>
                                {openIndex === i && (
                                    <div className="mt-2 pl-2 text-sm text-gray-700 dark:text-gray-300">
                                        {item.answer || (
                                            <em>Answer coming soon for: <strong>{item.question}</strong></em>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            No questions found.
                        </p>
                    )}
                </div>

                {/* Back Button */}
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

export default CourseQuestions;