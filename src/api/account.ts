import express from "express";
import { createPassportSigner } from "../passport";
import { createLightAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { sepolia, SmartAccountSigner } from "@alchemy/aa-core";

const router = express.Router();
const chain = sepolia;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

type EmojiResponse = string[];

router.get("/", async (req, res) => {
  const mockUsername = "mockmock";
  const passportSigner = await createPassportSigner({
    username: mockUsername,
  });

  // const signer = passportSigner as SmartAccountSigner;

  // const provider = await createLightAccountAlchemyClient({
  //   apiKey: ALCHEMY_API_KEY,
  //   chain,
  //   signer,
  //   version: "v2.0.0",
  // });

  // const address = await provider.getAddress();

  res.status(200).json({ address: "test" });
});

export default router;
