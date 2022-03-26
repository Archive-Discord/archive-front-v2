import React from 'react';
import Sidebar from './sideber';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <div className='flex' style={{paddingTop: "3rem"}}>
        <Sidebar/>
        <div className="w-full md:ml-5 p-4 md:p-4 dark:text-white">
            {children}
        </div>
      </div>
    </>
  );
};

export default Layout;