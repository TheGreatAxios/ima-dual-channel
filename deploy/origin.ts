import chalk from "chalk";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import DeploySmartContract from "../utils/deploy_smart_contract";
import getNetworkName, { HardhatId } from "../utils/get_network_name";

const deployOriginContracts: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {

    const NETWORK_NAME = getNetworkName(hre.network.name as HardhatId);

    await DeploySmartContract({
        hre,
        name: "NFTProxy",
        args: []
    });

    await DeploySmartContract({
        hre,
        name: "DualChannel721",
        args: [
            (await hre.deployments.get("NFTProxy")).address,
            NETWORK_NAME
        ]
    });

    console.log(chalk.greenBright("Origin Deployment Complete"));
    console.log("Addresses");
    console.log("---------");
    console.log(chalk.blueBright("NFTProxy: ", (await hre.deployments.get("NFTProxy")).address));
    console.log(chalk.blueBright("Dual Channel 721: ", (await hre.deployments.get("DualChannel721")).address));
}

export default deployOriginContracts;

deployOriginContracts.tags = ["origin"];