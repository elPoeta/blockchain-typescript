import { IBlockProps } from '../src/interfaces/block/IBlockProps';
import { Block } from '../src/model/block';

describe("Block", () => {
  const blockProps: IBlockProps = {
    timestamp: Date.now(),
    hash: 'elpoeta-hash',
    lastHash: 'elpoeta-lasthash',
    data: ['blockchain', 'data']
  }
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

});