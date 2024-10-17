import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  
  
  const sendMail = (to, subject, text, html) => {
    const mailData = {
      from: process.env.SMTP_USERNAME, 
      to, 
      subject, 
      text,
      html, 
    };
  
    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        return error;
      } else {
        console.log('Email sent successfully:', info.response);
        return info.response;
      }
    });
  };

  export default sendMail;