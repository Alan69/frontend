// api.js

// Base URL for the API
// TODO эту хуйню надо в .env запихать заебал
export const BASE_URL = 'https://synaqtest.kz';

// все эти функция на будущее пока что они не используются
export async function getData(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Function to make POST requests
export async function postData(endpoint, payload) {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
}

// Function to make PUT requests
export async function putData(endpoint, payload) {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error putting data:', error);
        throw error;
    }
}

// Function to make DELETE requests
export async function deleteData(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return 'Successfully deleted';
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
}
