'use client';
import { useState } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import Button from '@mui/base/Button';
import { ethers } from 'ethers';

const inter = Inter({ subsets: ['latin'] });

function shortenWalletAddress(walletAddress: string, length: number): string {
  const prefixLength = Math.floor(length / 2);
  const suffixLength = length - prefixLength;
  const prefix = walletAddress.substring(0, prefixLength);
  const suffix = walletAddress.substring(walletAddress.length - suffixLength);
  return prefix + '...' + suffix;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<string | null>(null);

  const connectToMetamask = async () => {
    if ((window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please install MetaMask');
    }
  };
  return (
    <html lang='en'>
      <body className={`${inter.className}`}>
        <main className='w-[375px] h-[676px] bg-black/80 flex items-center justify-center flex-col'>
          <div className='w-[90%] h-[90%] flex items-center justify-center bg-white rounded-xl pt-12 px-5 flex-col'>
            <header className='flex items-center justify-between w-full'>
              <div>Eco Vote</div>
              <Button className='button' onClick={connectToMetamask}>
                {account ? shortenWalletAddress(account, 9) : 'Connect Wallet'}
              </Button>
            </header>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
