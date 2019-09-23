var web3 = require('./web3_connection')(require('web3'));
web3 = require('./wallet')(web3);

const USD = require('./contracts/ERC20_USD')(web3);

(async function () {
	const wallet = web3.eth.accounts.wallet;
	const walletAccountAddr_1 = wallet[0].address;
	const walletAccountPrivateKey_1 = wallet[0].privateKey;

	console.log(`\n Wallet Account 1: \n ${walletAccountAddr_1} \n ${walletAccountPrivateKey_1}`);

	// Get free tokens in https://faucet.publicmint.com/ Just do some awesome tweet with your wallet address
	// Public explorer https://explorer.publicmint.com

	let balance = await USD.methods.balanceOf(walletAccountAddr_1).call();
	console.log(`\n USD Smart contract balance ${balance.toString()} \n USD fiat balance ${web3.utils.fromWei(balance.toString(), "ether")}`);
})();
