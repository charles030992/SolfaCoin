const hre = require('hardhat');

async function main() {
  const name = 'SolfaCoin';
  const symbol = 'SFC';
  const initialSupply = hre.ethers.parseUnits('1000000', 18);

  console.log('Deploying OZToken:', name, symbol, 'supply:', initialSupply.toString());

  const token = await hre.ethers.deployContract('OZToken', [name, symbol, initialSupply]);
  await token.waitForDeployment();

  console.log('OZToken deployed to:', await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
