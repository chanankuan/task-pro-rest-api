import cardService from './card.service.js';
import { trycatch } from '../helpers/trycatch.js';

const getAllCards = (req, res) => {
  // get all cards
};

const getOneCard = (req, res) => {
  // get one card
};

const createOneCard = (req, res) => {
  // create one card
};

const deleteOneCard = (req, res) => {
  // delete one card
};

const patchOneCard = (req, res) => {
  // patch one card
};

export default {
  getAllCards: trycatch(getAllCards),
  getOneCard: trycatch(getOneCard),
  createOneCard: trycatch(createOneCard),
  deleteOneCard: trycatch(deleteOneCard),
  patchOneCard: trycatch(patchOneCard),
};
