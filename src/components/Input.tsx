import { Sendurl } from '@/pages/UiControllers/controller';
import { log } from 'console';
import { LogIn, X } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CopyWithIcon from './CopyWithIcon';

const Input = () => {
  
  const [Input,setInput]=useState<string>()
  const [data,setData]=useState({Url_Key:''})
  const [isPortal,setIsPortal]=useState<boolean>(false)
  const [fullUrl, setFullUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  
useEffect(() => {
  console.log(data);
      if (data && typeof window !== "undefined") {
      const abs = `${window.location.origin}/${data}`;
      setFullUrl(abs);
    }

  }, [data?.Url_Key]);

  const sendurlHandler=async()=>{
    if(Input!?.length<0) return alert('Enter The Url');

   const regex=/^(https?:\/\/|ftp:\/\/|www\.|mailto:|tel:)/i 
   const isLink=regex.test(Input || " ")
  
   console.log(isLink,Input);
   
   if(!isLink) return alert('Link is Broken');
    const res=await Sendurl({url:Input!})
  if(res.success){
  setIsPortal(true)
  const key=res.UrlDataInModel?.Url_Key||res.urlKey
  console.log(key);
  setData(key)
  console.log(key);
  
  }
    
  }

  
  return (
    <div>
     {!isPortal&&<StyledWrapper>
      <div className="input__container">
        <div className="shadow__input" />
          <input type="text" name="URLSHORTNER" className="input__search" placeholder="Enter URL" onChange={(e)=>setInput(e.target.value)} />
        <button className="input__button__shadow" onClick={sendurlHandler}>
          <img src="/link.png" alt="" className="w-8 text-blue-900 h-5" />
        </button>
      
      </div>


    </StyledWrapper>}

    {isPortal&&<>
    <div className=' w-[90vw] h-[30vh] bg-black/50 flex justify-center items-center'>
      <div className='w-full h-[80%] flex justify-between items-center flex-col'>
        <nav className=' bg-amber-500 w-full flex   justify-end px-2'>
         <button onClick={()=>setIsPortal(false)} className='cursor-pointer hover:text-white text-black'>
      <X size={29}  />
    </button>
        </nav>
       <div className=' flex flex-row w-full  bg-transparent justify-start px-3 items-center flex-1 lg:justify-center backdrop-blur-2xl'>
   <span className=' border-1   text-white rounded text-xs sm:text-xs lg:text-3xl  px-2 mr-5'>{`BYTE-URL->`}</span>
   <a className=' hover:text-amber-600 text-xs hover:translate-4 hover:transform-3d duration-300 transition-all delay-100 lg:text-2xl underline ml-5  mr-5' href={fullUrl}>{`${fullUrl}`}</a>
   <CopyWithIcon text={fullUrl} />
       </div>
      </div>
    </div>
    </>}
    </div>
  );
};

const StyledWrapper = styled.div`
  .input__container {
    position: relative;
    background: #f0f0f0;
    padding: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    border: 4px solid #000;
    max-width: 350px;
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
    transform-style: preserve-3d;
    transform: rotateX(10deg) rotateY(-10deg);
    perspective: 1000px;
    box-shadow: 10px 10px 0 #000;
  }

  .input__container:hover {
    transform: rotateX(5deg) rotateY(1deg) scale(1.05);
    box-shadow: 25px 25px 0 -5px #e9b50b, 25px 25px 0 0 #000;
  }

  .shadow__input {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: -1;
    transform: translateZ(-50px);
    background: linear-gradient(
      45deg,
      rgba(255, 107, 107, 0.4) 0%,
      rgba(255, 107, 107, 0.1) 100%
    );
    filter: blur(20px);
  }

  .input__button__shadow {
    cursor: pointer;
    border: 3px solid #000;
    background: #e9b50b;
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    transform: translateZ(20px);
    position: relative;
    z-index: 3;
    font-weight: bold;
    text-transform: uppercase;
  }

  .input__button__shadow:hover {
    background: #e9b50b;
    transform: translateZ(10px) translateX(-5px) translateY(-5px);
    box-shadow: 5px 5px 0 0 #000;
  }

  .input__button__shadow svg {
    fill: #000;
    width: 25px;
    height: 25px;
  }

  .input__search {
    width: 100%;
    outline: none;
    border: 3px solid #000;
    padding: 15px;
    font-size: 18px;
    background: #fff;
    color: #000;
    transform: translateZ(10px);
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
    z-index: 3;
    font-family: "Roboto", Arial, sans-serif;
    letter-spacing: -0.5px;
  }

  .input__search::placeholder {
    color: #666;
    font-weight: bold;
    text-transform: uppercase;
  }

  .input__search:hover,
  .input__search:focus {
    background: #f0f0f0;
    transform: translateZ(20px) translateX(-5px) translateY(-5px);
    box-shadow: 5px 5px 0 0 #000;
  }

  .input__container::before {
    content: "URL SHORTNER";
    position: absolute;
    top: -15px;
    left: 20px;
    background: #e9b50b;
    color: #000;
    font-weight: bold;
    padding: 5px 10px;
    font-size: 14px;
    transform: translateZ(50px);
    z-index: 4;
    border: 2px solid #000;
  }
`;

export default Input;
