// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MySimpleERC20Token is ERC20, Ownable {
    // コンストラクタ: トークンの名前、シンボル、初期供給量を設定します。
    constructor(uint256 initialSupply)
        ERC20("MySimpleToken", "MST") 
        Ownable(msg.sender)
    {
        // デプロイ時に指定された初期供給量をデプロイ者のアドレスにミント（発行）します。
        _mint(msg.sender, initialSupply);
    }

    // 必要に応じて、追加のミント（発行）関数などを実装できますが、
    // シンプルな例では初期供給量のみとします。

    // 通常のERC-20関数（transfer, balanceOf, approve, allowanceなど）は
    // OpenZeppelinのERC20コントラクトに実装されているため、
    // ここで明示的に記述する必要はありません。
}