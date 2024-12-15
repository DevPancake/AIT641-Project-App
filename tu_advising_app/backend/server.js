const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getRecommendations } = require('./chatbot'); // Import the chatbot logic
const { checkGraduation } = require('./graduationChecker'); // Import the graduation checker function
const fs = require('fs'); // Import file system module to read the JSON file

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

let waitingForCourses = false; // Track if the server is waiting for course input

// Load course data from coursesCompsci.json
const dataFilePath = './coursesCompsci.json';
let data = [];

try {
    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    data = JSON.parse(fileContent);
    console.log('Course data loaded successfully.');
} catch (error) {
    console.error('Error loading course data:', error);
}

// Unified endpoint to handle all chatbot interactions
app.post('/api/chat', (req, res) => {
    const { message } = req.body;

    // Handle invalid input
    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Invalid input. "message" must be a string.' });
    }

    let response;

    if (waitingForCourses) {
        // User is expected to provide a list of completed courses
        const coursesString = message.trim();
        
        if (!coursesString) {
            response = 'You need to provide a list of completed courses (comma-separated).';
        } else {
            // Convert the comma-separated string to an array of course IDs
            const completedCourses = coursesString.split(',').map(course => course.trim()).map(Number);

            // Log the courses array for debugging
            console.log('Received courses:', completedCourses);

            // Validate that all values are numbers
            if (completedCourses.some(isNaN)) {
                response = 'Please provide a valid list of course IDs (numbers separated by commas).';
            } else {
                try {
                    // Log the courses before calling getRecommendations
                    console.log('Fetching recommendations for courses:', completedCourses);
                    const recommendations = getRecommendations(completedCourses);
                    
                    // Log the recommendations to verify the function works
                    console.log('Recommendations:', recommendations);

                    // Format the recommendations into a readable message
                    if (recommendations.length > 0) {
                        response = `Based on your completed courses, I recommend the following courses:\n` +
                            recommendations.map(course => `${course.title} - ${course.catalogNumber}`).join('\n');
                    } else {
                        response = 'There are no recommended courses based on your completed courses.';
                    }
                } catch (error) {
                    // Log the error to understand the issue
                    console.error('Error fetching recommendations:', error);
                    response = 'There was an error processing your recommendations. Please try again.';
                }
            }
        }
        
        // Reset the flag after the courses are processed
        waitingForCourses = false;
    } else {
        // Handle initial request for recommendations
        if (message.toLowerCase().includes('recommend courses')) {
            response = 'Please provide a list of your completed courses (comma-separated).';
            waitingForCourses = true;  // Set the flag to wait for course input
        }
        // Handle greetings
        else if (message.toLowerCase().includes('hi') || message.toLowerCase().includes('hello')) {
            response = "Hi! How can I assist you today? (You can ask me to recommend courses).";
        }
        // Handle the "what is the best university?" query
        else if (message.toLowerCase().includes('what is the best university')) {
            response = "Towson University of course!";
        }
        // Handle the "who is the best professor at Towson University?" query
        else if (message.toLowerCase().includes('who is the best professor at towson university')) {
            response = "No competition, it's Dr. Dehlinger.";
        }
        // Fallback for unrecognized commands
        else {
            response = "I'm sorry, I don't understand that command.";
        }
    }

    res.json({ response });
});

// API endpoint to send JSON data
app.get('/api/data', (req, res) => {
    res.json(data);
});

// API endpoint for graduation check
app.post('/api/graduation-checker', (req, res) => {
    const { completedCourses } = req.body;

    // Validate input
    if (!Array.isArray(completedCourses) || completedCourses.some(isNaN)) {
        return res.status(400).json({ error: 'Invalid input. "completedCourses" must be an array of course IDs (numbers).' });
    }

    try {
        const result = checkGraduation(completedCourses);
        res.json(result);
    } catch (error) {
        console.error('Error checking graduation eligibility:', error);
        res.status(500).json({ error: 'An error occurred while checking graduation eligibility.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
