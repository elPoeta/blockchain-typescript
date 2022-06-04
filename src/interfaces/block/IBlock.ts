import { Block } from "../../model/block";

export interface IBlockProps {
  timestamp: number;
  hash: string;
  lastHash: string;
  data: any[];
  nonce: number;
  difficulty: number;
}

export type mineBlockType = {
  lastBlock: Block;
  data: any;
};
