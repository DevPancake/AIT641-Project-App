const fs = require('fs');
const readline = require('readline');

const courseData = JSON.parse(fs.readFileSync('courses.json')).courses;

function buildCourseGraph() {
    /**
     * Builds a graph representation of courses and their prerequisites.
     */
    const graph = {};

    courseData.forEach(course => {
        const courseNumber = course.catalogNumber;
        if (!graph[courseNumber]) graph[courseNumber] = [];

        course.prerequisiteClass.forEach(prereq => {
            if (prereq !== "none") {
                const prereqNumber = parseInt(prereq.split(' ')[1]);
                if (!graph[prereqNumber]) graph[prereqNumber] = [];
                graph[prereqNumber].push(courseNumber);
            }
        });
    });

    return graph;
}


function getRecommendations(completedCourses) {
    /**
     * Recommend courses based on completed courses and prerequisites.
     */
    const graph = buildCourseGraph();
    const eligibleCourses = [];
    const completedSet = new Set(completedCourses);
    const queue = [];

    courseData.forEach(course => {
        const courseNumber = course.catalogNumber;
        const prerequisites = course.prerequisiteClass;

        const allPrereqsMet = prerequisites.every(prereq => {
            return prereq === "none" || completedSet.has(parseInt(prereq.split(' ')[1]));
        });

        if (allPrereqsMet && !completedSet.has(courseNumber)) {
            queue.push(courseNumber);
        }
    });

    while (queue.length > 0) {
        const courseNumber = queue.shift();
        if (courseNumber !== undefined) {
            eligibleCourses.push(courseNumber);
        }
        if (courseNumber !== undefined) {
            (graph[courseNumber] || []).forEach(dependent => {
                if (!completedSet.has(dependent) && !queue.includes(dependent)) {
                    queue.push(dependent);
                }
            });
        }
    }

    return eligibleCourses;
}

function recommendCourses(completedCourses) {
    /**
     * Displays recommended courses.
     */
    const recommendations = getRecommendations(completedCourses.map(Number));

    if (recommendations.length > 0) {
        console.log("ChatGPT Bot: Based on your completed courses, you are eligible to take the following courses:");
        recommendations.forEach(courseNumber => {
            const courseInfo = courseData.find(course => course.catalogNumber === courseNumber);
            console.log(`  - ${courseInfo.catalogNumber} ${courseInfo.title}`);
        });
    } else {
        console.log("ChatGPT Bot: No courses are currently eligible based on your completed courses.");
    }
}

function chatbot() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

    (async function () {
        const userMajor = await askQuestion("ChatGPT Bot: What is your major? ");
        const userClassification = await askQuestion("ChatGPT Bot: What is your classification (e.g., Graduate, Undergraduate)? ");

        console.log("ChatGPT Bot: Would you like me to recommend courses based on your completed courses? (yes/no)");
        const response = (await askQuestion("You: ")).trim().toLowerCase();

        if (response === "yes") {
            const completed = (await askQuestion("ChatGPT Bot: Enter completed courses (comma-separated): "));
            const completedCourses = completed.split(", ").map(Number);
            recommendCourses(completedCourses);
        } else {
            console.log("ChatGPT Bot: Alright, let me know if you need help with anything else!");
        }

        while (true) {
            const userInput = await askQuestion("You: ");
            userInput.toLowerCase();
            if (userInput === "exit") {
                console.log("ChatGPT Bot: Goodbye! Have a great day!");
                break;
            }

            if (userInput === "recommend courses") {
                const completed = (await askQuestion("ChatGPT Bot: Enter completed courses (comma-separated): ")).split(", ").map(Number);
                recommendCourses(completed);
                continue;
            }

            if (userInput === "hi" || userInput === "hello") {
                console.log("ChatGPT Bot: Would you like me to recommend courses based on your completed courses? (yes/no)");
                const response = String(await askQuestion("You: ")).trim().toLowerCase() || '';
                if (response === "yes") {
                    const completed = (await askQuestion("ChatGPT Bot: Enter completed courses (comma-separated): ")).split(", ").map(Number);
                    recommendCourses(completed);
                } else {
                    console.log("ChatGPT Bot: Alright, let me know if you need help with anything else!");
                }
                continue;
            }

            console.log("ChatGPT Bot: Sorry, I don't understand that command.");
        }

        rl.close();
    })();
}

chatbot();