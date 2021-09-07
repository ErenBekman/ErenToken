// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;


contract ErenToken  {

  using SafeMath for uint256;

    // string public  name = "ErenToken";
    // string public  symbol = "ET";
    uint8 public  decimals = 2;  


    event Transfer(address indexed from, address indexed to, uint tokens);


    mapping(address => uint256) balances;

    
    uint256 public totalSupply_ = 100000000;


   constructor()  public {  
    // balances[msg.sender] = totalSupply_;
      balances[tx.origin] = totalSupply_;
    }  

     function name() public pure returns (string memory) {
      return 'ErenToken';
    }
    function symbol() public pure returns (string memory) {
      return 'ET';
    }
    function totalSupply() public view returns (uint256) {
      return totalSupply_;
    }


    function getBalance(address tokenOwner) public view returns (uint) {
        return balances[tokenOwner];
    }

    function sendCoin(address receiver, uint amount) public returns (bool) {
        require(amount <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender].sub(amount);
        balances[receiver] = balances[receiver].add(amount);
        totalSupply_ = totalSupply_ - amount;
        emit Transfer(msg.sender, receiver, amount);
        return true;
    }


}


library SafeMath { 

  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    uint256 c = a - b;
    return c;
  }
  function add(uint256 a, uint256 b) internal pure returns (uint256)   {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
  
}

