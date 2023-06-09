import { ethers } from 'ethers';
import { ContractTransaction } from 'ethers';

const CONTRACT_ADDRESS = '0xCdb3DE6EB50cff84bC26fCA7D9E6937E2D00BeC5';

export function getProvider() {
  return new ethers.providers.Web3Provider((window as any).ethereum, 80001);
}
export async function getContract() {
  const abi = require('../../abis/Vote.json');
  return new ethers.Contract(CONTRACT_ADDRESS, abi.abi, getProvider().getSigner());
}

export const handleContractTransaction = async (tx: ContractTransaction | undefined) => {
  const contractReceipt = await tx?.wait?.();
  if (contractReceipt && contractReceipt.blockNumber) {
    return contractReceipt;
  }
  return null;
};
