import { trycatch } from '../helpers/trycatch.js';
import boardService from './board.service.js';

const checkBoardId = async (req, _, next) => {
  await boardService.checkBoardId(req.params.boardId);
  next();
};

export default {
  checkBoardId: trycatch(checkBoardId),
};
