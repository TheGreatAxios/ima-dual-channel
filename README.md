# IMA Dualchannel Example

The goal of this example is to showcase how the IMA MessageProxy for the SKALE
Network can be used make custom flows that enable a single user click that can have actions take place on a minimum of one other chain. 

## Installation
1. Run the script below
```sh
    git clone git@github.com:TheGreatAxios/ima-dual-channel.git &&
    cd ima-dual-channel &&
    npm install &&
    cp .env 
```
2. Add PRIVATE_KEY=012357...124 to your .env file

## Deployment
1. To deploy on Mainnet run ./deploy_mainnet $arg1 where $arg1 is a hardhat network name i.e calypso-mainnet
2. To deploy on Testnet run ./deploy_staging $arg1 where $arg1 is a hardhat network name i.e calypso-staging-v3

## Tasks

> Notice that the tasks are geared specifically toward a primary deployment on Calypso. Key checks can be swithed out in the registration to make this work for your primary chain.

Register Contract with IMA Message Proxy
---

##### Register Default Contract to ALL SKALE Chains
```sh
    npx hardhat register-contract-ima --network <hardhat-network>
```

##### Register Specific Contract to ALL SKALE Chain
```sh
    npx hardhat register-contract-ima --network <hardhat-network> --contract <eth-contract-address>
```

##### Register Specific Contract to Single SKALE Chain
```sh
    npx hardhat register-contract-ima --network <hardhat-network> --contract    <eth-contract-address> --chain <hardhat-network>
```

Verify Origin Contracts
---

```sh
    npx hardhat verify-origin-contracts --network <hardhat-network>
```

Verify Target Contracts
---

```sh
    npx hardhat verify-target-contracts --network <hardhat-network>
```