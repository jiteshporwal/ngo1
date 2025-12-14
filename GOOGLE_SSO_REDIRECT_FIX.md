# Google SSO `redirect_uri_mismatch` Error Fix

Aapko `Error 400: redirect_uri_mismatch` isliye aa raha hai kyunki Google Cloud Console me aapne jo redirect URIs authorized kiye hain, unme woh URL nahi hai jo aapki application Google ko bhej rahi hai.

Aapki application (Java backend) Google ko yeh redirect URI bhej rahi hai:
`http://localhost:8080/login/oauth2/code/google`

Is error ko theek karne ke liye, aapko Google Cloud Console me is URI ko add karna hoga.

**Step-by-Step Guide:**

1.  **Google Cloud Console me Login karein:**
    *   Apne browser me [Google Cloud Console](https://console.cloud.google.com/) par jayein.
    *   Uss Google account se login karein jisse aapne OAuth 2.0 Client ID banaya tha.

2.  **Apna Project Select karein:**
    *   Top par, jahan project ka naam likha hota hai, wahan click karke woh project select karein jiske liye aapne Client ID banayi thi.

3.  **`APIs & Services` -> `Credentials` par jayein:**
    *   Left-hand navigation menu me, `APIs & Services` par click karein.
    *   Fir `Credentials` par click karein.

4.  **Apni OAuth 2.0 Client ID Edit karein:**
    *   `OAuth 2.0 Client IDs` section me apni Client ID dhoondein aur uske naam par click karein (ya `Edit` icon par click karein).

5.  **`Authorized redirect URIs` me URL Add karein:**
    *   `Authorized redirect URIs` section dhoondein.
    *   `Add URI` button par click karein.
    *   Uss new field me yeh exact URL paste karein:
        ```
        http://localhost:8080/login/oauth2/code/google
        ```
    *   Ensure karein ki koi extra space ya character na ho.

6.  **Changes Save karein:**
    *   Neeche `Save` button par click karein.

**Important Notes:**

*   **Agar aapne pehle `/authorize` use kiya tha:** Agar aapne Google Cloud Console me `/authorize` jaisa kuch set kiya hua tha, toh use delete kar dein ya sahi URL ke saath rakh lein. Recommended hai ki sirf `http://localhost:8080/login/oauth2/code/google` hi use karein jab tak aapko iski zaroorat na ho.
*   **Thoda time lag sakta hai:** Google ke servers par changes reflect hone me kuch minutes lag sakte hain. Turant try karne par bhi error aa sakta hai. Thodi der wait karke firse try karein.
*   **Backend restart karein:** Google Cloud Console me changes karne ke baad, **apne Java backend application ko restart karna mat bhulein**. `Ctrl+C` dabakar rok dein aur fir se `mvn spring-boot:run` chalayein.

In changes ke baad, aapka Google SSO properly kaam karna chahiye.
