import { Background } from './background.model.js';

const getAllMinBackgrounds = async () =>
  await Background.find({ type: 'default' }).select(
    'backgroundMinURL backgroundMin2xURL'
  );

export default {
  getAllMinBackgrounds,
};
