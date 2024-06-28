const hardhat = require("hardhat");

async function main() {
  const MusicNFT = await hardhat.ethers.getContractFactory("MusicNFT");
  const MusicNFTContract = await MusicNFT.deploy(); // instance of MusicNFT Contract

  let transaction = MusicNFTContract.deploymentTransaction();
  console.log("transaction:", transaction);
  console.log("transaction hash:", transaction.hash);
  console.log(
    "contract address of MusicNFT:",
    await MusicNFTContract.getAddress()
  );

  const Business = await hardhat.ethers.getContractFactory("Business");
  const BusinessContract = await Business.deploy(); // instance of Business Contract

  transaction = BusinessContract.deploymentTransaction();
  console.log("transaction:", transaction);
  console.log("transaction hash:", transaction.hash);
  console.log(
    "contract address of Business:",
    await BusinessContract.getAddress()
  );
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
