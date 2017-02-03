'use strict';

var nodemailer = require('nodemailer');

function sendEmail(emailToSend, subject, content, callback) {
	// create reusable transporter object using SMTP transport
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'd.cid@lifeware.cl',
			pass: 'a2t1i8293313'
		}
	});

	// setup e-mail data with unicode symbols
	var mailOptions = {
		from: 'Reporter <d.cid@lifeware.cl>', // sender address
		to: emailToSend, // list of receivers
		subject: subject, // Subject line
		text: '', // plaintext body
		html: content // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, callback);
}

module.exports.send = sendEmail;