import { Block } from "../src/model/block";
import { Blockchain } from "../src/model/blockchain";
import { GENESIS_DATA } from "../src/config/config";
import { IBlockProps } from "../src/interfaces/block/IBlock";

describe("Blockchain", () => {
  let blockchain: Blockchain;
  let genesisBlock: Block;
  beforeEach(() => {
    blockchain = new Blockchain();
    genesisBlock = Block.genesis();
    blockchain.addBlock({ data: ["Web3"] });
    blockchain.addBlock({ data: ["Ethereum"] });
    blockchain.addBlock({ data: ["Solidity"] });
  });
  it("contains a chain array instance", () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });
  it("starts with the genesis block", () => {
    expect(blockchain.getChainByIndex(0)).toEqual(genesisBlock);
  });
  it("adds new block to the chain", () => {
    const data = ["added to the chain"];
    blockchain.addBlock({ data });
    const len: number = blockchain.len() - 1;
    expect(blockchain.getChainByIndex(len).data).toEqual(data);
  });

  describe("isValidChain", () => {
    describe("when the chain does not start with the genesis block", () => {
      it("returns false", () => {
        const fakeData = "fake-genesis";
        blockchain.setFieldAt({ index: 0, field: "_data", data: fakeData });
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });

    describe("when the chain starts with the genesis block and has multiple blocks", () => {
      describe("and the lastHash reference has changed", () => {
        it("returns false", () => {
          blockchain.setFieldAt({
            index: 2,
            field: "_lastHash",
            data: "fake-hash",
          });

          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });
    });

    describe("and the chain contains a block with invalid field", () => {
      it("returns false", () => {
        blockchain.setFieldAt({
          index: 2,
          field: "_data",
          data: "evil-data",
        });

        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });

    describe("leo and the chain not contains any invalid blocks", () => {
      it("returns true", () => {
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
      });
    });
  });
});
