## Getting Started

## ALS Resource App

### Project Description
People with ALS around the world are not offered a variety of clinical options. There are dozens of opportunities for what could be the most beneficial option to them, but are usually only offered a few.  The goal is to take clinical decision making and turn it into a tool that allows ALS patients to look at options and discuss them with their clinician (I have questions about a, b, and c). This tool/guide will allow people with ALS and clinicians/clinics to collaborate in the process of identifying best options throughout the disease process. Tools, resources, and methodologies are continually evolving to help people with ALS to cope with their condition. Because of the rapid nature of development(s), communicating updated resources to both clinicians and patients is difficult. 

The two primary users of this application (mobile or web app) would be patients with ALS or clinicians who work with ALS patients on occasion (such as primary care physicians etc).  The goal would be to provide them with a guided system that is constantly updated with the latest information. Each answer to a question or series of questions would lead the user down a different branch of questions and finally suggestions for the patient's current condition. The end goal would be creating a platform that helps distribute the information to patients and clinicians who might not have access to clinics with ALS experts. 


```bash
npm install
npm run dev
```
### Tests
cd to the Nextjs-Tests file, install the jest dependency and run tests. Detailed explantion in the TestDocs.md file

<img width="285" alt="Screenshot 2023-05-02 at 5 41 41 PM" src="https://user-images.githubusercontent.com/86805856/235793030-dfd1807f-3157-4a73-a605-c2cae6f6e88e.png">

Move the tests to "__test__" folder in the pages folder. Then run npm run test

### Files
To modify components you can go to /src/components. Details for the components, constants,
images and styles are in the ComponentDocs.md file.

<img width="196" alt="Screenshot 2023-05-02 at 5 41 20 PM" src="https://user-images.githubusercontent.com/86805856/235792999-e6a4e35a-8127-45d3-b8c7-c9b593922b25.png">

### API and Pages
To understand the API and pages, naviagte to the the Pages&APIDocs.md file in src.
<img width="489" alt="Screenshot 2023-05-02 at 5 41 05 PM" src="https://user-images.githubusercontent.com/86805856/235792972-93dc9152-dc3a-4bfa-89c6-942290798f1d.png">

### Bugs and errors

Our tests do not run during deployment due to dependency issues. However, we can run it during development by calling npm run test. Then, we push.

### Deployment

We deployed the frontend in vercel. The link the test can be found in the side of the repo
https://se-bch-als-resource-app.vercel.app/

In addition, we deployed strapi on railway
Link: https://se-bch-als-resource-app-production.up.railway.app
