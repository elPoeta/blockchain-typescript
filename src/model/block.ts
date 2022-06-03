import { GENESIS_DATA } from '../config/config';
import { IBlockProps, mineBlockType } from '../interfaces/block/IBlock';
export class Block {
  private _timestamp: number;
  private _hash: string;
  private _lastHash: string;
  private _data: any[]

  constructor(blockProps: IBlockProps) {
    this._timestamp = blockProps.timestamp;
    this._hash = blockProps.hash;
    this._lastHash = blockProps.lastHash;
    this._data = blockProps.data;
  }

  static genesis(): Block {
    return new this(GENESIS_DATA);
  }

  static mine({ lastBlock, data }: mineBlockType): Block {
    return new this({
      timestamp: Date.now(),
      hash: lastBlock.lastHash + '*',
      lastHash: lastBlock.hash,
      data
    });
  }

  get timestamp() {
    return this._timestamp;
  }

  get hash() {
    return this._hash;
  }

  get lastHash() {
    return this._lastHash;
  }

  get data() {
    return this._data;
  }
}