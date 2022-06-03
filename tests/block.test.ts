import { GENESIS_DATA } from "../src/config/config";
import { IBlockProps } from "../src/interfaces/block/IBlock";
import { Block } from "../src/model/block";

describe("Block", () => {
  const blockProps: IBlockProps = {
    timestamp: Date.now(),
    hash: "elpoeta-hash",
    lastHash: "elpoeta-lasthash",
    data: ["blockchain", "data"],
  };
  const block: Block = new Block(blockProps);
  describe("block has properties", () => {
    it("has a timestamp property", () => {
      expect(block.timestamp).toEqual(blockProps.timestamp);
    });
    it("has a lastHash property", () => {
      expect(block.lastHash).toEqual(blockProps.lastHash);
    });
    it("has a hash property", () => {
      expect(block.hash).toEqual(blockProps.hash);
    });
    it("has a data property", () => {
      expect(block.data).toEqual(blockProps.data);
    });
  });

  describe("genesis", () => {
    const genesisBlock: Block = Block.genesis();
    it("return a block instance", () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });
    it("return genesis hash", () => {
      expect(genesisBlock.hash).toEqual(GENESIS_DATA.hash);
    });
  });

  describe("mine()", () => {
    const lastBlock = Block.genesis();
    const data = ["mined-block"];
    const minedBlock = Block.mine({ lastBlock, data });

    it("returns a block instance", () => {
      expect(minedBlock instanceof Block).toBe(true);
    });

    it("set the `lastHash to be the hash of the lastBlock`", () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it("set data", () => {
      expect(minedBlock.data).toEqual(data);
    });

    it("set timestamp", () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });
  });
});
