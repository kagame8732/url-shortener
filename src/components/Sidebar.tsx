import { useLocation, useNavigate } from 'react-router-dom';
import LOGO from '../assets/images/abat-logo.png'

export const navItems = [
    {
      label: 'User input mask',
      path: '/user-input-mask',
    },
    {
      label: 'Admin overview',
      path: '/admin-overview',
    }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className='bg-transparent fixed w-1/5 border-r-2 border-r-[#bbbbbb]'>
        <div className='flex flex-col w-full items-start h-screen'>
            <div className='flex flex-col h-full py-[30px] px-[20px] w-full'>
                <div className='w-full flex justify-start items-center px-[10px] mb-10'>
                    <img
                        src={LOGO}
                        alt='logo'
                        className='w-[150px] h-[50px]'
                    />
                </div>
                <div className='flex flex-col items-start gap-[16px] w-full'>
                    {navItems?.map((item: { label: string, path: string }, index: number) => (
                        <div
                            key={index}
                            onClick={() => handleNavigation(item.path)}
                            className={`${location.pathname === item?.path ? 'bg-[#FFFFFF] rounded-lg' : 'font-[500]'} flex flex-col items-start px-[10px] gap-[10px] self-stretch cursor-pointer`}
                        >
                            <span className={`${location.pathname === item?.path && 'font-[700]'} text-[14px] leading-[20.3px] text-[#585858]`}>{item?.label}</span>
                            <p className={`h-[2px] w-[30px] rounded-sm ${location.pathname === item?.path ? 'bg-[#424242]' : 'bg-transparent'}`}></p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar;
