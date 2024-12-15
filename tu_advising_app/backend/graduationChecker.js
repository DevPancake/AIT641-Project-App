// graduationChecker.js
const fs = require('fs');

// Load courses data from coursesCompsci.json
const dataFilePath = './coursesCompsci.json';
let courses = [];

try {
    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    courses = JSON.parse(fileContent).courses;
    console.log('Courses data loaded successfully.');
} catch (error) {
    console.error('Error loading course data:', error);
    process.exit(1); // Exit the script if data loading fails
}

// Function to check if a student is eligible for graduation
function checkGraduation(completedCourses) {
    // Define graduation requirements
    const coreClasses = courses.filter(course => course.core && !course.capstone).map(course => course.catalogNumber);
    const capstoneClasses = courses.filter(course => course.capstone).map(course => course.catalogNumber);

    // Calculate total credits earned
    const totalCredits = completedCourses.reduce((acc, catalogNumber) => {
        const course = courses.find(course => course.catalogNumber === catalogNumber);
        return course ? acc + course.units : acc;
    }, 0);

    // Check if all core classes are completed
    const hasAllCoreClasses = coreClasses.every(core => completedCourses.includes(core));

    // Check if at least one capstone class is completed
    const hasCapstoneClass = capstoneClasses.some(capstone => completedCourses.includes(capstone));

    // Check total credits
    const hasRequiredCredits = totalCredits >= 33;

    // Evaluate graduation eligibility
    const eligibleForGraduation = hasAllCoreClasses && hasCapstoneClass && hasRequiredCredits;

    return {
        hasAllCoreClasses,
        hasCapstoneClass,
        totalCredits,
        hasRequiredCredits,
        eligibleForGraduation
    };
}

// Export the function for use in other files
module.exports = { checkGraduation };
