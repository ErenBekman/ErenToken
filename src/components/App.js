import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import ErenToken from '../abis/ErenToken.json'

class App extends Component {



async componentWillMount() {
  await this.loadWeb3()
  await this.loadBlockchainData()
}

async loadWeb3(){
     if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
}

async loadBlockchainData(){
  const web3 = window.web3
  const accounts = await web3.eth.getAccounts()
  this.setState({ account: accounts[0] })

  const networkId = await web3.eth.net.getId()
  const networkData = ErenToken.networks[networkId]

  if (networkData) {

    const abi = ErenToken.abi
    const address = networkData.address
    const contract = new web3.eth.Contract(abi, address)
    console.log(contract)
    const name = await contract.methods.name().call()
    const symbol = await contract.methods.symbol().call()
    const totalSupply = await contract.methods.totalSupply().call()
    this.setState({ totalSupply , name, symbol, contract })

  }else {
    window.alert('Smart contract not deployed to detected network.')
  }

}


sendCoin(receiver, amount)  {
  this.state.contract.methods.sendCoin(receiver, amount).send({ from: this.state.account[0], value: amount })
}

getBalance(event)  {
  const add = event.target.value
  this.state.contract.methods.getBalance(add).call()
}


constructor(props) {
  super(props)
  this.sendCoin = this.sendCoin.bind(this);
  this.getBalance = this.getBalance.bind(this);
  this.loadBlockchainData = this.loadBlockchainData.bind(this);
  this.loadWeb3 = this.loadWeb3.bind(this);

  this.state = {
    account : '',
    contract: null,
    totalSupply: 0,
    name: '',
    symbol: '',
    balance: ''
  }
}



  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
          >
           Eren Token Faucet!
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Eren Token</h1>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  let receiver = this.receiver.value
                  let amount = this.amount.value
                  this.sendCoin(receiver,amount)
                }}>
                  <input
                    type='text'
                    className='form-control mb-1'
                    placeholder='address...'
                    onChange = {this.getBalance}
                    ref={(input) => { this.receiver = input }}
                  />
                  <input
                    type='text'
                    className='form-control mb-1'
                    placeholder='...'
                    ref={(input) => { this.amount = input }}
                  />
                  <input
                    type='submit'
                    className='btn btn-block btn-primary'
                    value='Send Token'
                  />

                </form>

                <hr/>
                <div className="container-fluid mt-5 border">
                <p> Name : </p>  { this.state.name }
                <p> Symbol : </p>  { this.state.symbol }
                <p> TotalToken : </p>  { this.state.totalySupply }
                <p> Balance : </p>  { this.state.balance }
                </div>

              </div>
            </main>
          </div>
        </div>
    </div>
    );
  }
}

export default App;
