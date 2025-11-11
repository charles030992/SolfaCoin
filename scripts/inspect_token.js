require('dotenv').config();
const hre = require('hardhat');

async function main() {
  const tokenAddress = process.argv[2];
  const account = process.argv[3];

  if (!tokenAddress) {
    console.error('Uso: node scripts/inspect_token.js <TOKEN_ADDRESS> [ACCOUNT_ADDRESS]');
    process.exit(1);
  }

  const [deployer] = await hre.ethers.getSigners();
  const probeAccount = account || deployer.address;

  // Intentamos usar la ABI del contrato compilado (OZToken o MinimalToken)
  const token = await hre.ethers.getContractAt('OZToken', tokenAddress).catch(async () => {
    // si no es OZToken, intentamos MinimalToken
    return hre.ethers.getContractAt('MinimalToken', tokenAddress);
  });

  const name = await token.name().catch(() => '—');
  const symbol = await token.symbol().catch(() => '—');
  const decimals = (await token.decimals().catch(() => 18));
  const totalSupply = await token.totalSupply();
  const balance = await token.balanceOf(probeAccount);

  console.log('Token:', tokenAddress);
  console.log('  name:        ', name);
  console.log('  symbol:      ', symbol);
  console.log('  decimals:    ', decimals.toString());
  console.log('  totalSupply: ', hre.ethers.formatUnits(totalSupply, decimals));
  console.log(`  balance(${probeAccount}):`, hre.ethers.formatUnits(balance, decimals));
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
