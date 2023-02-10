import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";

task("add-clone", "Add token clone to Proxy")
    .addOptionalParam("token", "Origin Token Address")
    .addParam("chain", "SCHAIN Name")
    .setAction(async(args: TaskArguments, hre: HardhatRuntimeEnvironment) => {
        
        const { ethers, deployments, getNamedAccounts, companionNetworks } = hre;
        const [ signer ] = await ethers.getSigners();
        const { deployer } = await getNamedAccounts();

        let contractConfig = await deployments.get("NFTProxy");
        let tokenConfig = await deployments.get("DualChannel721");

        const contract = new ethers.Contract(contractConfig.address, contractConfig.abi, signer);

        const response = await contract.add721Clone(args.chain, args.token ?? tokenConfig.address, {
            gasLimit: 50000000
        });

        console.log("Response: ", response);

        
    });