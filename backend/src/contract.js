const { ethers } = require("ethers");
const { postOnchainMessage } = require("../onchain");
const { getProfilePicture } = require("../twitter");

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    require("../../artifacts/contracts/PFPToken.sol/PFPToken.json").abi,
    wallet
);

async function tokenizePFP(handle) {
    const pfpUrl = await getProfilePicture(handle);

    const tx = await contract.mint(wallet.address, pfpUrl);
    await tx.wait();

    await postOnchainMessage(tx.hash, handle, pfpUrl);

    return { success: true, txHash: tx.hash, pfpUrl };
}

module.exports = { tokenizePFP };
