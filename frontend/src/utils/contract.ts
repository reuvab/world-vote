import { ethers } from 'ethers';
import { ContractTransaction } from 'ethers';

const CONTRACT_ADDRESS = '0x274B73F17eeED99bc0cdf0521F55AEc84FE2b6CE';

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
