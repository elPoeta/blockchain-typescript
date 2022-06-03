import crypto from "crypto";

export const cryptoHash = (...inputs: any[]): string => {
  return crypto
    .createHash("sha256")
    .update(inputs.sort().join(" "))
    .digest("hex");
};
