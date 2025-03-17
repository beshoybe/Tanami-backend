import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport"; // Import SMTPTransport

const sendEmail = async (options: any) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST!,
    port: Number(process.env.EMAIL_PORT), // Ensure the port is a number
    auth: {
      user: process.env.EMAIL_USERNAME!,
      pass: process.env.EMAIL_PASSWORD!,
    },
  } as SMTPTransport.Options); // Explicitly cast to SMTPTransport.Options

  const mailOptions = {
    from: "Tanami App <tyardhub@gmail.com>",
    name: "Tanami App",
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
