const API_BASE_URL = 'http://localhost:8080';

const request = async (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if (localStorage.getItem('accessToken')) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    const response = await fetch(options.url, options);

    let json;
    const contentType = response.headers.get("content-type");
    if (response.status !== 204 && contentType && contentType.includes("application/json")) {
        json = await response.json();
    } else {
        json = {}; // Default to empty object if no JSON content or 204
    }
    
    if (!response.ok) {
        return Promise.reject(json);
    }
    return json;
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
