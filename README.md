# Follow-Up
Follow-Up is a powerful and intuitive task manager application built with React and Firebase. It helps you stay organized and on top of your tasks with ease.

To get started with Follow-Up, follow these steps:

Clone the repository and cd into the project
```
cd follow-up
```
Install dependencies:

```
npm install
```
Set up Firebase:

Create a Firebase project at Firebase Console.
Add a web app to your Firebase project.
Copy your Firebase config object.
Create a .env file in the root of your project and add your Firebase config:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```
Start the development server:

```
npm start
```
The app should now be running on http://localhost:3000.

Usage
Sign Up / Login:

Users can sign up or log in using their email and password.
Add Task:

Once logged in, users can add a new task with details such as the task name, description, due date, and priority.
View Tasks:

Users can view their tasks in a list format, organized by categories or labels.
Edit Task:

Users can edit the details of an existing task.
Delete Task:

Users can delete tasks that are no longer needed.
Mark as Completed:

Users can mark tasks as completed.
