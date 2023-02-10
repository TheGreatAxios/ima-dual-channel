import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import getNetworkName, { HardhatId } from "../utils/get_network_name";
import IMA from "../abis/ima.json";
import chalk from "chalk";

task("register-contract-ima", "Register Contract with MessageProxyForSchain")
    .addPositionalParam("contract", "Contract Address to Whitelist")
    .addOptionalParam("chain", "Chain Name to Whitelist for")
    .setAction(async(args: TaskArguments, hre: HardhatRuntimeEnvironment) => {
        
        const { ethers, deployments, getNamedAccounts } = hre;

        const { deployer } = await getNamedAccounts();

        const MessageProxyForSchain = new ethers.Contract(IMA["message_proxy_chain_address"], IMA["message_proxy_chain_abi"]);
        
        const EXTRA_CONTRACT_REGISTRAR_ROLE = ethers.utils.id("EXTRA_CONTRACT_REGISTRAR_ROLE");
        const hasRole: boolean = await MessageProxyForSchain.callStatic.hasRole(EXTRA_CONTRACT_REGISTRAR_ROLE, deployer);
        if (!hasRole) throw new Error(chalk.redBright("You need EXTRA_CONTRACT_REGISTRAR_ROLE"));

        // Extra Contract to Register
        let contractAddress: string;

        if (args.contract) {
            contractAddress = args.contract as string;
        } else {
            contractAddress = (await hre.deployments.get(hre.network.name.includes("calypso") ? "NFTProxy" : "InGameContract")).address;
        }

        if (args.chain) {
            const NETWORK_NAME: string = getNetworkName(args.chain as HardhatId);
            const res = await MessageProxyForSchain.registerExtraContract(NETWORK_NAME, contractAddress);
            console.log(chalk.greenBright("RES: ", res));
        } else {
            const res = await MessageProxyForSchain.registerExtraContractForAll(contractAddress);
            console.log(chalk.greenBright("RES: ", res));
        }

        console.log(chalk.cyan("Successfull Registered ", contractAddress + " on " + args.chain ? getNetworkName(args.chain as HardhatId) : "all chains"));
    });