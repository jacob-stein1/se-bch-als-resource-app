## Getting Started

## ALS Resource App

### Project Description
People with ALS around the world are not offered a variety of clinical options. There are dozens of opportunities for what could be the most beneficial option to them, but are usually only offered a few.  The goal is to take clinical decision making and turn it into a tool that allows ALS patients to look at options and discuss them with their clinician (I have questions about a, b, and c). This tool/guide will allow people with ALS and clinicians/clinics to collaborate in the process of identifying best options throughout the disease process. Tools, resources, and methodologies are continually evolving to help people with ALS to cope with their condition. Because of the rapid nature of development(s), communicating updated resources to both clinicians and patients is difficult. 

The two primary users of this application (mobile or web app) would be patients with ALS or clinicians who work with ALS patients on occasion (such as primary care physicians etc).  The goal would be to provide them with a guided system that is constantly updated with the latest information. Each answer to a question or series of questions would lead the user down a different branch of questions and finally suggestions for the patient's current condition. The end goal would be creating a platform that helps distribute the information to patients and clinicians who might not have access to clinics with ALS experts. 

### What we did
Branch: main: <br>
-used strapi to update questions, choices, and resource page content <br>
-resource page includes vidoes, paragraphs, pdf and website links all fetched from strapi <br>
-created a dynamic questionaire <br>
Branch: dev:<br>
-created dynamic routes for each question. Used routeback to navigate to previous page after clickling back button <br>
-starter code for saving content into mongodb after clickling on save button <br>

### Run Project
Frontend: <br>
nagivate to \code <br>
```bash
npm install
npm run dev
```

Strapi: <br>
nagivate to \backend_strapi to run strapi locally <br>
```bash
npm install
npm run develop
```
<br> comment out this line to use the local version of strapi on your computer https://github.com/BU-Spark/se-bch-als-resource-app/blob/8bbdc2c0b6e2e775b7928429743426246e97d274/code/src/constants/globals.tsx#L2
<br> ask me on merna.alghannam@gmail.com for access as an admin to strapi
### Tests
cd to the Nextjs-Tests file, install the jest dependency and run tests. Detailed explantion in the TestDocs.md file

<img width="285" alt="Screenshot 2023-05-02 at 5 41 41 PM" src="https://user-images.githubusercontent.com/86805856/235793030-dfd1807f-3157-4a73-a605-c2cae6f6e88e.png">


Move the tests to "__ test __" folder in pages folder. Then run 'npm run test'. Make sure you have jest installed. For more instructions, navigate to docs in tests folder.


### Files
To modify components you can go to /src/components. Details for the components, constants,
images and styles are in the ComponentDocs.md file.

<img width="196" alt="Screenshot 2023-05-02 at 5 41 20 PM" src="https://user-images.githubusercontent.com/86805856/235792999-e6a4e35a-8127-45d3-b8c7-c9b593922b25.png">

### API and Pages
To understand the API and pages, naviagte to the the Pages&APIDocs.md file in src.
<img width="489" alt="Screenshot 2023-05-02 at 5 41 05 PM" src="https://user-images.githubusercontent.com/86805856/235792972-93dc9152-dc3a-4bfa-89c6-942290798f1d.png">

### Bugs and errors

- Our tests do not run during deployment due to dependency issues. However, we can run it during development by calling npm run test.

- UseEffect gets called twice during dev. Therefore, the back button may appear sooner, cause the page title not to render correctly. Useeffect is not a good option. Thus, we solved this in dev branch by using dynamic routes. It reroute to previous page when user clicks back button. <br><br> 

- In dev branch, we used dynamic routes because it makes our code cleaner and easier to follow. In addition, it creates a page for each question. However, it currently can only be deployed as a dynamic website. To make it a static site, next team would need to usegetstatic paths to generate all pages during build. (Note: our teammate believes we should keep it dynamic as generating all pages at once wastes resources)

- Our page rendering performance can be improved by using possibly dynamic routes (working starter code in dev branch). In addition, the back button is difficult to press. Thus, usecallback can also be useful there. 

- When the page load is slow, it does not show a loading icon

This is the back button


### Deployment

We deployed the frontend in vercel. The link the test can be found in the side of the repo
https://se-bch-als-resource-app.vercel.app/

In addition, we deployed strapi on railway
Link: https://se-bch-als-resource-app-production.up.railway.app

You can contact me t merna.alghannam@gmail.com for access to strapi. 

In addition, we have provided a folder called strapi, which contains all content of strapi for reference.
