import React from 'react';
import Sidebar from './sideber';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <div className='flex' style={{paddingTop: "3rem"}}>
        <Sidebar/>
        <div className="lg:w-full max-w-[80vw] min-h-[95vh] ml-14 md:ml-64 p-4 md:p-10 dark:bg-battlebot-black dark:text-white">
            {children}
        </div>
      </div>
    </>
  );
};

export default Layout;