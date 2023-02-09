#!/bin/bash

set -e

if [[ $1 != "titan-staging-v3" ]] && [[ $1 != "nebula-staging-v3" ]]
then
    echo "First Param must be titan-staging-v3 or nebula-staging-v3"
    exit 1
fi

echo "Deploying on Calypso Staging"

npx hardhat deploy --network calypso-staging-v3 --tags origin

echo "Deploying to $1"

npx hardhat deploy --network $1 --tags target

echo "Verifying Calypso Contracts"

npx hardhat verify-origin-contracts --network calypso-staging-v3

echo "Verifying $1 Contracts"

npx hardhat verify-target-contracts --network $1