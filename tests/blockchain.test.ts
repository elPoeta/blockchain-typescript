import { Block } from "../src/model/block";
import { Blockchain } from "../src/model/blockchain";
import { GENESIS_DATA } from "../src/config/config";
import { IBlockProps } from "../src/interfaces/block/IBlock";

describe("Blockchain", () => {
  const blockchain = new Blockchain();
  const genesisBlock = Block.genesis();
  it("contains a chain array instance", () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });
  it("starts with the genesis block", () => {
    expect(blockchain.getChainByIndex(0)).toEqual(genesisBlock);
  });
  it("adds new block to the chain", () => {
    const data = "added to the chain";
    blockchain.addBlock({ data });
    const len: number = blockchain.len() - 1;
    expect(blockchain.getChainByIndex(len).data).toEqual(data);
  });
});
