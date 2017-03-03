var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
   service: "Gmail",  // sets automatically host, port and connection security settings
   auth: {
       user: "pilarproy0@gmail.com",
       pass: "123123as"
   }
});


smtpTransport.sendMail({  //email options
   from: "Sender Name <deskisio10@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
   to: "Receiver Name <bmirandan@gmail.com>", // receiver
   subject: "necessita ayuda este "+ req.params.id, // subject
   text: " información importante " // body
}, function(error, response){  //callback
   if(error){
       console.log(error);
   }else{
       console.log("Message sent: " + response.message);
   }
   
   smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
    
    
});
    

module.exports.send = function(req,res){
    

    
    
}