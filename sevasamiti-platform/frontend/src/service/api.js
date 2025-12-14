const API_BASE_URL = 'http://localhost:8080';

const request = async (options) => {
    console.log('API Request initiated:', options.method, options.url);
    if (options.body) {
        console.log('Request Body:', options.body);
    }

    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        console.log('accessToken found in localStorage. Appending Authorization header.');
        headers.append('Authorization', 'Bearer ' + accessToken);
    } else {
        console.log('accessToken NOT found in localStorage. Request will be unauthenticated.');
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    try {
        const response = await fetch(options.url, options);
        console.log('API Response received - Status:', response.status, 'URL:', response.url);
        console.log('Response Headers:', Object.fromEntries(response.headers.entries()));

        let json;
        const contentType = response.headers.get("content-type");
        if (response.status !== 204 && contentType && contentType.includes("application/json")) {
            json = await response.json();
            console.log('Response body parsed as JSON:', json);
        } else {
            json = {}; // Default to empty object if no JSON content or 204
            console.log('Response body not JSON or empty. Defaulting to empty object.');
        }
        
        if (!response.ok) {
            console.error('API Request FAILED - Response not OK:', response.status, response.statusText, json);
            return Promise.reject(json);
        }
        console.log('API Request SUCCESS - Response OK:', response.status);
        return json;
    } catch (error) {
        console.error('API Request FAILED - Network or other error:', error);
        return Promise.reject(error);
    }
};

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function sendOtp(sendOtpRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/send-otp",
        method: 'POST',
        body: JSON.stringify(sendOtpRequest)
    });
}

export function verifyOtp(verifyOtpRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/verify-otp",
        method: 'POST',
        body: JSON.stringify(verifyOtpRequest)
    });
}

export function getCurrentUser() {
    return request({
        url: API_BASE_URL + "/api/user/me",
        method: 'GET'
    });
}
