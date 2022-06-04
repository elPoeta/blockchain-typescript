import { IBlockProps } from "../interfaces/block/IBlock";

const INITIAL_DIFFICULTY = 1;
const NONCE = 0;

export const MINE_RATE = 1000;

export const GENESIS_DATA: IBlockProps = {
  timestamp: 1,
  hash: "hash-ONE",
  lastHash: "--------",
  data: [],
  nonce: NONCE,
  difficulty: INITIAL_DIFFICULTY,
};
