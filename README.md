
# SolfaCoin — guía rápida para desplegar un ERC‑20 en Sepolia (para VS Code)

Este repositorio es un proyecto educativo con dos variantes de token ERC‑20:

- Pista A — `MinimalToken.sol`: implementación didáctica y minimalista.
- Pista B — `OZToken.sol`: implementación basada en OpenZeppelin (recomendada para producción).

En este README encontraras instrucciones actualizadas (en español) para usar Visual Studio Code y desplegar en la testnet Sepolia.

## Resumen rápido (qué haremos)

1. Configurar un archivo `.env` seguro con tu RPC de Alchemy/Infura y tu clave privada de Sepolia.
2. Instalar dependencias y compilar con Hardhat.
3. Desplegar el contrato (pista A o B) en Sepolia.
4. Añadir el token a MetaMask y/ó enviar tokens (airdrop sencillo).

---

## Requisitos

- Node.js 16+ y `npm` (o `pnpm`).
- Visual Studio Code (recomendado) con las extensiones: Solidity, ESLint, y Code Runner (opcional).
- Cuenta con Sepolia ETH (faucet) y un endpoint RPC (por ejemplo, Alchemy). También necesitarás exportar la clave privada de la cuenta desde MetaMask para desplegar (¡nunca la compartas!).

## Archivos importantes en este repo

- `contracts/MinimalToken.sol` — token minimal.
- `contracts/OZToken.sol` — token basado en OpenZeppelin.
- `scripts/deploy_minimal.js` — script de despliegue para `MinimalToken`.
- `scripts/deploy_oz.js` — script de despliegue para `OZToken`.
- `hardhat.config.js` — configuración de Hardhat. Toma `SEPOLIA_RPC` y `PRIVATE_KEY` desde `.env`.
- `package.json` — comandos rápidos (`npm run compile`, `deploy-minimal`, `deploy-oz`).

## 1) Preparar el entorno en VS Code

1. Abre la carpeta del proyecto en VS Code: `File > Open Folder...` y selecciona la carpeta del repo.
2. Instala estas extensiones (opcionales, pero útiles):
	- Solidity (sintaxis, resaltado, snippets)
	- ESLint
	- Prettier (opcional)

## 2) Variables de entorno (.env)

1. Copia el archivo de ejemplo `.env.example` a `.env` en la raíz del proyecto:

```powershell
copy .env.example .env
```

2. Abre `.env` y rellena las variables:
- `SEPOLIA_RPC` — tu HTTP RPC URL de Alchemy o Infura para Sepolia.
- `PRIVATE_KEY` — la clave privada de la cuenta que pagará el gas (sin 0x o con 0x, Hardhat acepta ambos; en `hardhat.config.js` se usa tal cual).
- `ETHERSCAN_API_KEY` — (opcional) para verificar contratos en Etherscan.

IMPORTANTE: Nunca añadas tu `.env` al control de versiones (está en `.gitignore`).

## 3) Instalar dependencias

En una terminal integrada de VS Code (PowerShell en Windows):

```powershell
npm install
```

Esto instalará `hardhat`, `@openzeppelin/contracts`, `ethers` y otras dependencias listadas en `package.json`.

## 4) Compilar contratos

```powershell
npm run compile
```

Si hay errores de compilación, VS Code los mostrará en la pestaña "Problems"; corrígelos primero.

## 5) Desplegar a Sepolia

Hay dos scripts preparados en `package.json`:

- `npm run deploy-minimal` — despliega `MinimalToken`.
- `npm run deploy-oz` — despliega `OZToken` (OpenZeppelin).

Ejemplo (PowerShell):

```powershell
npm run deploy-oz
```

Salida esperada: la dirección del contrato desplegado. Cópiala y pégala en https://sepolia.etherscan.io/ para inspeccionarla.

## 6) Añadir el token a MetaMask

1. Abre MetaMask y selecciona la red Sepolia.
2. Click en "Importar token" > "Token personalizado".
3. Pega la dirección del contrato desplegado y MetaMask rellenará el símbolo (si está disponible).

## 7) Enviar tokens / airdrop (sugerencia rápida)

Opción sencilla: desde MetaMask (tras agregar el token) puedes enviar tokens a otra dirección como con cualquier ERC‑20.

Opción por script: puedes crear un script en `scripts/airdrop.js` que use `ethers.getContractAt('OZToken', address)` y llame a `transfer(...)` en bucle. Si quieres, puedo añadir un ejemplo seguro y pequeño.

## Notas sobre seguridad y buenas prácticas

- Nunca subas tu clave privada a GitHub.
- Para pruebas usa cuentas con fondos testnet únicamente.
- Prefiere OpenZeppelin para tokens reales: reduce riesgos.

---

## Scripts útiles

Además de los despliegues, hemos incluido dos scripts prácticos:

- `scripts/inspect_token.js` — inspecciona un token desplegado (name, symbol, decimals, totalSupply, balance).
- `scripts/airdrop.js` — hace un airdrop de tokens a múltiples direcciones desde un JSON.

Úsalos para automatizar tareas comunes en el despliegue y distribución de tokens.


