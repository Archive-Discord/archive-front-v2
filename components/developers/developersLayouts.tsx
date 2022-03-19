import React from 'react';
import Sidebar from './sideber';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <div className='flex' style={{paddingTop: "3rem"}}>
        <Sidebar/>
        <div className="w-full ml-8 md:ml-7 p-8 md:p-10s dark:bg-battlebot-black dark:text-white">
            {children}
        </div>
      </div>
    </>
  );
};

export default Layout;