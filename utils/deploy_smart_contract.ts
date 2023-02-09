import chalk from "chalk";
import { HardhatRuntimeEnvironment } from "hardhat/types";

interface Params {
  hre: HardhatRuntimeEnvironment;
  name: string;
  args: any[];
}

export default async function DeploySmartContract(params: Params) : Promise<void> {
  
    const { deployments, getNamedAccounts } = params.hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    try {
      await deploy(
        params.name,
        {
          from: deployer,
          log: true,
          args: params.args
        }
      );
    } catch (err) {
      console.log("ERROR: ", err);
      console.error(chalk.red(err));
    }
}