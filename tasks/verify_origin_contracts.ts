import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import getNetworkName, { HardhatId } from "../utils/get_network_name";
import VerifySmartContract from "../utils/verify_smart_contract";

task("verify-origin-contracts", "Verify Origin Contracts")
    .setAction(async(args: TaskArguments, hre: HardhatRuntimeEnvironment) => {

        const { deployments, network } = hre;

        const NETWORK_NAME = getNetworkName(network.name as HardhatId);
    
        await VerifySmartContract({
            hre,
            address: (await deployments.get("NFTProxy")).address,
            contract: "contracts/NFTProxy.sol:NFTProxy",
            args: []
        });

        await VerifySmartContract({
            hre,
            address: (await deployments.get("DualChannel721")).address,
            contract: "contracts/DualChannel721.sol:DualChannel721",
            args: [
                (await deployments.get("NFTProxy")).address,
                NETWORK_NAME
            ]
        });
    })