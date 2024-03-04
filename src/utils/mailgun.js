import formData from 'form-data';
import Mailgun from 'mailgun.js';
import config from '../dotenvConfig.js';

const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: 'api',
  key: config.MAILGUN_API_KEY,
});

export const sendEmail = (userEmail, userName, body, replyBody) => {
  const emailInfo = {
    from: `${userName} <${userEmail}>`,
    to: config.SUPPORT_EMAIL,
    subject: `Email from ${userEmail}`,
    html: `
      <h1>Dear Task Pro Team</h1>
      <p><b>User comment:</b> ${body.comment}</p>
      <a href="mailto:${body.recipient}?subject=Task Pro Support Team&body=${replyBody}">Click here to reply</a>
    `,
  };

  mg.messages
    .create(config.MAILGUN_DOMAIN, emailInfo)
    .then(msg => console.log(msg))
    .catch(err => console.log(err));
};
