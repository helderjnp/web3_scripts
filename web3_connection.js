module.exports = function (Web3) {
    const provider = 'https://public-0.publicmint.com:8545';

    const opts = {
        defaultBlock: 'latest',
        transactionConfirmationBlocks: 1,
    }
    return new Web3(provider, null, opts);
};
