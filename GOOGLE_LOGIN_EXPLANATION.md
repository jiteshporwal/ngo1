# Google Login se User Data Kaise Store Hota Hai?

Jab koi user "Sign in with Google" button par click karta hai, toh unka data humare `Users` table me kaise store hota hai, iska process neeche samjhaya gaya hai.

## Process Ka Flow

1.  **Google Authentication:** User Google ke login page par jaata hai, apna email/password daalta hai, aur humari application ko permission deta hai.

2.  **Google se Data Milna:** Permission milne ke baad, Google humare backend ko user ki basic details bhejta hai. In details me সাধারণত (normally) ye cheezein hoti hain:
    *   **Full Name** (Pura Naam)
    *   **Email Address**
    *   **Profile Picture URL**

3.  **Backend Logic (`CustomOAuth2UserService.java`):** Humare Java backend me ek special service hai jo is data ko handle karti hai.
    *   Ye service check karti hai ki kya Google se mila email address humare `Users` table me pehle se exist karta hai ya nahi.

4.  **Data Storage (`Users` Table):**

    *   **Agar User Naya Hai (First-time Google Login):**
        *   **`username`**: Hum Google se mile "Full Name" ko as a `username` store kar lete hain.
        *   **`email`**: Google se mila email address store ho jaata hai.
        *   **`password`**: **Yeh sabse important point hai.** Google login ke case me, hum user ka password **NAHI** mangte aur **NAHI** store karte. Authentication ki puri zimmedari Google ki hoti hai. Isliye, `Users` table me is user ke liye `password` column **NULL (khali)** rehta hai.
        *   **`auth_provider`**: Is column me hum `'google'` set kar dete hain. Isse humein pata rehta hai ki ye user Google se authenticated hai.

    *   **Agar User Pehle se Exist Karta Hai (Pehle bhi Google se login kiya tha):**
        *   Hum sirf user ka `username` (agar Google par change hua ho) aur `profile_picture` update karte hain. Baki details waise hi rehti hain.

## Summary

| `Users` Table Column | Google Login ke Baad Kya Store Hota Hai?                        |
| -------------------- | ---------------------------------------------------------------- |
| `username`           | Google account ka naam (e.g., "Ankit Sharma")                    |
| `email`              | Google account ka email (e.g., "ankit.sharma@gmail.com")         |
| `password`           | **NULL** (Khali rehta hai. Password store nahi hota)             |
| `auth_provider`      | `'google'`                                                       |

Is tarah se, hum user ke password ko handle kiye bina unhe securely login karwa paate hain, kyunki identity verification ka kaam Google karta hai.
