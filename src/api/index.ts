import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import account from "./account";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/account", account);

export default router;
