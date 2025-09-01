import { PROPERTIES_DATA } from "@/constants/properties";

// Simulate fetching all properties
export async function fetchProperties() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(PROPERTIES_DATA);
    }, 500); // Simulate network delay
  });
}

// Simulate fetching a property by name
export async function fetchPropertyByName(name) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(PROPERTIES_DATA.find(p => p.name === name));
    }, 500);
  });
}
