const fs = require('fs');

const courseData = JSON.parse(fs.readFileSync('coursesChatbot.json')).courses;

function buildCourseGraph() {
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
    console.log('Completed Courses:', completedCourses); // Debugging log
    const graph = buildCourseGraph();
    const eligibleCourses = [];
    const completedSet = new Set(completedCourses);
    const queue = [];

    courseData.forEach(course => {
        const courseNumber = course.catalogNumber;
        const prerequisites = course.prerequisiteClass;

        // Debugging log for prerequisites
        console.log(`Course: ${courseNumber}, Prerequisites:`, prerequisites);

        const allPrereqsMet = prerequisites.every(prereq => {
            if (prereq === "none") return true;
            const prereqNumber = parseInt(prereq.split(' ')[1]);
            // Check if prerequisites are valid numbers and log the result
            console.log(`Checking prerequisite ${prereqNumber} for course ${courseNumber}:`, completedSet.has(prereqNumber));
            return completedSet.has(prereqNumber);
        });

        if (allPrereqsMet && !completedSet.has(courseNumber)) {
            queue.push(courseNumber);
        }
    });

    while (queue.length > 0) {
        const courseNumber = queue.shift();
        if (courseNumber !== undefined) {
            // Push both title first, then catalogNumber
            const course = courseData.find(c => c.catalogNumber === courseNumber);
            if (course) {
                eligibleCourses.push({
                    title: course.title, // Title first
                    catalogNumber: course.catalogNumber // Catalog number second
                });
            }
        }
        if (courseNumber !== undefined) {
            (graph[courseNumber] || []).forEach(dependent => {
                if (!completedSet.has(dependent) && !queue.includes(dependent)) {
                    queue.push(dependent);
                }
            });
        }
    }

    console.log('Eligible Courses:', eligibleCourses); // Debugging log
    return eligibleCourses;
}

module.exports = { getRecommendations };
