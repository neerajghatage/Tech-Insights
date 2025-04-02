const axios = require('axios');

// Set the base URL of your Node.js application directly
const baseUrl = "http://52.234.247.30";

console.log(baseUrl);

// Define an array of endpoints
const endpoints = [
  "/",
  "/healthy",
  "/serverError",
  "/notFound",
  "/logs",
  "/example",
  "/metrics",
  "/get-all-data"
];

// Function to make a random request to one of the endpoints
const makeRandomRequest = async () => {
  const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
  try {
    const response = await axios.get(baseUrl + endpoint);
    console.log(`Response code: ${response.status}`);
  } catch (error) {
    console.log(`Error: ${error.response ? error.response.status : error.message}`);
  }
};

let count=100;
const makeRequests = async () => {
  for (let i = 1; i <= count; i++) {
    await makeRandomRequest();
    console.log(`Request ${i} completed`);
    await new Promise(resolve => setTimeout(resolve, 100)); // Sleep for 0.1 seconds
  }

  console.log(`All ${count} requests completed`);
};

// Start the requests
makeRequests();
