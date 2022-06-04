import { GENESIS_DATA, MINE_RATE } from "../config/config";
import { IBlockProps, mineBlockType } from "../interfaces/block/IBlock";
import { cryptoHash } from "../utils/crytoHash";
import { hexToBinary } from "../utils/hexToBinary";
export class Block {
  private _timestamp: number;
  private _hash: string;
  private _lastHash: string;
  private _data: any[];
  private _nonce: number;
  private _difficulty;

  constructor(blockProps: IBlockProps) {
    this._timestamp = blockProps.timestamp;
    this._hash = blockProps.hash;
    this._lastHash = blockProps.lastHash;
    this._data = blockProps.data;
    this._nonce = blockProps.nonce;
    this._difficulty = blockProps.difficulty;
  }

  static genesis(): Block {
    return new this(GENESIS_DATA);
  }

  static mine({ lastBlock, data }: mineBlockType): Block {
    let newHash: string;
    let timestamp: number;
    let { hash, difficulty } = lastBlock;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty(lastBlock, timestamp);
      newHash = cryptoHash(timestamp, nonce, difficulty, hash, ...data);
    } while (
      hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty)
    );

    return new this({
      timestamp,
      hash: newHash,
      lastHash: hash,
      data,
      difficulty,
      nonce,
    });
  }

  static adjustDifficulty(originalBlock: Block, timestamp: number): number {
    const { difficulty } = originalBlock;
    if (difficulty < 1) return 1;
    if (timestamp - originalBlock.timestamp > MINE_RATE) return difficulty - 1;
    return difficulty + 1;
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

  get nonce() {
    return this._nonce;
  }

  get difficulty() {
    return this._difficulty;
  }

  decreaseDifficulty(value: number) {
    this._difficulty -= value;
  }
}
