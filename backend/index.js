require("dotenv").config();
const express = require("express");
const agent = require("./src/agent");
const { tokenizePFP } = require("./src/contract");

const app = express();
app.use(express.json());

app.post("/agent", agent.handleAgentRequest);
app.post("/tokenize-pfp/:handle", async (req, res) => {
    try {
        const { handle } = req.params;
        const result = await tokenizePFP(handle);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
