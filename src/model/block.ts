import { GENESIS_DATA } from "../config/config";
import { IBlockProps, mineBlockType } from "../interfaces/block/IBlock";
import { cryptoHash } from "../utils/crytoHash";
export class Block {
  private _timestamp: number;
  private _hash: string;
  private _lastHash: string;
  private _data: any[];

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
    const timestamp = Date.now();
    const { hash, lastHash } = lastBlock;

    return new this({
      timestamp,
      hash: cryptoHash(timestamp, lastHash, data),
      lastHash: hash,
      data,
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
