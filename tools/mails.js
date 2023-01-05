const Config = require("../config");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	auth: {
		user: Config.emailAdmin,
		pass: Config.passwordAdmin
	},
});

 const enviarMail = (destinatario, asunto, mensaje) => {
	const mailOptions = {
		from: "Servidor Node.js",
		to: destinatario,
		subject: asunto,
		html: mensaje,
	};
	transporter.sendMail(mailOptions)
};

module.exports = enviarMail;