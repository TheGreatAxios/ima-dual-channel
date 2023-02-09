export type HardhatId = 
    "nebula-mainnet"        |
    "titan-mainnet"         |
    "calypso-mainnet"       |
    "nebula-staging-v3"     |
    "titan-staging-v3"      |
    "calypso-staging-v3"    ;

export const networks: Record<HardhatId, string> = {
    "nebula-mainnet": "green-giddy-denebola",
    "titan-mainnet": "parallel-stormy-spica",
    "calypso-mainnet": "honorable-steel-rasalhague",
    "nebula-staging-v3": "staging-faint-slimy-achird",
    "titan-staging-v3": "staging-aware-chief-gianfar",
    "calypso-staging-v3": "staging-utter-unripe-menkar"
}

export default function getNetworkName(hardhatId: HardhatId) : string {
    return networks[hardhatId];
}