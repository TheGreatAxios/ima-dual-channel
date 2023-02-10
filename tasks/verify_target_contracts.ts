import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import getNetworkName, { HardhatId } from "../utils/get_network_name";
import VerifySmartContract from "../utils/verify_smart_contract";

task("verify-target-contracts", "Verify Target Contracts")
    .setAction(async(args: TaskArguments, hre: HardhatRuntimeEnvironment) => {

        const { companionNetworks, deployments, network } = hre;

        const NETWORK_NAME = getNetworkName(network.name as HardhatId);
        const isStaging: boolean = network.name.includes("staging");

        await VerifySmartContract({
            hre,
            address: (await deployments.get("InGameContract")).address,
            contract: "contracts/InGameContract.sol:InGameContract",
            args: [
                (await companionNetworks["calypso"].deployments.get("NFTProxy")).address,
                isStaging ? "staging-utter-unripe-menkar" : "honorable-steel-rasalhague"
            ]
        });

        await VerifySmartContract({
            hre,
            address: (await deployments.get("InGameNFT")).address,
            contract: "contracts/InGameNFT.sol:InGameNFT",
            args: [
                isStaging ? "staging-utter-unripe-menkar" : "honorable-steel-rasalhague"
            ]
        });
    })