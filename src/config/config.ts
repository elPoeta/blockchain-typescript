import { IBlockProps } from "../interfaces/block/IBlock";

export const GENESIS_DATA: IBlockProps = {
  timestamp: Date.now(),
  hash: 'hash-ONE',
  lastHash: '--------',
  data: []
}