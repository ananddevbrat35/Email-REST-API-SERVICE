const express=require('express');
const querystring=require('querystring');
const https=require('https');
const fs=require('fs');
const app=express();
app.use(express.json());

const client_id= YOUR_CLIENT_ID;  //your client id that is unique to your application, not shared here for account security reason  
const client_secret=YOUR_CLIENT_SECRET;;            //your client secret that is unique to your application, not shared here for account security reason   
const redirect_uri="http://localhost:8080";
var auth_code="";
var access_token="";
//endpoint to inintiate authorization
app.get('/auth',function(req,res){
    
    const googleapi_endpoint="https://accounts.google.com/o/oauth2/v2/auth";
    var auth_url=googleapi_endpoint+"?client_id="+client_id+"&response_type=code"+"&scope="+"https://www.googleapis.com/auth/gmail.send"+"&redirect_uri="+redirect_uri+"&access_type="+"offline";
    res.redirect(auth_url);
});

//redirect url after '/auth' call
app.get('/', function(req,res){

    if(req.query.error=='access_denied')
    {
        return res.send("Access denied as permission is not graned by user");
    }
    console.log("looking for auth code");
    auth_code=req.query.code;
    console.log(auth_code);
    if(auth_code!="")
    {       
        //after getting authorization code, https call to obtain access token
        var options={
            host :'oauth2.googleapis.com',
            path:'/token',
            method:'POST',
            port : 443,
        	headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            } 
            

        };
        const post_req=https.request(options, function(res){
            res.setEncoding('utf8');
            res.on('data',(dataChunk)=>{
                console.log(dataChunk);
               fs.writeFileSync('credential.json',dataChunk);
            });
        });
        var post_data=querystring.stringify({
            "client_id":client_id,
            "client_secret":client_secret,
            "code":auth_code,
            "grant_type":"authorization_code",
            "redirect_uri":redirect_uri
          });
          post_req.end(post_data);    // call to get  access and refresh token
        
    }
});

//api endpoint to send email
app.post('/sendemail',(req,res)=>{
	fs.readFile('credential.json', function read(err, data) {
      if (err) {
        throw err;
       }
    access_token=JSON.parse(data).access_token;
	});
	setTimeout(()=>{
	var mail = new Buffer.from(
	     "To:"+req.body.to+"\n"+
	     "Subject:"+req.body.subject+"\n\n"+req.body.message
	).toString("base64").replace(/\+/g,'-').replace(/\//g,'_')
	var post_cred = {
	hostname:'www.googleapis.com',
	port:'443',
	path:'/gmail/v1/users/me/messages/send',
	method:'POST',
	headers:{
		"Authorization" : "Bearer "+ access_token,
		"Content-Type" : "application/json"
	}
	}
	var post_req = https.request(post_cred,function(res){
		res.setEncoding('utf8');
		res.on('data',function(chunk){
			console.log("response_type   "+chunk);
		})
	})
	post_req.write(JSON.stringify({"raw":mail}))
	post_req.end()
	res.send("mail sent successfully to "+req.body.to)
	},3000);
});


app.listen(8080,()=>{
console.log("server is listening on port 8080");
});




