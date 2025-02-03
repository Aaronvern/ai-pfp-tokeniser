const { AgentKit } = require("@coinbase/agentkit");
const { tokenizePFP } = require("./contract");

const agent = new AgentKit({
    apiKey: process.env.AGENTKIT_API_KEY,
    model: "gpt-4",
});

agent.defineAction("tokenizePFP", async (context) => {
    return await tokenizePFP(context.parameters.handle);
});

async function handleAgentRequest(req, res) {
    const response = await agent.handleRequest(req.body);
    res.json(response);
}

module.exports = { handleAgentRequest };
