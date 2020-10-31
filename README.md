# Email-REST-API-SERVICE
It is server side service for email with OAuth 2.0 and GMAIL REST API using Node.js and Express.

# How to use:
1. clone this project from git
2. run this command from the project folder to install express and other npm_module: npm install
3. In index.js file, initialize the client id and client secret variable that you get by creating google app. I had not written mine due to security issue.
4. Command to start server, you can use any of the following : npm start or npm . or npm index.js 
5. The server will be listening on port 8080( http://localhost:8080 ).   
# Description of Endpoints:
### /auth
Endpoint to initiate authorization using OAuth 2.0. This endpoint will create credentials that would be used for sending email, so call http://localhost:8080/auth from browser. 

### /sendemail
Endpoint to send email which is created with GMAIL REST API. Send post request on this endpoint with body of shown format: 
{
    "to": "username@gmail.com",
    "subject":"test mail ",
    "message":"This is a test mail to check working" 
}





