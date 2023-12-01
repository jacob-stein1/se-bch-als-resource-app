
# Combined Technical Issues Summary and Solutions

## Context
Development of a web application featuring a choice-based questionnaire, with the frontend interacting with Strapi CMS. This document combines the initial and updated logs of encountered technical issues and their resolutions.

## Primary Issues and Resolutions

### Initial Issues
1. **Frontend Data Fetching Error (404 Not Found)**
   - **Problem:** Errors when fetching data for "Communication" choice from Strapi.
   - **Resolution:** Corrected the API endpoint in `QuestionairePage.tsx`.

2. **Strapi Data Import Script Failure (405 Method Not Allowed and 404 Not Found)**
   - **Problem:** Failed to authenticate with Strapi.
   - **Resolution:** Adjusted user and permissions settings in Strapi admin panel.

3. **Strapi Console Errors (403 Forbidden, 404 Not Found)**
   - **Problem:** Various errors on API requests.
   - **Resolution:** Permissions adjusted in Strapi, and API endpoints corrected.

4. **Adding TitleDescription Box to Questions**
   - **Requirement:** Implement a description field for questions.
   - **Resolution:** Added `QuestionDescription` field in Strapi and updated the frontend.

### Updated Issues and Solutions
1. **Save Feature Implementation (Bookmark)**
   - **Issue:** Limited to solution pages as per Figma design.
   - **Resolution:** Functionality confirmed on solution pages.

2. **Incomplete Figma Structure**
   - **Issue:** Missing solutions for certain choices in Figma.
   - **Resolution:** Collaboration with the design team needed for completion.

3. **Platform Selection Feature**
   - **Issue:** Incomplete implementation of dropdown menu for device and OS selection in Strapi.
   - **Resolution:** Future developers need to complete functionality.

4. **Duplicate Page Names in Figma**
   - **Issue:** Naming inconsistencies in Figma design.
   - **Resolution:** Discuss with UX team for naming clarity.

5. **Bookmark Feature and User Association**
   - **Issue:** Bookmarks linked to users as page ID numbers.
   - **Resolution:** Enhancements needed for descriptive bookmark information.

## New Considerations for Future Development

1. **Homepage Development**
   - **Requirement:** Develop a proper homepage.
   - **Suggested Approach:** Design and implement a homepage aligning with the application's theme.

2. **Sidebar Menu Implementation**
   - **Requirement:** Creation of a sidebar menu.
   - **Suggested Approach:** Develop a user-friendly sidebar menu for better navigation.

3. **User Feedback Loop**
   - **Action:** Introduce a system for collecting user feedback.

4. **Scalability and Security**
   - **Action:** Ensure scalability and regularly update security measures.

## Conclusion
This combined document aims to assist future developers by providing detailed records of technical challenges and solutions, encouraging continual updates for efficient knowledge transfer and problem-solving in the development process.
