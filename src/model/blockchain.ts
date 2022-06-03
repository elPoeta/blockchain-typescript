import { threadId } from "worker_threads";
import { cryptoHash } from "../utils/crytoHash";
import { Block } from "./block";

export class Blockchain {
  private _chain: Block[];
  constructor() {
    this._chain = [Block.genesis()];
  }

  addBlock({ data }: { data: string }) {
    const lastBlock = this._chain[this.len() - 1];
    const block = Block.mine({ lastBlock, data });
    this._chain.push(block);
  }

  static isValidChain(chain: Block[]): boolean {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
      return false;
    for (let i = 1; i < chain.length; i++) {
      const { timestamp, hash, lastHash, data } = chain[i];
      const previusHash = chain[i - 1].hash;
      if (previusHash !== lastHash) return false;
      const validateHash = cryptoHash(timestamp, lastHash, data);
      if (hash !== validateHash) return false;
    }
    return true;
  }

  setFieldAt({
    index,
    field,
    data,
  }: {
    index: number;
    field: string;
    data: any;
  }) {
    this._chain[index] = { ...this._chain[index], [field]: data } as Block;
  }

  setBlockAt(index: number, block: Block) {
    this._chain[index] = block;
  }

  getChainByIndex(index: number): Block {
    return this._chain[index];
  }

  len(): number {
    return this._chain.length;
  }

  get chain(): Block[] {
    return this._chain;
  }
}
