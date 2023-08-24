import React, { useEffect, useRef } from 'react';
import Avatar from './Avatar';

function Navigation({ RootComponent }) {
  const sidebar = useRef(null);

  const openSidebar = () => {
    sidebar.current.style.transform = "translateX(0%)";
  }

  const closeSidebar = () => {
    if (window.screen.width < 640) {
      sidebar.current.style.transform = "translateX(-100%)";
    }
  }

  useEffect(() => {
    console.log("sidebar:", sidebar);
  });

  return (
    <>
      <nav className="sm:hidden fixed z-10 top-0 px-4 py-2 w-full shadow shadow-slate-400 bg-white">
        <div className="flex justify-between items-center">
          <button onClick={openSidebar} className="hamburger px-2 pt-2 pb-1 rounded-sm outline outline-1 outline-slate-400 active:outline-2">
            <i className="fa-solid fa-bars text-[2.1rem] text-slate-600"></i>
          </button>
          <div className="">
            {
              window.screen.width <= 480 ?
                <Avatar
                  sizeInPixel={50}
                  skeletonSizeInPixel={20}
                  avatar={"https://www.sound.xyz/_next/image?url=https%3A%2F%2Fd2i9ybouka0ieh.cloudfront.net%2Fartist-uploads%2F2082be4d-5303-42a3-8b44-9d9bcd9b76b8%2FRELEASE_COVER_IMAGE%2F7715268-newImage.png&w=384&q=75"}
                /> :
                <Avatar
                  sizeInPixel={55}
                  skeletonSizeInPixel={25}
                  avatar={"https://www.sound.xyz/_next/image?url=https%3A%2F%2Fd2i9ybouka0ieh.cloudfront.net%2Fartist-uploads%2F2082be4d-5303-42a3-8b44-9d9bcd9b76b8%2FRELEASE_COVER_IMAGE%2F7715268-newImage.png&w=384&q=75"}
                />
            }
          </div>
        </div>
      </nav>

      <aside onClick={closeSidebar} ref={sidebar} className="fixed left-0 top-0 z-10 h-screen w-full translate-x-[-100%] sm:translate-x-0 sm:w-[3.73rem] lg:w-[244px] sm:hover:w-[244px] duration-300 border-r border-gray-300/40 bg-sky-400">
      </aside>

      <main className="sm:w-[calc(100%-3.73rem)] lg:w-[calc(100%-244px)] h-screen ml-auto">
        {<RootComponent />}
      </main>
    </>
  );
}

export default Navigation;
