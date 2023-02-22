// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.17;

contract KotF {
    address payable public currentFool;
    uint256 public currentPrice;

    event NewFool(address newfool, uint256 newprice);

    /**
     * @notice handle accidental Ether sent to this contract
     */
    receive() external payable {
        revert("Did you mean to BecomeFool?");
    }

    /**
     * @notice function to become next fool
     */
    function BecomeFool() public payable {
        if (currentFool == address(0)) {
            require(msg.value > 0, "Ether amount sent is wrong");
        } else {
            require(
                2 * msg.value >= currentPrice * 3,
                "Ether amount not enough"
            );
            (bool sent, ) = address(currentFool).call{value: msg.value}("");
            require(sent, "Failed to send Ether");
        }
        currentFool = payable(msg.sender);
        currentPrice = msg.value;

        emit NewFool(msg.sender, msg.value);
    }
}
