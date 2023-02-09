import chalk from "chalk";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import DeploySmartContract from "../utils/deploy_smart_contract";
import getNetworkName, { HardhatId } from "../utils/get_network_name";

const deployTargetContracts: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {
    const isStaging: boolean = hre.network.name.includes("staging");
    
    const NETWORK_NAME = getNetworkName(hre.network.name as HardhatId);

    await DeploySmartContract({
        hre,
        name: "InGameContract",
        args: [
            (await hre.companionNetworks["calypso"].deployments.get("NFTProxy")).address,
            isStaging ? "calypso-staging-v3" : "calypso-mainnet"
        ]
    });

    await DeploySmartContract({
        hre,
        name: "InGameNFT",
        args: [
            isStaging ? "calypso-staging-v3" : "calypso-mainnet"
        ]
    });

    console.log(chalk.greenBright("Origin Deployment Complete"));
    console.log("Addresses");
    console.log("---------");
    console.log(chalk.blueBright("InGameContract ", (await hre.deployments.get("InGameContract")).address));
    console.log(chalk.blueBright("InGameNFT: ", (await hre.deployments.get("InGameNFT")).address));
}

export default deployTargetContracts;

deployTargetContracts.tags = ["target"];