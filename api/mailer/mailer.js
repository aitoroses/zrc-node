var nodemailer = require("nodemailer");

var transport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "zerorulescrew@gmail.com",
        pass: "raiden400"
    }
});

var mailOptions = {
	from: 'Zero Rules Crew <zerorulescrew@gmail.com>',
    to: "aitor.oses@gmail.com",
    subject: "ZERORULESCREW",
    text: "Bienvenido a la pagina de ZRC!"
}

module.exports = function() {
	console.log('Mail sent');
	transport.sendMail(mailOptions)
};