import crypto from "crypto";

export const cryptoHash = (...inputs: any[]): string => {
  console.log("inputs ", inputs.sort().join(" "));
  return crypto.createHash("sha256").update(inputs.join(" ")).digest("hex");
};
