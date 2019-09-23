var web3 = require('./web3_connection')(require('web3'));
web3 = require('./wallet')(web3);

const USD = require('./contracts/ERC20_USD')(web3);

(async function () {
	let receipt;

	const wallet = web3.eth.accounts.wallet;
	const walletAccountAddr_1 = wallet[0].address;
	const walletAccountPrivateKey_1 = wallet[0].privateKey;

	console.log(`\n Wallet Account 1: \n ${walletAccountAddr_1} \n ${walletAccountPrivateKey_1}`);

	let balance = await USD.methods.balanceOf(walletAccountAddr_1).call();
	console.log(`\n USD Smart contract balance before transfer : ${balance.toString()} \n USD fiat balance ${web3.utils.fromWei(balance.toString(), "ether")}`);

	try {
		receipt = await USD.methods.transfer("0x8717eD44cEB53f15dB9CF1bEc75a037A70232AC8", '1').send({
			from: walletAccountAddr_1,
			gasLimit: '45000'
		});
		console.info(`\n Explorer link: https://explorer.publicmint.com/#/tx/${receipt.transactionHash}`); 
	} catch (error) {
		console.log("\n Error: ", error)
	}

	balance = await USD.methods.balanceOf(walletAccountAddr_1).call();
	console.log(`\n USD Smart contract  balance after transfer :  ${balance.toString()} \n USD fiat balance ${web3.utils.fromWei(balance.toString(), "ether")}`);
})();
