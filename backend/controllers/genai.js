import axios from "axios";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const GenAI = async (req, res) => {
  console.log("GenAI using now");
  const { prompt } = req.body;
  console.log("Prompt: ", prompt);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [{ role: "user", content: prompt }],
    });

    // console.log("Reply: ", completion);
    res.json({ completion });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to connect to OpenAI" });
  }
};

export default GenAI;
