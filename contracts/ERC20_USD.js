const ERC20_ABI = require('./ERC20_USD_ABI.json');

module.exports = function (web3) {
    // Public Mint USD contract address 
    const ERC20_USD_ADDR = '0x0000000000000000000000000000000000002070';

    const USD = new web3.eth.Contract(ERC20_ABI, ERC20_USD_ADDR, {
        gasPrice: '0x4A817C800',
        gasLimit: '0xC3500'
    });
    return USD;
}
