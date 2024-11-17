const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// SambaNova Cloud API route
app.post("/api/sambanova", async (req, res) => {
    const { inputData } = req.body;

    try {
        const response = await axios.post(
            "https://api.sambanova.com/endpoint", // Replace with the actual SambaNova endpoint
            { data: inputData },
            {
                headers: {
                    Authorization: `Bearer ${process.env.SAMBANOVA_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error calling SambaNova API:", error);
        res.status(500).send("Error communicating with SambaNova API");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
