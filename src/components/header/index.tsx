import SettingsIcon from "assets/images/settings.png";
import notificationIcon from "assets/images/notification.png";
import barsIcon from "assets/images/bars.png";
import avatar from "assets/images/avatar.png";

export const Header = () => {
  return (
    <div className='border-[#EAECF0]  border-b-[1px]  w-full'>
      <header className='h-[72px] max-w-[1440px] mx-auto  px-4 xl:px-[164px]  flex-row-between'>
        <h1 className='font-inter leading-6 text-[24px] font-black'>ToDo</h1>
        <div className=' hidden sm:flex items-center gap-1'>
          <button className='p-[10px] w-[40px] h-[40px]'>
            <img src={SettingsIcon} alt='Settings Icon' />
          </button>
          <button className='p-[10px] w-[40px] h-[40px]'>
            <img src={notificationIcon} alt='Settings Icon' />
          </button>
          <button className='w-[40px] ml-3 h-[40px]'>
            <img src={avatar} alt='Settings Icon' />
          </button>
        </div>
        <button className='flex sm:hidden'>
          <img src={barsIcon} alt='Settings Icon' />
        </button>
      </header>
    </div>
  );
};
