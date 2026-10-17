import { hash, verify } from "@node-rs/argon2";
import { serverEnv } from "../env/serverEnv";

type VerifyPasswordType = {
  hash: string;
  password: string;
};

export const hashPasswordFn = async (password: string) => {
  const hashPassword = await hash(password, {
    secret: Buffer.from(serverEnv.BETTER_AUTH_SECRET),
  });

  return hashPassword;
};

export const verifyPasswordFn = async (data: VerifyPasswordType) => {
  const { hash, password } = data;

  const verifiedPassword = await verify(hash, password, {
    secret: Buffer.from(serverEnv.BETTER_AUTH_SECRET),
  });

  return verifiedPassword;
};
