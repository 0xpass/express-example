import express, { Request, Response, NextFunction } from "express"
import { createPassportSigner, registerUser } from "@/passport.js"
import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy"
import { sepolia, SmartAccountSigner } from "@alchemy/aa-core"

const app = express()
const PORT = process.env.PORT || 3000

app.get("/register", async (req, res, next) => {
  try {
    const mockUsername = "mock@gmail.com"

    const result = await registerUser({ username: mockUsername })
    return res.json(result)
  } catch (error) {
    console.log(error)
    return next(error)
  }
})

app.get("/action", async (req, res, next) => {
  try {
    const mockUsername = "mock@gmail.com"
    const passportSigner = await createPassportSigner({
      username: mockUsername,
    })

    const signer = passportSigner as SmartAccountSigner

    const smartAccountClient = await createModularAccountAlchemyClient({
      apiKey: "[API_KEY]",
      chain: sepolia,
      signer: signer,
      gasManagerConfig: {
        policyId: "[POLICY ID]",
      },
    })

    const address = await smartAccountClient.getAddress()

    // create a UO here

    // // Send a sponsored UO from your smart account like this:
    const { hash } = await smartAccountClient.sendUserOperation({
      uo: {
        target: "0x0000000000000000000000000000000000000000",
        data: "0x",
        value: BigInt(0),
      },
    })

    return res.send({ address, hash })
  } catch (error) {
    console.log(error)
    return next(error)
  }
})

app.get("/", async (req, res, next) => {
  try {
    return res.send("hello world")
  } catch (error) {
    console.log(error)
    return next(error)
  }
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === "development") {
    console.error(err)
  }
  res.status(500).send({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  })
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
