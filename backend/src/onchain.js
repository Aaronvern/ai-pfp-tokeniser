const { OnchainKit } = require("@coinbase/onchainkit");

const onchain = new OnchainKit({
    apiKey: process.env.ONCHAINKIT_API_KEY,
    network: "base",
});

async function postOnchainMessage(txHash, userHandle, pfpUrl) {
    const message = `Just minted an NFT for @${userHandle}! 🎉\nTx: ${txHash}\n${pfpUrl}`;
    const result = await onchain.createPost({
        message,
        metadata: { txHash, image: pfpUrl }
    });

    console.log("Onchain post result:", result);
}

module.exports = { postOnchainMessage };
