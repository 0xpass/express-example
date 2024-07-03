import { PassportSigner } from "@0xpass/alchemy-signer";
import { Network, Passport } from "@0xpass/passport";
import { mainnet } from "viem/chains";
import { KeySigner } from "@0xpass/key-signer";

const keySigner = new KeySigner(process.env.PRIVATE_KEY!, true);

export const passport = new Passport({
  network:
    process.env.NODE_ENV === "production" ? Network.TESTNET : Network.LOCAL,
  scopeId: process.env.NEXT_PUBLIC_SCOPE_ID!,
  signer: keySigner,
});

export const createPassportSigner = async ({
  username,
}: {
  username: string;
}) => {
  const passportSigner = new PassportSigner({
    inner: passport,
    enableSession: false,
  });
  await passportSigner.authenticate({
    username: username,
    chain: mainnet as any,
    fallbackProvider: process.env.NEXT_PUBLIC_ALCHEMY_URL || "",
  });

  return passportSigner;
};
