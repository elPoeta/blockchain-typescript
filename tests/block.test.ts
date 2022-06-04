import { GENESIS_DATA, MINE_RATE } from "../src/config/config";
import { IBlockProps } from "../src/interfaces/block/IBlock";
import { Block } from "../src/model/block";
import { cryptoHash } from "../src/utils/crytoHash";
import { hexToBinary } from "../src/utils/hexToBinary";

describe("Block", () => {
  const blockProps: IBlockProps = {
    timestamp: 2000,
    hash: "elpoeta-hash",
    lastHash: "elpoeta-lasthash",
    data: ["blockchain", "data"],
    nonce: 1,
    difficulty: 1,
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

    it("set timestamp", () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });

    it("create SHA256 based on proper inputs", () => {
      expect(minedBlock.hash).toEqual(
        cryptoHash(
          minedBlock.timestamp,
          minedBlock.nonce,
          minedBlock.difficulty,
          lastBlock.hash,
          minedBlock.data
        )
      );
    });

    it("sets a hash that machtes the difficulty criteria", () => {
      expect(
        hexToBinary(minedBlock.hash).substring(0, minedBlock.difficulty)
      ).toEqual("0".repeat(minedBlock.difficulty));
    });

    it("adjust the difficulty", () => {
      const possibleResults = [
        lastBlock.difficulty + 1,
        lastBlock.difficulty - 1,
      ];
      expect(possibleResults.includes(minedBlock.difficulty)).toBe(true);
    });
  });

  describe("adjustDifficulty()", () => {
    it("raises the difficulty for quickly mined block", () => {
      expect(
        Block.adjustDifficulty(block, block.timestamp + MINE_RATE - 100)
      ).toEqual(block.difficulty + 1);
    });

    it("lowers the difficulty for slowly mined block", () => {
      expect(
        Block.adjustDifficulty(block, block.timestamp + MINE_RATE + 100)
      ).toEqual(block.difficulty - 1);
    });
    it("has a lower limit of 1", () => {
      block.decreaseDifficulty(1);
      expect(Block.adjustDifficulty(block, block.timestamp)).toEqual(1);
    });
  });
});
