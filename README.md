# web3_scripts
- Testing scripts for PublicMint network


# Dependencies
- Node.js
- Web3

## Install
```bash
npm install 
```

# Start testing

# Files 
```
root
  ├ contracts
  | ├ ERC20_USD_ABI (Abstract binary interface )
  | └ ERC20_USD (Load USD ERC20 smart contract)
  ├ web3_connection.js (Creates web3 instance with PublicMint as provider)
  ├ wallet.js (Load default private key, also has code for create a new account)
  ├ balance.js (Gets ERC20.balanceOf )
  └ transfer.js (Transfer tokens from wallet account to defined address)
```

## Get balance
```bash
    node balance.js 
```
## Get free tokens for testing 
- Just do some awesome tweet with your wallet address, (copy url and put faucet formulary)
  https://faucet.publicmint.com/ 


## Transfer balance

```bash
    node transfer.js 
```
