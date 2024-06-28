const hardhat = require("hardhat");

async function getBalances(address) {
  const balanceBigInt = await hardhat.ethers.provider.getBalance(address);
  return hardhat.ethers.formatEther(balanceBigInt);
}

async function consoleBalances(addresses) {
  for (const address of addresses) {
    console.log(
      `address: ${address} - balance: ${await getBalances(address)} eth`
    );
  }
}

async function main() {
  const [owner, from1] = await hardhat.ethers.getSigners();
  const MusicNFT = await hardhat.ethers.getContractFactory("MusicNFT");
  const MusicNFTContract = await MusicNFT.deploy(); // instance of MusicNFT Contract

  console.log("contract address:", await MusicNFTContract.getAddress());

  const addresses = [
    await MusicNFTContract.getAddress(),
    owner.address,
    from1.address,
  ];
  consoleBalances(addresses);
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
