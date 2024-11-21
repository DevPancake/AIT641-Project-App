// fetch.js

// Function to fetch data from the API
export async function fetchData() {
    try {
      // Make the API request
      const response = await fetch('http://localhost:3001/api/data', {
        method: 'GET', // or 'POST' if you're sending data
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
  
      // Check if the response is successful (status code 200)
      if (response.ok) {
        const data = await response.json();
        console.log('Data received:', data);  // Handle the data as needed
        return data; // Return the data to be used elsewhere
      } else {
        console.error('Error fetching data:', response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error('An error occurred:', error);
      return null;
    }
  }
  