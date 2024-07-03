import { PassportSigner } from "@0xpass/alchemy-signer"
import { Network, Passport } from "@0xpass/passport"
import { mainnet } from "viem/chains"
import { KeySigner } from "@0xpass/key-signer"
import dotenv from "dotenv"
dotenv.config()

const keySigner = new KeySigner("your private key", true)

export const passport = new Passport({
  network: Network.TESTNET,
  scopeId: "your scope id",
  signer: keySigner,
})

export const createPassportSigner = async ({
  username,
}: {
  username: string
}) => {
  const passportSigner = new PassportSigner({
    inner: passport,
    enableSession: false,
  })
  await passportSigner.authenticate({
    username: username,
    chain: mainnet as any,
    fallbackProvider: "alchemy rpc url",
  })

  return passportSigner
}

export const registerUser = async ({ username }: { username: string }) => {
  await passport.setupEncryption()
  const res = await passport.delegatedRegisterAccount({ username })
  return res
}
