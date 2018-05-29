import { createTransport } from 'nodemailer';

import parameters from 'config/parameters';

export const sendEmail = ({ to, subject, text }) => {
  const transporter = createTransport({
    host: 'smtp.sendgrid.net',
    auth: {
      user: parameters.SENDGRID_USERNAME,
      pass: parameters.SENDGRID_PASSWORD
    }
  });

  const mailOptions = {
    from: parameters.SENDGRID_USERNAME,
    to,
    subject,
    text
  };

  return new Promise((resolve, reject) =>
    transporter.sendMail(mailOptions, err => (err ? reject(err) : resolve()))
  );
};
