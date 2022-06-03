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
