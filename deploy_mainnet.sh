#!/bin/bash

set -e

echo "Deploying on Calypso Mainnet"

npx hardhat deploy --network calypso-mainnet --tags origin

echo "Deploying to $1"

npx hardhat deploy --network $1 --tags target

echo "Verifying Calypso Contracts"

npx hardhat verify-origin-contracts --network calypso-mainnet

echo "Verifying $1 Contracts"

npx hardhat verify-target-contracts --network $1