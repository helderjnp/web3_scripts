   var Web3 = require('web3');

   // CREATE WEB3 instance with PMint provider
   const provider = 'https://public-0.publicmint.com:8545';

   const opts = {
       defaultBlock: 'latest',
       transactionConfirmationBlocks: 1,
   }
   var web3 = new Web3(provider, null, opts);


   // Import account from private key 
   // const walletAccountAddr_1 = "0xe4845098Bf13C552191a6D8E6d39E651B44E1130";
   const walletAccountPrivateKey_1 = "0x75dd75c31a38a83eb7a391fe04f9e2c78780fa243f71a5769a12f06b9ef1cd11";

   web3.eth.accounts.wallet.add(walletAccountPrivateKey_1);


   // Small sample of ERC20 interface
   const ERC20_ABI_BALANCE_TRANSFER = [{
       "constant": true,
       "inputs": [{
           "internalType": "address",
           "name": "who",
           "type": "address"
       }],
       "name": "balanceOf",
       "outputs": [{
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
       }],
       "payable": false,
       "stateMutability": "view",
       "type": "function"
   }, {
       "constant": false,
       "inputs": [{
               "internalType": "address",
               "name": "to",
               "type": "address"
           },
           {
               "internalType": "uint256",
               "name": "value",
               "type": "uint256"
           }
       ],
       "name": "transfer",
       "outputs": [{
           "internalType": "bool",
           "name": "",
           "type": "bool"
       }],
       "payable": false,
       "stateMutability": "nonpayable",
       "type": "function"
   }];

   // Public Mint USD contract address 
   const ERC20_USD_ADDR = '0x0000000000000000000000000000000000002070';

   // Load contract instance
   const USD = new web3.eth.Contract(ERC20_ABI_BALANCE_TRANSFER, ERC20_USD_ADDR, {
       gasPrice: '0x4A817C800',
       gasLimit: '0xC3500'
   });


   (async function () {
       // Get Address & Private key from wallet 
       const _wallet = web3.eth.accounts.wallet;
       const _walletAccountAddr_1 = _wallet[0].address;
       const _walletAccountPrivateKey_1 = _wallet[0].privateKey;

       console.log(`\n Wallet Account 1: \n ${_walletAccountAddr_1} \n ${_walletAccountPrivateKey_1}`);

       // Get free tokens in https://faucet.publicmint.com/ Just do some awesome tweet with your wallet address
       // Public explorer https://explorer.publicmint.com

       let balance = await USD.methods.balanceOf(_walletAccountAddr_1).call();
       console.log(`\n USD Smart contract balance before transfer : ${balance.toString()} \n USD fiat balance ${web3.utils.fromWei(balance.toString(), "ether")}`);

       try {
           // ERC20 of USD have 18 decimals like ethereum native units so we can use web3-utils for this conversion
           // In this case 1 USD is represented as 1000000000000000000 wei unit. 
           const valueForTransfer = web3.utils.toWei('1', 'ether'); 
           console.log("\n: Value using in Transfer: ", valueForTransfer.toString())

           let receipt = await USD.methods.transfer("0x8717eD44cEB53f15dB9CF1bEc75a037A70232AC8", valueForTransfer).send({
               from: _walletAccountAddr_1,
               gasLimit: '45000'
           });
           console.log(`\n Explorer link: https://explorer.publicmint.com/#/tx/${receipt.transactionHash}`);
       } catch (error) {
           console.log("\n Error: ", error)
       }

       balance = await USD.methods.balanceOf(_walletAccountAddr_1).call();
       console.log(`\n USD Smart contract  balance after transfer :  ${balance.toString()} \n USD fiat balance ${web3.utils.fromWei(balance.toString(), "ether")}`);



   })();


   /**
    Should output something like that 
    
>   node complete - example.js

    Wallet Account 1:
        0xe4845098Bf13C552191a6D8E6d39E651B44E1130
    0x75dd75c31a38a83eb7a391fe04f9e2c78780fa243f71a5769a12f06b9ef1cd11

    USD Smart contract balance before transfer: 5994767159999999994
    USD fiat balance 5.994767159999999994

        : Value using in Transfer: 1000000000000000000

    Explorer link: https: //explorer.publicmint.com/#/tx/0x5ed45ef1889034ea45c2a8b6633aafb8bd91fbe7c0d4f067e3fa2bb8452a68a7

        USD Smart contract balance after transfer: 4993895019999999994
    USD fiat balance 4.993895019999999994


    */
