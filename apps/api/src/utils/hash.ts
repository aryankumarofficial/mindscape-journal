import argon2 from "argon2";

export async function hash(row: string) {
  return argon2.hash(row, {
    type: argon2.argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism:1
  });
}

export async function verifyHash(hash: string, password: string) {
  return argon2.verify(hash, password);
}
