// scripts/deploy.ts
import { ethers } from "ethers";
import * as fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();

// 1. ABIとバイトコードの読み込み
const abi = JSON.parse(fs.readFileSync("./build/Counter.abi", "utf8"));
const bytecode = fs.readFileSync("./build/Counter.bin", "utf8");

// 2. プロバイダーとウォレットの設定

// .envからAPIキーと秘密鍵を読み込む
// const sepoliaApiKey = process.env.SEPOLIA_API_KEY; // .envにINFURA_API_KEYを追加
const privateKey = process.env.PRIVATE_KEY;     // .envにPRIVATE_KEYを追加
const sepoliaRpcURL = process.env.SEPOLIA_RPC_URL;

// **このチェックが重要です**
if (!sepoliaRpcURL || !privateKey) {
  console.error("Error: SEPOLIA_RPC_URL or PRIVATE_KEY not set in .env file.");
  process.exit(1); // ここで処理を終了させる
}

// const provider = new ethers.providers.JsonRpcProvider(sepoliaRpcURL);
const provider = new ethers.JsonRpcProvider(sepoliaRpcURL);
const wallet = new ethers.Wallet(privateKey, provider);

async function main() {
  // 3. コントラクトファクトリ作成
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);

  // 4. デプロイ
  const contract = await factory.deploy();
  await contract.waitForDeployment();
  // await contract.deployed();

  console.log("Deployed to:", contract.target);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});