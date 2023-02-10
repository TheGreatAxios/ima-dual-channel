import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";

task("test-claim", "Test Claim in Game")
    .setAction(async(args: TaskArguments, hre: HardhatRuntimeEnvironment) => {
        
        const { ethers, deployments, getNamedAccounts, companionNetworks } = hre;
        const [ signer ] = await ethers.getSigners();
        const { deployer } = await getNamedAccounts();

        let contractConfig = await deployments.get("InGameContract");
        const contract = new ethers.Contract(contractConfig.address, contractConfig.abi, signer);
    
        // console.log("Companinos: ", companionNetworks);

        const originToken = await companionNetworks["calypso"].deployments.get("DualChannel721");
        const targetToken = await deployments.get("InGameNFT");

        const response = await contract.claim([signer.address, originToken.address, targetToken.address, true], {
            gasLimit: 5000000
        });

        console.log("Response: ", response);

        
    });