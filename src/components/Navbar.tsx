import { useEffect, useState } from 'react'
import LocalizationSwitcher from './LocalizationSwitcher';
import { useDispatch } from 'react-redux';
import { apis } from '../store/apis';
import { UnknownAction } from '@reduxjs/toolkit';

const Navbar = () => {
  const dispatch = useDispatch();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  useEffect(() => {
    dispatch(apis.switchSides(hamburgerOpen) as unknown as UnknownAction);
  },[hamburgerOpen])
  
  return (
    <div className='h-[80px] border-b border-b-[#bbbbbb] flex items-center px-5'>
        <div className='flex justify-between items-center w-full px-5'>
            <div onClick={() => setHamburgerOpen(!hamburgerOpen)} className='cursor-pointer border border-solid border-off-white rounded-md  flex flex-col justify-center items-center p-2'>
                <div className={`h-[4px] w-[30px] bg-[#363636]`}></div>
                <div className={`h-[4px] w-[30px] bg-[#363636] mt-[4px]`}></div>
                <div className={`h-[4px] w-[30px] bg-[#363636] mt-[4px]`}></div>
            </div>

            <div className='flex'>
              <div className='cursor-pointer'>
                <LocalizationSwitcher />
              </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar;