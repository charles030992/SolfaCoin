# Solfachuzas Token (proyecto educativo)

Proyecto educativo con dos "pistas" para crear un token ERC-20 para el equipo "los solfachuzas":

- Pista A (curso/minimal): Token sencillo desde cero (`contracts/MinimalToken.sol`).
- Pista B (producción/OZ): Token basado en OpenZeppelin (`contracts/OZToken.sol`).

Objetivo: que puedas compilar, desplegar en Sepolia y entender la diferencia entre ambos enfoques.

## Requisitos

- Node.js (>=16)
- npm o pnpm
- Cuenta con ETH en Sepolia (faucet) y un endpoint RPC (Infura/Alchemy) y clave privada para desplegar.

## Diferencia entre Goerli y Sepolia

- Goerli fue una testnet muy usada pero ha ido siendo reemplazada; Sepolia es la testnet recomendada actualmente.
- Costes: ambos usan tokens de test (faucets). Sepolia suele ser suficiente y soportado por servicios. Para minimizar coste real, usa testnet y faucets.

## Pasos (resumen)

1. Copia `.env.example` a `.env` y completa `SEPOLIA_RPC` y `PRIVATE_KEY`.
2. Instala dependencias:

```powershell
npm install
```

3. Compila los contratos:

```powershell
npm run compile
```

4. Despliega la pista A (minimal):

```powershell
npm run deploy-minimal
```

5. Despliega la pista B (OpenZeppelin):

```powershell
npm run deploy-oz
```

## Estructura principal

- `contracts/MinimalToken.sol` - token didáctico (balance mapping, transfer).
- `contracts/OZToken.sol` - token basado en OpenZeppelin ERC20 (approve/transferFrom incluidos).
- `scripts/deploy_minimal.js` - despliegue de la pista A.
- `scripts/deploy_oz.js` - despliegue de la pista B.
- `hardhat.config.js` - configuración de Hardhat (red Sepolia desde `.env`).


