import { ethers } from 'ethers';
import { ContractTransaction } from 'ethers';

const CONTRACT_ADDRESS = '0x4aBCa6D51b42bA971919056349C63e1da0bbC765';

export function getProvider() {
  return new ethers.providers.Web3Provider(window.ethereum, 80001);
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
