import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useAccount} from "wagmi";
import Web3 from "web3";
import {
cont_abi,cont_add
} from "../../components/config";
import { useNetwork, useSwitchNetwork } from "wagmi";
import {
  useContractReads,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
const Home = () => {

    const [quantity, set_quantity] = useState("");
    const [presaleTime, set_presaleTime] = useState(0);

    const increment = () => {
      set_quantity(Number(quantity) + 1);
      find_totalAmount()
    };
    const decrement = () => {
      if (Number(quantity) > 1) {
        set_quantity(Number(quantity) - 1);
        find_totalAmount()

      }
    };



    const targetTime = new Date("2035-01-01").getTime();

    const [currentTime, setCurrentTime] = useState(Date.now());

    const timeBetween = (Number(presaleTime)*1000) - currentTime;
    const seconds = Math.floor((timeBetween / 1000) % 60);
    const minutes = Math.floor((timeBetween / 1000 / 60) % 60);
    const hours = Math.floor((timeBetween / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeBetween / (1000 * 60 * 60 * 24));
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);

    const networkId = 137;




    const [totalCount, setTotalCount] = useState(0);
    const { address, isConnected } = useAccount();
    const [presaleCost, set_presaleCost] = useState(0);

    const [supply, set_supply] = useState(0);
    const [cost, set_cost] = useState(0);
    const [ref_percentage, set_ref_percentage] = useState(0);
    const [total_price, set_total_price] = useState(0); 
    const [maxSupply, set_maxSupply] = useState(0);
    const [balance, set_balance] = useState(0);
    const [curr_time, set_curr_time] = useState("");
    const [curr_price, set_curr_price] = useState("");

  
    const [ref, set_ref] = useState("0x0000000000000000000000000000000000000000");
  
  
  
  
    const { chain } = useNetwork();
  
  
  
    const {
      data: stakeResult,
      isLoading: isLoading_stake,
      isSuccess: stakeSuccess,
      write: mint,
    } = useContractWrite({
      address: cont_add,
      abi: cont_abi,
      functionName: "mint",
      args: [address,quantity],
      value: (Number(quantity)* Number(curr_price)).toString(),
      // value: ((perPlpValue * ((stakeAmount * 3)/100))/perPlsUsd)/10**18,
      onSuccess(data) {
        test();
        console.log("Success", data);
      },
    });
  
  
  
  
    
    async function mintNft() {
      console.log("object mint "+ref);
      if((Number(curr_price) * Number(quantity)) > Number(balance) )
      {
        alert("you dont have enough balance to buy");
        return
      }
      if(Number(quantity) == 0 || quantity == "")
      {
        alert("kindly write the amount");
        return
      }
  
      if (chain.id != networkId) {
        mint_switch?.();
      } else {
        mint?.();
      }
    }
  
  
    useEffect(()=>{
  
      if(isConnected)
      {
        test();
  
      }
    
    },[address])
  
    function Convert_To_Wei(val) {
      const web3= new Web3(new Web3.providers.HttpProvider("https://polygon-bor.publicnode.com"));
    
      val = web3.utils.toWei(val.toString(), "ether");
      return val;
    }
  
    async function test() 
    {
  
      const web3= new Web3(new Web3.providers.HttpProvider("https://polygon-bor.publicnode.com"));
  
  
      const balance = await web3.eth.getBalance(address);
      const contract = new web3.eth.Contract(cont_abi, cont_add);
      console.log("object1");
      let supply = await contract.methods.totalSupply().call();
      let public_cost = await contract.methods.cost().call();
      let presale_cost = await contract.methods.presaleCost().call();
      let currentTime = await contract.methods.curr_time().call();  
      let presaleTime = await contract.methods.presale_time().call();  

      let maxSupply = await contract.methods.maxSupply().call();
  
      set_curr_time(currentTime);
      set_presaleCost(presale_cost);
      set_maxSupply(maxSupply);
      set_cost(public_cost)
      set_presaleTime(presaleTime)
      set_balance(balance)
      set_supply(supply)

      if(curr_time < presaleTime)
      {
        set_curr_price(presale_cost)
      }
      else{
        set_curr_price(public_cost)

      }
      console.log("test done");
    }
  function find_totalAmount(){
    set_total_price(Number(quantity)* Number(curr_price/10**18));
  }
  
    const { switchNetwork: mint_switch } = useSwitchNetwork({
      chainId: networkId,
      // throwForSwitchChainNotSupported: true,
      onSuccess() {
        mint?.();
      },
    });
  
  
    const waitForTransaction2 = useWaitForTransaction({
      hash: stakeResult?.hash,
      onSuccess(data) {
        test?.();
        console.log("Success2", data);
      },
    });
  return (
    <div>
        <Navbar/>


        <div className=' mb-12  mt-12 border-white rounded-md  p-5 w-[80%] md:w-[35%] border  mx-auto h-auto' style={{marginTop:70,paddingTop:40, maxWidth:500
         }} >
         {presaleTime>curr_time?(

<>


         
           <div className=' text-center  ' >
           <h2 className=' text-white text-xl  sm:text-3xl'>LIMITED TIME PRE-SALE</h2>
           </div>

            <div className=' flex py-5 justify-center gap-6'>
                <div className=' days text-center'>
                    <h2 className=' text-white'>{days}</h2>
                    <span className=' text-white'>Days</span>
                </div>
                <div className=' hours text-center'>
                    <h2 className=' text-white'>{hours}</h2>
                    <span className=' text-white'>Hours</span>
                </div>
                <div className=' minutes text-center'>
                    <h2 className=' text-white'>{minutes}</h2>
                    <span className=' text-white'>Minutes</span>
                </div>
                <div className=' seconds text-center'>
                    <h2 className=' text-white'>{seconds}</h2>
                    <span className=' text-white'>Seconds</span>
                </div>
            </div>
            </>

         ):(null)
         
         }
            <div className=' my-4 flex justify-between items-center border border-white rounded-md p-3'>
                <div>
                    <img src={require('../../assets/images/Master-Gif.gif')} height='110px' width="140px" className=' rounded-md'   alt='' />
                </div>
                <div>
                    <h2 className=' text-gray-200 text-sm'>Price Per NFT</h2>
                    <p className=' text-white font-normal'>{curr_price/10**18} MATIC EACH</p>
                </div>
            </div>



            <div className=' my-4 flex justify-between items-center border border-white rounded-md p-3'>
                <div>
                   <h2 className=' text-white'>Available To Mint</h2>
                </div>
                <div>
                    
                    <p className=' text-white'>{supply} minuted out of {maxSupply}</p>
                </div>
            </div>


            <div className=' my-4 sm:flex  block justify-between items-center border border-white rounded-md p-3'>
                <div>
                   <h2 className=' text-white  font-normal' onClick={mint}> Mint Amount</h2>
                </div>
                <div>
                    
                    {/* <p className=' text-white'>0 minuted out of 0</p> */}

                    <div className=' flex justify-between  rounded-sm p-1 bg-white gap-1'>
                        <div    onClick={decrement} className=' bg-[#E57004] rounded-sm  w-8 flex justify-center items-center h-8'>
                            <span className=' text-white'>-</span>
                        </div>
                    <input  type='number' readOnly placeholder='1' className=' w-20 text-center' value={quantity}  />
                    <div    onClick={increment} className='bg-[#E57004] rounded-sm  w-8 flex justify-center items-center h-8'>
                            <span className=' text-white'>+</span>
                        </div>
                    </div>
                </div>
            </div>


            <div className=' my-4 flex justify-between items-center border border-white rounded-md p-3'>
                <div>
                   <h2 className=' text-white font-normal'> Total Amount</h2>
                </div>
                <div>
                    
                    <p className=' text-white'>{(Number(quantity)* Number(curr_price))/10**18} MATIC</p>
                </div>
            </div>

           <div className=' mt-6'>
           <button className='primary-btn  w-full  text-lg' onClick={mintNft}>MINT NFT NOW</button>
           </div>
        </div>
    </div>
  )
}

export default Home