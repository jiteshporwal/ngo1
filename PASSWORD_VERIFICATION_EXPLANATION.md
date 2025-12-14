# Password Verification: Hashing vs. Decryption

Aapne password verification ke baare me pucha tha, toh uss process ko aache se samajh lete hain. Hum password "decrypt" nahi karte, balki "hashing" ka istemal karte hain, jo ki zyada secure hai.

## Password Store Kaise Hota Hai (Signup ke time)

Aapka signup logic bilkul sahi hai. Jab user signup karta hai:
1.  Frontend se user ka password (e.g., "my-strong-password") backend me aata hai.
2.  Backend is password ko direct database me save **NAHI** karta.
3.  Uske bajaye, backend ek **hashing algorithm (BCrypt)** ka istemal karke password ko ek irreversible, complex string (jise "hash" kehte hain) me convert kar deta hai.

    `"my-strong-password"`  ->  **Hashing**  ->  `"$2a$10$N9qo8uLOickgx2ZMRZoMye.aA.w2.3jI.C6z1wJ3qJ.s1sY5fM1a2"`

4.  Ye hash (complex string) database ke `Users` table me `password` column me store hota hai.

## Password Verify Kaise Hota Hai (Login ke time)

Jab user login karne ki koshish karta hai:
1.  User apna username aur password (e.g., "my-strong-password") enter karta hai.
2.  Backend uss password ko leta hai aur **usi hashing algorithm (BCrypt)** se dobara hash karta hai.
3.  Backend fir database se user ke username ke corresponding stored hash ko nikalta hai.
4.  Ab backend in dono hash ko compare karta hai:
    *   **Login attempt ka hash**
    *   **Database me stored hash**

5.  Agar dono hash **exactly match** karte hain, iska matlab user ne sahi password dala hai aur login successful ho jaata hai.
6.  Agar hash match nahi karte, iska matlab password galat hai, aur login fail ho jaata hai.

## Decrypt Kyun Nahi Karte?

-   **Hashing (One-Way):** Hash se original password vapas nahi laya ja sakta. Agar database leak ho bhi jaaye, toh attacker ko sirf complex hash milenge, actual passwords nahi. Ye bahut secure hai.
-   **Decryption (Two-Way):** Agar hum password encrypt karke store karte, toh use decrypt bhi kar sakte the. Iska matlab agar hamari "decryption key" leak ho gayi, toh saare users ke passwords pata chal jaate. Isliye passwords ke liye hashing hi best practice hai.

**Conclusion:** Aapka bataya hua flow bilkul sahi hai, aur humne use sabse secure tarike (hashing) se implement kiya hai. Password kabhi decrypt nahi hota, sirf compare hota hai.
