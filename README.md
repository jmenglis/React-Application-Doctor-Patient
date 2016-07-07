# Tempus Coding Challenge

## Summary

This application was created as part of the Tempus coding challenge.  The requirements for this application were:
- Design an appealing web application.
- Create a single login page for Doctors and Patients.
- Doctors will login and the system will show details of a patient.
- Patients will login and the system will allow them to upload files or multiple files.

## Technologies Used
- HTML5
- CSS
- SASS
- Node
- ReactJS
- MongoDB
- Webpack
- Javascript(ES6)

## Running Application
- Unzip the files to a location of your choice
- Navigate to application root folder in Terminal
- Run command `npm install`
- Run command `NODE_ENV=production npm start`
- You do not have to run a database as I have this pointed to an instance MongoDB running on mlabs.com
- Navigate to `http://localhost:3000`

## Known Changes
- I initially used the file system to store the uploads but I decided that I can better secure the data by converting it to a blob(base64) and storing in the database assigned to particular user.  This can cause bloated size in the database but the plan would be to store these files on another server.

## Incomplete Items
- More time could have been spent on improving the user experience.
- Refactor the code and combine some of the ReactJS components.
