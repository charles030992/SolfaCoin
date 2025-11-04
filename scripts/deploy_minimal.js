const hre = require('hardhat');

async function main() {
  // 1,000,000 tokens with 18 decimals
  const initialSupply = hre.ethers.parseUnits('1000000', 18);

  console.log('Deploying MinimalToken with supply:', initialSupply.toString());

  const token = await hre.ethers.deployContract('MinimalToken', [initialSupply]);
  await token.waitForDeployment();

  console.log('MinimalToken deployed to:', await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
