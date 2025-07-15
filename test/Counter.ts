import { ethers } from "hardhat";  // Hardhat フレームワークの ethers オブジェクトをインポートしている
  // ethers は、イーサリアムブロックチェーンと対話するためのライブラリで、コントラクトのデプロイ、関数の呼び出し、トランザクションの送信などに使われる

import { expect } from "chai";  // Chai ライブラリから expect 関数をインポートしている
  // Chai は JavaScript のアサーションライブラリで、テストにおける期待される結果を宣言するために使われる

describe("Counter", function () {  //  テストスイートを定義
  it("Should start with count = 0 and increment to 1", async function () {
    const Counter = await ethers.getContractFactory("Counter");
      // Counter という名前のスマートコントラクトのファクトリ（工場）を取得。
      // これにより、このコントラクトをデプロイするためのオブジェクトが得られる。
    const counter = await Counter.deploy() as any;  // Counter コントラクトをデプロイする
      // deploy() を呼び出すと、新しいコントラクトインスタンスがブロックチェーン（この場合はHardhatのローカルテストネットワーク）にデプロイされる
    await counter.deployed();  // コントラクトのデプロイが完了するまで待機する

    expect(await counter.count()).to.equal(0);  // アサーション
      // await counter.count(): デプロイされた counter コントラクトの count 関数（通常は公開変数へのゲッター関数）を呼び出し、
        // 現在のカウント値を取得する
      // .to.equal(0): Chai のアサーションメソッドで、取得したカウント値が 0 と等しいことを期待しています。
        // もし等しくなければ、テストは失敗します。

      await counter.increment();
        // await counter.increment();: デプロイされた counter コントラクトの increment 関数を呼び出します。
          // これにより、コントラクト内のカウント値が 1 増える。

    expect(await counter.count()).to.equal(1);  // アサーション
      // await counter.count(): increment 関数呼び出し後のカウント値を取得する
      // .to.equal(1): カウント値が 1 になっていることを期待している。
  });
});
