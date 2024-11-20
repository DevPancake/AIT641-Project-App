const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Hard-coded JSON objects with nested structure
const data = {
    "FUNDAMENTALS OF DATA STRUCTURES AND ALGORITHM": {
        subject: "COSC",
        type: "Course",
        catalog: 501,
        description: `Designed for graduate students to provide them with the necessary background in data structures and algorithm analysis. 
                Topics include: objects and abstract data types, dynamic variables and pointers, recursion, sort and search algorithms, 
                linear and non-linear structures such as linked lists, trees and graphs, hashing, algorithms time complexity analysis, 
                object-oriented design and programming. Graded S/U.`,
        units: 6,
        track: "Prerequisite"
    },
    "COMPUTER ORGANIZATIONAL AND ASSEMBLY LANGUAGE FOR NON CS/CIS MAJOR": {
        subject: "COSC",
        type: "Course",
        catalog: 502,
        description: `Computer organization and architecture including computer arithmetic, digital logic, assembly language, 
                memory system organization, and computer interfacing. This course is a preparatory course for the 
                Masters in Computer Science Program and has S/U grading.`,
        units: 3,
        track: "Prerequisite"
    },
    "DISCRETE MATHEMATICS": {
        subject: "MATH",
        type: "Course",
        catalog: 263,
        description: `Sets, logic, induction, functions, relations, sequences, recursion, combinatorics, graphs and trees, 
                matrices with an emphasis on applications in computer science.`,
        units: 3,
        track: "Prerequisite"
    },
    "OPERATING SYSTEMS PRINCIPLES": {
        subject: "COSC",
        type: "Course",
        catalog: 519,
        description: `An overview of the principles of operating systems. Topics include multiple processes, 
                process synchronization and intercommunication, resource allocation, memory management, 
                processor scheduling and I/O device management.`,
        units: 3,
        track: "Core",
        Prerequisite: "COSC 501, COSC 502 & MATH 263"
    },
    "DATABASE MANAGEMENT SYSTEMS I": {
        subject: "COSC",
        type: "Course",
        catalog: 578,
        description: `Build theoretical foundation for database management systems, study different database models, 
                relational algebra, relational calculus, SQL, ER, EER models, structured query formulations, 
                database design, analysis and modeling, functional dependencies and normalization, 
                and overview of next generation database management systems.`,
        units: 3,
        track: "Core",
        Prerequisite: "COSC 501, COSC 502 & MATH 263"
    },
    "ADVANCED DATA STRUCTURES AND ALGORITHM ANALYSIS": {
        subject: "COSC",
        type: "Course",
        catalog: 600,
        description: `Data abstraction, linear data structures, file organization and access methods, 
                memory management, advanced internal and external sort and search algorithms 
                and the trade-offs involved in the use of different data organization.`,
        units: 3,
        track: "Core",
        Prerequisite: "COSC 501, COSC 502 & MATH 263"
    },
    "SOFTWARE ENGINEER I": {
        subject: "COSC",
        type: "Course",
        catalog: 612,
        description: `Formal software engineering principles and practices and their application to the 
                development of computer-based systems.`,
        units: 3,
        track: "Core",
        Prerequisite: "COSC 501, COSC 502 & MATH 263"
    },
    "COMPUTER NETWORKS": {
        subject: "COSC",
        type: "Course",
        catalog: 650,
        description: `Computer networking concepts and technologies. Architectures and protocols, 
                LANS, Internet working, and applications.`,
        units: 3,
        track: "Core",
        Prerequisite: "COSC 501, COSC 502 & MATH 263"
    },
    "COMPUTER SCIENCE GRAD PROJECT": {
        subject: "COSC",
        catalog: 880,
        type: "Project",
        description: `Students conduct a study in an advanced computer-related topic or undertake the analysis, design and implementation of a real-world application. Graded S/U.`,
        units: 3,
        track: "Core",
        Prerequisite: "18 graduate credits towards MS in Computer Science"
    },
    "COMPUTER SCIENCE THESIS": {
        subject: "COSC",
        type: "Thesis",
        catalog: 897,
        description: `An original investigation using an acceptable research method and design.`,
        units: 3,
        track: "Core",
        Prerequisite: "21 graduate credits towards MS in Computer Science"
    },
    "SOFTWARE REQUIREMENTS ENGINEERING": {
        subject: "COSC",
        type: "Course",
        catalog: 601,
        description: `Introduces the basic concepts and principles of software requirements engineering, and is designed to expose student to common tools and techniques, established methods for modeling software systems and various approaches to requirements engineering (structured, object oriented and formal). Intends to cover in its entirety the process of requirements engineering.`,
        units: 3,
        track: "Software Engineering",
        Prerequisite: "AIT 624/COSC 612-Software Engineering; or admission to the Information Technology PhD program."
    },
    "SOFTWARE TESTING AND MAINTENANCE": {
        subject: "COSC",
        type: "Course",
        catalog: 603,
        description: `A comprehensive survey of software maintenance and testing, principles, methodologies, management strategies, techniques and tools. Software testing at the unit, subsystem and system levels using various test design techniques, as well as integration, regression, and system testing methods, and software testing tools. Designing and implementing software technologies to increase maintainability and testability; evaluating software for change and validating software changes.`,
        units: 3,
        track: "Software Engineering",
        Prerequisite: "AIT 624/COSC 612-Software Engineering; or admission to the Information Technology PhD program."
    },
    "ENTERPRISE ARCHITECTURE ": {
        subject: "COSC",
        type: "Course",
        catalog: 618,
        description: `Provides a set of latest approaches in designing IT infrastructures aligning them with enterprise business activities at the architectural level, including business architecture, information architecture, solution architecture, and technology architecture. Institutionalization of enterprise architecture frameworks and standards will be discussed. `,
        units: 3,
        track: "Software Engineering",
        Prerequisite: "AIT 624/COSC 612-Software Engineering; or admission to the Information Technology PhD program."
    },
    " OBJECT-ORIENTED METHODOLOGY ": {
        subject: "COSC",
        type: "Course",
        catalog: 716,
        description: `Object-oriented approach to modeling, problem solving, requirement analysis, system design, system implementation, database design, system engineering and software engineering.`,
        units: 3,
        track: "Software Engineering",
        Prerequisite: "COSC 600; or admission to the Information Technology PhD program."
    },
    "APPLICATION SOFTWARE SECURITY": {
        subject: "COSC",
        type: "Course",
        catalog: 647,
        description: `Security concepts in developing software applications. Discusses design principles for secure software development, and some of the security issues in current programming and scripting languages, database systems and Web servers.`,
        units: 3,
        track: "Cybersecurity",
        Prerequisite: "COSC 578 and COSC 600; or admission to the Information Technology PhD program."
    },
    "INFORMATION SECURITY AND RISK MANAGEMENT": {
        subject: "COSC",
        type: "Course",
        catalog: 685,
        description: `Explores approaches for performing risk assessment of information systems. Foundational concepts in risk management will be introduced, as well as approaches and tools for monitoring, identifying, analyzing, and responding to risks.`,
        units: 3,
        track: "Cybersecurity",
        Prerequisite: "COSC 600 and AIT 500; or admission to the Information Technology PhD program."
    },
    "NETWORK SECURITY": {
        subject: "COSC",
        type: "Course",
        catalog: 734,
        description: `Principles and practice of network security. Topics include authentication services, email security, IP security, Web security, security systems and threats, wireless security, and security applications.`,
        units: 3,
        track: "Cybersecurity",
        Prerequisite: "COSC 650; or admission to the Information Technology PhD program."
    },
    "ADVANCED TOPICS IN COMPUTER SECURITY": {
        subject: "COSC",
        type: "Course",
        catalog: 880,
        description: 'In-depth study of advanced topics in computer security. Topics will vary according to current trends and research directions in the field.',
        units: 3,
        track: "Cybersecurity",
        Prerequisite: "COSC 645; or admission to the Information Technology PhD program."
    },
    "DATA MINING": {
        subject: "COSC",
        type: "Course",
        catalog: 757,
        description: `Designed to provide students with a broad background in data mining techniques and related topics. Real-world applications including Web mining will be emphasized.`,
        units: 3,
        track: "Data Science",
        Prerequisite: "COSC 578; or admission to the Information Technology PhD program."
    },
    "DATABASE MANAGEMENT SYSTEMS II": {
        subject: "COSC",
        type: "Course",
        catalog: 657,
        description: `Relational database systems application, implementation, management, administration, design, advanced data modeling, object-oriented databases, deductive databases, query optimization, functional dependencies, concurrency, security and integrity.`,
        units: 3,
        track: "Data Science",
        Prerequisite: "COSC 457/COSC 578; or admission to the Information Technology PhD program."
    },
    "SOCIAL NETWORK ANALYSIS": {
        subject: "COSC",
        type: "Course",
        catalog: 710,
        description: `Covers the concepts, structures and analysis of large social and information networks. Hands-on techniques will explore how to analyze large-scale social network data, explore social behavior, and apply the techniques to real-world problems.`,
        units: 3,
        track: "Data Science",
        Prerequisite: "COSC 600; or admission to the Information Technology PhD program."
    },
    "NEURAL NETWORKS AND DEEP LEARNING": {
        subject: "COSC",
        type: "Course",
        catalog: 750,
        description: `Discussion of neural network and deep learning, architectures, algorithms and applications, including feedforward neural networks, backpropagation, convolutional neural networks, recurrent neural networks, LSTM, deep belief networks, autoencoders, generative models, and Boltzmann machines.`,
        units: 3,
        track: "Data Science",
        Prerequisite: "COSC 600 and COSC 757; or admission to the Information Technology PhD program."
    },
    "BIG DATA ANALYTICS": {
        subject: "COSC",
        type: "Course",
        catalog: 760,
        description: `Study of big data analytics, including the management of various public and private datasets from business, health care, multimedia, cyber-physical systems (CPS), Internet of Things (IoTs), and social media. Hands-on experience with managing the collection, ingestion, storage, analytics, and interpretation of big data using various cloud-based big data frameworks and NoSQL databases such as Hadoop, MongoDB, CouchDB, Elasticsearch, and Spark.`,
        units: 3,
        track: "Data Science",
        Prerequisite: "COSC 578; or admission to the Information Technology PhD program."
    },
};

// Print all object information to the console
console.log("Course Information:");
for (const title in data) {
    console.log(`Title: ${title}`);
    console.log(`  Description: ${data[title].description}`);
    console.log(`  Units: ${data[title].units}`);
    console.log(`  Track: ${data[title].track}`);
    console.log('-------------------------');
}

// API endpoint to send JSON data
app.get('/api/data', (req, res) => {
    res.json(data);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});