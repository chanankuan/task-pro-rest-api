import { trycatch } from '../helpers/trycatch.js';
import backgroundService from './background.service.js';

const getAllMinBackgrounds = async (_, res) => {
  const backgrounds = await backgroundService.getAllMinBackgrounds();

  res.json(backgrounds);
};

export default {
  getAllMinBackgrounds: trycatch(getAllMinBackgrounds),
};
