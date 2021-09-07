const ErenToken = artifacts.require('./ErenToken.sol')

require('chai')
	.use(require('chai-as-promised'))
	.should()

contract('ErenToken', (accounts) => {

	let contract

	before(async () => {
		contract = await ErenToken.deployed()
	})

	describe('deployed', async () => {

		it('deploy success', async () => {
			const address = contract.address
			assert.notEqual(address, 0x0)
			assert.notEqual(address, '')
			assert.notEqual(address, null)
			assert.notEqual(address, undefined)

		})

		it('has a name', async () => {
			const name = await contract.name()
			assert.equal(name, 'ErenToken')
		})

		it('has a symbol', async () => {
			const symbol = await contract.symbol()
			assert.equal(symbol, 'ET')
		})		

		it('has a totalSupply_', async () => {
			const totalSupply_ = await contract.totalSupply_()
			assert.equal(totalSupply_, '100000')
		})
	})

	describe('sendCoin', async() => {

		let address, amount

		it('sendCoin success', async () => {
			address = contract.address
			amount = 500

			const result = await contract.sendCoin(address,  amount)
			// console.log(result)
			const event = result.logs[0].args
		    // assert.equal(event.tokens, 500)
		    // assert.equal(event.from, address, 'from is correct')
		    // assert.equal(event.to, amount, 'to is correct')

		})
	})


	describe('getBalance', async() => {

		let address

		it('getBalance success', async () => {
			address = contract.address

			const result = await contract.getBalance(address)
			// console.log(result)
		    // assert.equal(result, address)


		})
	})

})