require('dotenv').config();
const hre = require('hardhat');
const fs = require('fs');

async function main() {
  const tokenAddress = process.argv[2];
  const recipientsPath = process.argv[3];

  if (!tokenAddress || !recipientsPath) {
    console.error('Uso: node scripts/airdrop.js <TOKEN_ADDRESS> <recipients.json>');
    console.error('  recipients.json ejemplo: [{"to":"0x..","amount":"10"}, ...]');
    process.exit(1);
  }

  const recipientsRaw = fs.readFileSync(recipientsPath, 'utf8');
  const recipients = JSON.parse(recipientsRaw);

  const [deployer] = await hre.ethers.getSigners();
  console.log('Airdrop desde:', deployer.address);

  const token = await hre.ethers.getContractAt('OZToken', tokenAddress).catch(async () => {
    return hre.ethers.getContractAt('MinimalToken', tokenAddress);
  });

  // comprobar saldo total disponible
  const decimals = await token.decimals().catch(() => 18);
  const startBalance = await token.balanceOf(deployer.address);
  console.log('Balance disponible (deployer):', hre.ethers.formatUnits(startBalance, decimals));

  for (const r of recipients) {
    const to = r.to;
    const amount = r.amount; // cantidad en tokens (p. ej. "10")
    const value = hre.ethers.parseUnits(amount.toString(), decimals);

    console.log(`Enviando ${amount} (${value.toString()}) a ${to} ...`);
    const tx = await token.transfer(to, value);
    console.log('  txHash:', tx.hash);
    await tx.wait();
    console.log('  enviado');
  }

  console.log('Airdrop completado.');
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
