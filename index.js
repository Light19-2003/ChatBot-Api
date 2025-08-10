import express from "express"; // Import express
import cors from "cors";
import dotenv from "dotenv";
const app = express(); // Create an instance of express

dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/OpenAI/Chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    const ApiResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.api_key}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );
    const data = await ApiResponse.json();
    res.json(data);
  } catch (ex) {
    console.error(ex);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
