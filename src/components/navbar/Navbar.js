import React,{useState} from 'react'
import { useWeb3Modal } from "@web3modal/react";

import { useAccount, useContractReads, useContractWrite } from "wagmi";
const Navbar = () => {

  const [_address, set_user_address] = useState(null);
  const [_web3, set_web3] = useState(null);
  const { open, close } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  return (
    <header className='  w-full   py-5 px-3 md:px-12 flex container mx-auto  justify-between items-center'>
        {/* logo  */}
        <div>
            <img src={require('../../assets/images/logo.png')} width='180px'  alt='' />
        </div>

        <div>
            <button className='primary-btn'           onClick={() => open()}
> {isConnected
            ? address.slice(0, 5) + "..." + address.slice(38, 42)
            : "Connect Wallet"}</button>
        </div>
    </header>
  )
}

export default Navbar