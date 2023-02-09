import chalk from "chalk";
import { HardhatRuntimeEnvironment } from "hardhat/types";

interface Params {
  hre: HardhatRuntimeEnvironment;
  address: string;
  contract: string;
  args: any[];
}

export default async function VerifySmartContract(params: Params) : Promise<void> {

    try {
        await params.hre.run("verify:verify", {
          address: params.address,
          contract: params.contract,
          constructorArguments: params.args
        });
      } catch (err) {
        console.info(chalk.greenBright("Error Thrown on Contract Verification"));
        console.error(chalk.redBright(err));
      }
}