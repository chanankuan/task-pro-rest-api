import { sendEmail } from '../utils/mailgun.js';

const sendHelpEmail = async (userEmail, userName, body) => {
  const replyBody = `Dear ${userName},
We thank you for your email.


Best regards,
Task Pro Support Team
  `;

  sendEmail(userEmail, userName, body, replyBody);
};

export default { sendHelpEmail };
