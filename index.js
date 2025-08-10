import express from "express"; // Import express
import cors from "cors";

const app = express(); // Create an instance of express

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
          Authorization: `Bearer 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`,
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
