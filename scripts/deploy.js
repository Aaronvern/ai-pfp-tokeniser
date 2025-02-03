const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contract with account:", deployer.address);

    const PFPToken = await hre.ethers.getContractFactory("PFPToken");
    const contract = await PFPToken.deploy(deployer.address);

    await contract.deployed();

    console.log("PFPToken deployed to:", contract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
