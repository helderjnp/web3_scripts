module.exports = function (web3) {
    // create account 
    // Contains an in memory wallet with multiple accounts. These accounts can be used when using web3.eth.sendTransaction().
    // const wallet = web3.eth.accounts.wallet.create(1, entropy);
    // const walletAccountAddr_1 = wallet[0].address;
    // const walletAccountPrivateKey_1 = wallet[0].privateKey;

    // import account 
    // const walletAccountAddr_1 = "0xe4845098Bf13C552191a6D8E6d39E651B44E1130";
    const walletAccountPrivateKey_1 = "0x75dd75c31a38a83eb7a391fe04f9e2c78780fa243f71a5769a12f06b9ef1cd11";

    web3.eth.accounts.wallet.add(walletAccountPrivateKey_1);
    return web3;
};
