import { trycatch } from '../helpers/trycatch.js';
import backgroundSerivce from './background.service.js';

const getAllMinBackgrounds = async (req, res) => {
  const backgrounds = await backgroundSerivce.getAllMinBackgrounds();

  res.json(backgrounds);
};

export default {
  getAllMinBackgrounds: trycatch(getAllMinBackgrounds),
};
