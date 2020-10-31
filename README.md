# Email-REST-API-SERVICE
It is server side service for email with OAuth 2.0 and GMAIL REST API using Node.js and Express.

# How to use:
1. clone this project from git
2. run this command from the project folder to install express and other npm_module: npm install
3. In index.js file, initialize the client id and client secret variable that you get by creating google app. I had not written mine due to security issue.
4. Command to start server, you can use any of the following : npm start or npm . or npm index.js 
# Description of Endpoints:
### /auth
Endpoint to initiate authorization using OAuth 2.0

### /sendemail
Endpoint to send email which is created with GMAIL REST API.



