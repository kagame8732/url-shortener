import { useState } from 'react'

const Navbar = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  
  return (
    <div className='h-[80px] border-b border-b-[#bbbbbb] flex items-center px-5'>
        <div className='flex justify-between items-center w-full px-5'>
            <div className='cursor-pointer border border-solid border-off-white rounded-md  flex flex-col justify-center items-center p-2'>
                <div className={`h-[4px] w-[30px] bg-[#363636] ${hamburgerOpen ? 'absolute rotate-45 transition duration-150 ease-in-out' : 'transition duration-150 ease-in-out'}`}></div>
                <div className={`h-[4px] w-[30px] bg-[#363636] mt-[4px] ${hamburgerOpen ? 'hidden' : ''}`}></div>
                <div className={`h-[4px] w-[30px] bg-[#363636] mt-[4px] ${hamburgerOpen ? '-mt-[0.0rem] -rotate-45 transition duration-150 ease-in-out' : 'transition duration-150 ease-in-out'}`}></div>
            </div>

            <div className='flex'>
                <div className='w-10 h-10 rounded-[50%] bg-black'>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar;
