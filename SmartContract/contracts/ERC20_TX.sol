pragma solidity >=0.4.21 <0.7.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
/**
 * @title IMARKET20
 * @dev ERC20 where all 100000 tokens are pre-assigned to the creator.
 */
contract ERC20_TX is ERC20{
    // modify token name
    string public constant NAME = "IMARKET20";
    // modify token symbol
    string public constant SYMBOL = "IMT";
    // modify token decimals
    uint8 public constant DECIMALS = 18;
    // modify initial token supply
    uint256 public constant INITIAL_SUPPLY = 100000 * (10 ** uint256(DECIMALS)); // 100000 tokens
    constructor ()  ERC20(NAME, SYMBOL) public{
        _mint(msg.sender, INITIAL_SUPPLY);
    }
  
}