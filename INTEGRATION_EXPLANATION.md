# React Frontend aur Java Backend ko Integrate Karne ka Tarika

Hello! Aapne jo frontend banwaya hai, usko Java backend ke saath connect karne ka process neeche simple words me samjhaya gaya hai.

## Integration Ka Matlab Kya Hai?

Integration ka matlab hai ki aapka React app (jo user ke browser me chalta hai) aapke Java server se baat kar sake. Jaise, jab user login form fill karke submit karta hai, toh frontend, backend ko woh username aur password bhejta hai. Fir backend usko check karke response bhejta hai ki login successful hua ya nahi.

Ye communication **API calls** ke through hota hai. Humne iske liye **REST APIs** ka istemal kiya hai.

## Core Concepts

### 1. API Endpoints (Backend)

Backend (Java/Spring Boot) me humne kuch URLs banaye hain, jinhe "endpoints" kehte hain. Frontend inhi URLs par request bhejta hai.

-   `POST /api/auth/signup`: Naye user ka data (username, email, password) register karne ke liye.
-   `POST /api/auth/login`: User ko login karne ke liye. Agar login sahi hai, toh backend ek "token" bhejta hai.
-   `GET /oauth2/authorize/google`: Google se login karne ka process shuru karne ke liye.

### 2. API Calls (Frontend)

Frontend (React) me humne `fetch` function ka istemal kiya hai `api.js` file ke andar, taaki hum backend ke endpoints par HTTP requests bhej sakein.

-   Jab aap "Login" button dabate hain, toh `login()` function call hota hai.
-   Yeh function backend ke `/api/auth/login` endpoint par `POST` request bhejta hai, jisme user ka username aur password JSON format me hota hai.

### 3. CORS (Cross-Origin Resource Sharing)

Security reasons ki wajah se, browsers by default ek domain se dusre domain par API request block kar dete hain. Jaise, humara React app `http://localhost:3000` par chal raha hai aur Java backend `http://localhost:8080` par.

Is problem ko solve karne ke liye, humne backend ke `SecurityConfig.java` me **CORS** configure kiya hai. Humne backend ko bataya hai ki `http://localhost:3000` se aane wali requests ko allow karna hai.

### 4. JWT (JSON Web Token) - Pehchaan Ka Saboot

Login successful hone ke baad, backend ek special string generate karta hai jise **JWT** kehte hain. Yeh token ek "entry pass" ki tarah hai.

-   **Kaise Kaam Karta Hai?**
    1.  Login successful hone par backend, frontend ko ek JWT bhejta hai.
    2.  Frontend is token ko browser ki `localStorage` me save kar leta hai.
    3.  Jab bhi frontend ko kisi protected page ya data ki zaroorat hoti hai (jaise user profile), toh woh har request ke `Authorization` header me ye JWT bhejta hai.
    4.  Backend har request par is token ko check karta hai. Agar token valid hai, toh backend response bhejta hai, warna error de deta hai.

-   **Fayda Kya Hai?**
    Isse backend ko baar-baar user ka password check nahi karna padta. Token hi kaafi hai user ki pehchaan ke liye. Ye **stateless** hai, yaani server ko user ka login state yaad rakhne ki zaroorat nahi hai.

### 5. Logout Kaise Hota Hai?

Logout ka process bahut simple hai:

1.  User "Logout" button par click karta hai.
2.  Frontend, browser ki `localStorage` se `accessToken` (JWT) ko delete kar deta hai.
3.  User ko `/login` page par redirect kar diya jaata hai.

Ab user ke paas "entry pass" (JWT) nahi hai, isliye woh protected pages access nahi kar sakta.

Yahi core concepts hain jinke through humne aapke React frontend aur Java backend ko successfully integrate kiya hai.
