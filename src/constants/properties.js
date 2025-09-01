// Remove the old data and exports and replace with this code.

const API_URL = "https://urchin-app-dz8au.ondigitalocean.app/api/properties";

// Export a single function that fetches the data from the API
export async function fetchPropertiesData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data; // This will be the array of properties
    } catch (error) {
        console.error("Failed to fetch properties:", error);
        return []; // Return an empty array on error
    }
}