import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import chalk from "chalk";

/// Import Tasks
import "./tasks/add_clone";
import "./tasks/register_contract_ima";
import "./tasks/test_claim";
import "./tasks/verify_origin_contracts";
import "./tasks/verify_target_contracts";

dotenv.config();

const PRIVATE_KEY: string | undefined = (process.env.PRIVATE_KEY as string | undefined);
if (!PRIVATE_KEY) {
    throw new Error(chalk.redBright("PRIVATE_KEY not found in .env"));
}

const BASE_STAGING_URL: string = "https://staging-v3.skalenodes.com/v1/" as const;
const BASE_MAINNET_URL: string = "https://mainnet.skalenodes.com/v1/" as const;
const BASE_STAGING_EXPLORER_URL: string = ".explorer.staging-v3.skalenodes.com" as const;
const BASE_MAINNET_EXPLORER_URL: string = ".explorer.mainnet.skalenodes.com" as const;

const API_KEY: string = "value-does-not-matter" as const;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  namedAccounts: {
    deployer: 0
  },
  networks: {
    "calypso-staging-v3": {
      accounts: [PRIVATE_KEY],
      url: BASE_STAGING_URL + "staging-utter-unripe-menkar"
    },
    "titan-staging-v3": {
      accounts: [PRIVATE_KEY],
      url: BASE_STAGING_URL + "staging-aware-chief-gianfar",
      companionNetworks: {
        calypso: "calypso-staging-v3"
      }
    },
    "nebula-staging-v3": {
      accounts: [PRIVATE_KEY],
      url: BASE_STAGING_URL + "staging-faint-slimy-achird",
      companionNetworks: {
        calypso: "calypso-staging-v3"
      }
    },
    "calypso-mainnet": {
      accounts: [PRIVATE_KEY],
      url: BASE_MAINNET_URL + "honorable-steel-rasalhague"
    },
    "titan-mainnet": {
      accounts: [PRIVATE_KEY],
      url: BASE_MAINNET_URL + "parallel-stormy-spica",
      companionNetworks: {
        calypso: "calypso-mainnet"
      }
    },
    "nebula-mainnet": {
      accounts: [PRIVATE_KEY],
      url: BASE_MAINNET_URL + "green-giddy-denebola",
      companionNetworks: {
        calypso: "calypso-mainnet"
      }
    },
  },
  etherscan: {
    apiKey: {
      "calypso-staging-v3": API_KEY,
      "titan-staging-v3": API_KEY,
      "nebula-staging-v3": API_KEY,
      "calypso-mainnet": API_KEY,
      "titan-mainnet": API_KEY,
      "nebula-mainnet": API_KEY,
    },
    customChains: [
      {
        network: "calypso-staging-v3",
        chainId: 344106930,
        urls: {
          apiURL: "https://" + "staging-utter-unripe-menkar" + BASE_STAGING_EXPLORER_URL + "/api",
          browserURL: "https://" + "staging-utter-unripe-menkar" + BASE_STAGING_EXPLORER_URL,
        }
      },
      {
        network: "titan-staging-v3",
        chainId: 1517929550,
        urls: {
          apiURL: "https://" + "staging-aware-chief-gianfar" + BASE_STAGING_EXPLORER_URL + "/api",
          browserURL: "https://" + "staging-aware-chief-gianfar" + BASE_STAGING_EXPLORER_URL,
        }
      },
      {
        network: "nebula-staging-v3",
        chainId: 503129905,
        urls: {
          apiURL: "https://" + "staging-faint-slimy-achird" + BASE_STAGING_EXPLORER_URL + "/api",
          browserURL: "https://" + "staging-faint-slimy-achird" + BASE_STAGING_EXPLORER_URL,
        }
      },
      {
        network: "calypso-mainnet",
        chainId: 1564830818,
        urls: {
          apiURL: "https://" + "honorable-steel-rasalhague" + BASE_MAINNET_EXPLORER_URL + "/api",
          browserURL: "https://" + "honorable-steel-rasalhague" + BASE_MAINNET_EXPLORER_URL 
        }
      },
      {
        network: "titan-mainnet",
        chainId: 1350216234,
        urls: {
          apiURL: "https://" + "parallel-stormy-spica" + BASE_MAINNET_EXPLORER_URL + "/api",
          browserURL: "https://" + "parallel-stormy-spica" + BASE_MAINNET_EXPLORER_URL 
        }
      },
      {
        network: "nebula-mainnet",
        chainId: 1482601649,
        urls: {
          apiURL: "https://" + "green-giddy-denebola" + BASE_MAINNET_EXPLORER_URL + "/api",
          browserURL: "https://" + "green-giddy-denebola" + BASE_MAINNET_EXPLORER_URL
        }
      }
    ]
  }
};

export default config;
