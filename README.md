# Multi-Platform Profile Scraping via HTML Handoff

## Overview
This project is built as part of Task 2 for the Chrome Extension Internship.
It demonstrates a clean separation of concerns between a Chrome Extension (Manifest V3) and a Node.js backend.

The Chrome extension does not scrape any data.
It only captures the current page URL and full HTML and sends it to the backend.

The backend:

- detects the platform from the URL
- applies platform-specific scraping logic
- extracts structured profile data
- stores the data in the database and returns a clean respons

---

## Architecture Decisions

**Why this architecture was chosen**

The main goal of this task is separation of responsibilities.

**Chrome Extension responsibilities**

- Detect the active tab
- Capture:
    - current page URL
    - full page HTML (document.documentElement.outerHTML)

- Send { url, html } to the backend
- Display success or error status in the popup
The extension does not contain any scraping logic.

**Backend responsibilities**

- Detect which platform the URL belongs to
- Route the HTML to the correct scraper
- Parse HTML using Cheerio
- Extract structured profile data
- Validate extracted data
- Store data in the database
- Return a clean JSON response

This design makes the system:

- easier to extend for new platforms
- easier to maintain
- compliant with the task constraints

---

## URL Detection Logic

URL Detection Logic  

    function detectPlatform(url) {
        if (url.includes("linkedin.com/in/")) return "linkedin";
        if (url.includes("instagram.com/")) return "instagram";
        return null;
    }

**Supported URLs**

- LinkedIn profile pages  
    https://www.linkedin.com/in/username

- Instagram profile pages  
    https://www.instagram.com/username

If the URL does not match these patterns, the backend returns an unsupported platform error.

---

## How to Run the Backend

1. Install dependencies  

        cd backend  
        npm install

2. Configure environment variables
Create a .env file:

    PORT=4000
    DB_HOST=localhost
    DB_USER=your_db_username
    DB_PASSWORD=your_db_password
    DB_NAME=task2_db

3. Start the backend

        node server.js

Backend will run on:  

    http://localhost:4000

---

## How to Load the Chrome Extension

1. Open Chrome
2. Go to chrome://extensions
3. Enable Developer mode
4. Click Load unpacked
5. Select the extension/ folder  

The extension will appear in the Chrome toolbar.

---

## How to Test LinkedIn vs Instagram

**LinkedIn Testing**

1. Log in to LinkedIn manually
2. Open a LinkedIn profile page
    Example: https://www.linkedin.com/in/username
3. Open the extension popup
4. Click Send Page to Backend
5. Verify:
- success message in popup
- data stored in database
- correct platform detection (linkedin)

---

**Instagram Testing**

1. Log in to Instagram manually
2. Open an Instagram profile page
    Example: https://www.instagram.com/username
3. Open the extension popup
4. Click Send Page to Backend
5. Verify:
- success message in popup
- extracted username, display name, bio, followers, following, posts
- correct platform detection (instagram)

---

**Unsupported Page Testing**

1. Open any non-profile page (for example Google or YouTube)
2. Click Send Page to Backend
3. Popup should display:  
    Unsupported page

---

## Final Notes

This project focuses on:

- Clean architecture
- Async safety
- Real-world constraints
- Readable and explainable code  

The implementation prioritizes correctness, safety, and clarity over aggressive automation.

---

## Author
Lakshay Sharma
MCA (Postgraduate)
Chrome Extension Internship Candidate