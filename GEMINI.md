# Project: Mini CTF with Firebase Authentication

## Project Overview

This is a Capture The Flag (CTF) web application designed for various cybersecurity challenges categorized into Cracking, Inforensics, Web, Steganography, and Cryptography. Users can input flags for each challenge to verify their solutions.

The application has recently been enhanced to include a user authentication system using Firebase. This system allows users to sign up, log in, and log out using a username and password, where the username is internally mapped to a Firebase email address (e.g., `username@ctf.com`) for leveraging Firebase's built-in Email/Password authentication provider.

The entire application is a static web project, making it suitable for deployment on static hosting platforms like GitHub Pages.

## Main Technologies

*   **Frontend:** HTML, CSS, JavaScript
*   **Authentication:** Firebase Authentication (Email/Password provider, adapted for username-based login)
*   **Deployment:** Intended for GitHub Pages

## Architecture

The application follows a client-side architecture:

*   The root `index.html` file redirects to `ctf/index.html`.
*   `ctf/index.html` serves as the main application page. It integrates the CTF challenges UI and the user authentication interface.
*   The Firebase SDK is initialized directly within a `<script type="module">` tag inside `ctf/index.html`.
*   Client-side authentication logic (sign-up, sign-in, sign-out, and UI state management) is handled by `ctf/firebase-auth.js`.
*   The core CTF flag checking logic is implemented in `ctf/ne pas toucher/solution.js`. This file contains the correct flags for the challenges and a function to verify user input.
*   Styling for the main CTF content is provided by `ctf/ne pas toucher/style.CSS`.
*   Styling specific to the authentication section is defined in `ctf/firebase-auth.css`.
*   All challenge-related assets (e.g., Python scripts, PDF files, images, videos, HTML files for web defis) are encapsulated within the `ctf/ne pas toucher/` directory.

## Building and Running

This is a static web application, and therefore, no explicit build steps are generally required beyond ensuring all files are correctly placed.

### To Run Locally

To run the application locally and avoid browser security restrictions (like CORS issues with ES Modules when opening `file://` URLs), you need to serve the files via a local HTTP server:

1.  **Open your terminal** in the project root directory (`/home/archnans/CTF/`).
2.  **Start a local HTTP server** using one of the following methods:
    *   **Using `npx http-server` (Recommended if Node.js/npm is installed):**
        ```bash
        npx http-server -p 8000
        ```
        (If `http-server` is not installed, `npx` may prompt you to install it.)
    *   **Using Python's built-in HTTP server (If Python is installed):**
        ```bash
        python3 -m http.server 8000
        ```
3.  **Access the application:** Open your web browser and navigate to `http://localhost:8000/ctf/index.html`.

### Firebase Setup

For the authentication functionality to work, a Firebase project must be properly configured:

1.  A Firebase project needs to be created in the Firebase Console.
2.  A web application must be added to the Firebase project, and its configuration details (the `firebaseConfig` object) must be present in `ctf/index.html` and `ctf/firebase-auth.js`.
3.  The Email/Password authentication provider must be enabled within the "Authentication" section of the Firebase Console.

## Development Conventions

*   The project uses standard HTML, CSS, and JavaScript for frontend development.
*   Authentication logic is modularized into `firebase-auth.js`.
*   A clear separation is maintained for core CTF challenges and assets, which are placed in the `ne pas toucher/` directory, signaling that these are critical and potentially sensitive challenge components.
