import { ethers } from "hardhat";

async function main() {
  // コントラクトファクトリを取得
  const Counter = await ethers.getContractFactory("Counter");

  // コントラクトをデプロイ
  console.log("Deploying Counter...");
  const counter = await Counter.deploy() as any;

  // デプロイ完了まで待機
  // await counter.deployed();
  await counter.waitForDeployment();

  // console.log("counter:", counter);
  console.log("Counter deployed to:", counter.target);

  // デプロイされたコントラクトの関数を呼び出してみる（オプション）
  const initialCount = await counter.count();
  console.log("Initial count:", initialCount.toString());

  await counter.increment();
  const newCount = await counter.count();
  console.log("Count after increment:", newCount.toString());
}

// エラーハンドリング
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  