// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 public count;  // count 状態変数

      // uint256
        // u  Unsigned（符号なし）を意味する。負の数を表現できず、0 以上の正の整数のみを扱えることを意味する
        // int  Integer (整数) を意味する。小数点以下の値を持たない数
        // 256  256ビット のサイズを持つことを意味する。
          // これは、この変数がメモリ上で256ビット（32バイト）の領域を占有することを意味する。

      // public 修飾子
        // 外部から読み取り可能  他のコントラクトや外部アカウント（EOA）から、この変数の値を直接読み取ることができる
          // Solidity コンパイラは、public な状態変数に対して自動的にゲッター関数を生成する
        // コントラクト内部からもアクセス可能
          // increment 関数のように、コントラクト内部の他の関数からもアクセスしたり、変更したりできる

    function increment() public {
        count += 1;
    }

    function decrement() public {
        require(count > 0, "count is already zero");
        count -= 1;
    }

    function reset() public {
        count = 0;
    }
}

/* uint256
範囲:
  最小値: 0
  最大値: 2^256 - 1 (これは非常に大きな数で、約 1.15times10 77 に相当する地球上の原子の数よりもはるかに大きいと言われている)
  ※ この広範な数値範囲により、トークンの残高、タイムスタンプ、ブロック番号、供給量など、ブロックチェーンアプリケーションで必要となるほとんどの数値を表現できる
*/
