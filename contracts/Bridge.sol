pragma solidity >=0.4.21 <0.7.0;
import './ERC20_TX.sol';

contract Bridge{
    ERC20_TX rc_pets;
    constructor () public{ 
    }
    /*  @Dev Send same amount to all addresses
        * @param token address: RC20 token address
        * @param _addList address[]: list of addresses
        * @param amount number: tokens to send
     */
    function bulkSend(address token, address[] memory _addrList, uint _amount) public {
        rc_pets = ERC20_TX(token);
        for (uint i =0;i<_addrList.length;i++){
            rc_pets.transfer(_addrList[i], _amount);
        }
    }
    /*  @dev Send amounts to addresses using transfer
        * @param token address: RC20 token address
        * @param _addList address[]: list of addresses
        * @param _amounts number[]: list of amounts
     */
    function bulkSendMultiple(address token, address[] memory _addrList, uint[] memory _amounts) public {
        rc_pets = ERC20_TX(token);
        require(
            _addrList.length == _amounts.length,
            "Addresses must equal amounts size."
        );
        for (uint i =0;i<_addrList.length;i++){
            rc_pets.transfer(_addrList[i], _amounts[i]);
        }
    }
    /* @dev Send amounts to addresses using allowance
        * @param token address: RC20 token address
        * @param _addList address[]: list of addresses
        * @param _amounts number[]: list of amounts
     */
    function bulkSendFromMultiple(address token, address sender, address[] memory _addrList, uint[] memory _amounts) public {
        rc_pets = ERC20_TX(token);
        require(
            _addrList.length == _amounts.length,
            "Addresses must equal amounts size."
        );
        for (uint i =0;i<_addrList.length;i++){
            rc_pets.transferFrom(sender ,_addrList[i], _amounts[i]);
        }
    }
}    