import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const configuration = {
  apiKey: "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",
};

const openai = new OpenAI(configuration);

router.route("/").get((req, res) => {
  res.send("Hello from DALL-E!");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = aiResponse.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(error?.response?.data?.error?.message || "Internal Server Error");
  }
});

export default router;
