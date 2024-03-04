import { HttpError, trycatch } from '../helpers/index.js';
import emailService from './email.service.js';

const sendHelpEmail = async (req, res) => {
  const { name, email: userEmail } = req.user;
  const { email: recipient, comment } = req.body;

  emailService.sendHelpEmail(userEmail, name, { recipient, comment });
  res.json({ message: 'Email sent successfully' });
};

export default {
  sendHelpEmail: trycatch(sendHelpEmail),
};
