const express = require("express");
const https = require("https");

const app = express();
app.use(express.static("public"));

app.use(express.urlencoded({extended:true}));

app.get("/", (req,res) =>{
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req,res)=>{
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;
    const data={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }
    const jsonData=JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/2507082767"
    const options = {
        method: "POST",
        auth: "ksiunc:5fa8f32ae81e1e0d45216f2f65cc0338-us21",
    };

    const request = https.request(url, options, function(response){
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failture.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

app.post("/failture", function(req,res){
    res.redirect("/");
});

    request.write(jsonData);
    request.end();
});



app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is working on port 3000");
});
