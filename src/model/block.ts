import { IBlockProps } from '../interfaces/block/IBlockProps';
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