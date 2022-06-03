import { Block } from "../src/model/block";
import { Blockchain } from "../src/model/blockchain";
import { GENESIS_DATA } from "../src/config/config";
import { IBlockProps } from "../src/interfaces/block/IBlock";

describe("Blockchain", () => {
  let blockchain: Blockchain;
  let newBlockchain: Blockchain;
  let genesisBlock: Block;
  let originalChain: any[];
  beforeEach(() => {
    blockchain = new Blockchain();
    newBlockchain = new Blockchain();
    genesisBlock = Block.genesis();
    originalChain = blockchain.chain;
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
        blockchain.addBlock({ data: ["Web3"] });
        blockchain.addBlock({ data: ["Ethereum"] });
        blockchain.addBlock({ data: ["Solidity"] });
        const fakeData = ["fake-genesis"];
        blockchain.setFieldAt({ index: 0, field: "_data", data: fakeData });
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });

    describe("when the chain starts with the genesis block and has multiple blocks", () => {
      describe("and the lastHash reference has changed", () => {
        it("returns false", () => {
          blockchain.addBlock({ data: ["Web3"] });
          blockchain.addBlock({ data: ["Ethereum"] });
          blockchain.addBlock({ data: ["Solidity"] });
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
        blockchain.addBlock({ data: ["Web3"] });
        blockchain.addBlock({ data: ["Ethereum"] });
        blockchain.addBlock({ data: ["Solidity"] });
        blockchain.setFieldAt({
          index: 2,
          field: "_data",
          data: ["evil-data"],
        });

        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });

    describe("leo and the chain not contains any invalid blocks", () => {
      it("returns true", () => {
        blockchain.addBlock({ data: ["Web3"] });
        blockchain.addBlock({ data: ["Ethereum"] });
        blockchain.addBlock({ data: ["Solidity"] });
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
      });
    });
  });

  describe("replaceChain", () => {
    describe("when the new chain is not longer", () => {
      it("does not replace the chain", () => {
        newBlockchain.setFieldAt({
          index: 0,
          field: "clone",
          data: "new",
        });
        blockchain.replaceChain(newBlockchain.chain);
        expect(blockchain.chain).toEqual(originalChain);
      });
    });

    describe("when the chain is longer", () => {
      beforeEach(() => {
        newBlockchain.addBlock({ data: ["Web3"] });
        newBlockchain.addBlock({ data: ["Ethereum"] });
        newBlockchain.addBlock({ data: ["Solidity"] });
      });
      describe("and the chain is invalid", () => {
        it("does not replace the chain", () => {
          newBlockchain.setFieldAt({
            index: 2,
            field: "_hash",
            data: "fake-hash",
          });
          blockchain.replaceChain(newBlockchain.chain);
          expect(blockchain.chain).toEqual(originalChain);
        });
      });

      describe("and the chain is valid", () => {
        it("replace the chain", () => {
          blockchain.replaceChain(newBlockchain.chain);
          expect(blockchain.chain).toEqual(newBlockchain.chain);
        });
      });
    });
  });
});
