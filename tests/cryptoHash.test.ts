import { cryptoHash } from "../src/utils/crytoHash";

describe("criptoHash", () => {
  it("generates a SHA-256 hashed output", () => {
    expect(cryptoHash("elpoeta")).toEqual(
      "a3fde1cea7e0bb560f1ab779c3861f647f8c303f8868118af43c33d007586a42"
    );
  });

  it("produces the same hash with the same args in any order", () => {
    expect(cryptoHash("blockchain", "web3", "wallet")).toEqual(
      cryptoHash("wallet", "blockchain", "web3")
    );
  });
});
