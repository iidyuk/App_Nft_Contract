// scripts/deploy_erc20.ts
import { ethers } from "hardhat"; // ethersをhardhatからインポート
import { Signer } from "ethers"; // Signerの型をインポート
import { MySimpleERC20Token__factory, MySimpleERC20Token } from "../typechain-types"; // 生成された型定義をインポート

async function main() {
  // デプロイに使用するアカウントを取得
  const [deployer]: Signer[] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", await deployer.getAddress());

  // 初期供給量を設定 (100万トークン、18桁のDecimal)
  const initialSupply = ethers.parseUnits("1000000", 18);

  // コントラクトファクトリを取得
  // typechain-typesからファクトリをインポートしているため、as TypeNameとする必要はありません。
  const MySimpleERC20TokenFactory: MySimpleERC20Token__factory = await ethers.getContractFactory("MySimpleERC20Token", deployer) as MySimpleERC20Token__factory;

  // コントラクトをデプロイ
  const mySimpleERC20Token: MySimpleERC20Token = await MySimpleERC20TokenFactory.deploy(initialSupply);

  // デプロイが完了するまで待機
  await mySimpleERC20Token.waitForDeployment();

  console.log("MySimpleERC20Token deployed to:", await mySimpleERC20Token.getAddress());
  console.log("Initial supply minted to deployer:", ethers.formatUnits(initialSupply, 18));
}

// スクリプトの実行とエラーハンドリング
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
