import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

function UpcomingDrops() {
  const slideImages = [
    "before:bg-[url(https://www.sound.xyz/_next/image?url=https%3A%2F%2Fd2i9ybouka0ieh.cloudfront.net%2Fartist-uploads%2F23d3b091-b365-4047-b2a3-327f101be4ad%2FRELEASE_COVER_IMAGE%2F2497527-newImage.png&w=384&q=75)]",
    "before:bg-[url(https://www.sound.xyz/_next/image?url=https%3A%2F%2Fd2i9ybouka0ieh.cloudfront.net%2Fartist-uploads%2Fb4f2c3d1-1bb1-4fc6-b502-a4126a2ec645%2FRELEASE_COVER_IMAGE%2F3526552-newImage.png&w=384&q=75)]",
    "before:bg-[url(https://www.sound.xyz/_next/image?url=https%3A%2F%2Fd2i9ybouka0ieh.cloudfront.net%2Fartist-uploads%2F331898db-bd7e-4a93-92cc-3e9a5fc448b7%2FRELEASE_COVER_IMAGE%2F9286349-newImage.png&w=384&q=75)]",
    "before:bg-[url(https://www.sound.xyz/_next/image?url=https%3A%2F%2Fd2i9ybouka0ieh.cloudfront.net%2Fartist-uploads%2F20b392cd-c180-4637-a11a-3a9c5e153a18%2FRELEASE_COVER_IMAGE%2F1043081-newImage.png&w=384&q=75)]",
    "before:bg-[url(https://www.sound.xyz/_next/image?url=https%3A%2F%2Fd2i9ybouka0ieh.cloudfront.net%2Fartist-uploads%2F20b392cd-c180-4637-a11a-3a9c5e153a18%2FRELEASE_COVER_IMAGE%2F6525340-newImage.png&w=384&q=75)]",
    "before:bg-[url(https://www.sound.xyz/_next/image?url=https%3A%2F%2Fd2i9ybouka0ieh.cloudfront.net%2Fartist-uploads%2Fb4f2c3d1-1bb1-4fc6-b502-a4126a2ec645%2FRELEASE_COVER_IMAGE%2F6332936-newImage.png&w=384&q=75)]",
    "before:bg-[url(https://www.sound.xyz/_next/image?url=https%3A%2F%2Fd2i9ybouka0ieh.cloudfront.net%2Fartist-uploads%2F20b392cd-c180-4637-a11a-3a9c5e153a18%2FRELEASE_COVER_IMAGE%2F7105013-newImage.png&w=384&q=75)]",
  ];

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-4 justify-between items-center">
        <div className="text-2xl font-medium">Upcoming Drops</div>
        {
          window.screen.width >= 640 ?
            <div className="px-2 font-medium select-none cursor-pointer rounded-lg outline outline-1 text-slate-800 hover:bg-slate-200 outline-slate-200">See All</div> :
            <div className="self-start">
              <i className="fa-solid fa-chevron-right text-xl"></i>
            </div>
        }
      </div>
      <div className="flex gap-x-3">
        <button className="px-3 py-1 rounded-lg font-medium text-white/90 bg-[#262626]">Hot</button>
        <button className="px-3 py-1 rounded-lg text-slate-700 hover:bg-[#262626]/20 bg-slate-100">Following</button>
      </div>
      <div className="slider-ud w-full">
        <Swiper
          spaceBetween={20}
          navigation={window.screen.width > 640 ? true : false}
          modules={[Navigation]}
          breakpoints={{
            480: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
            1600: {
              slidesPerView: 5,
            },
          }}
          className="swiperjs-slider-ud"
        >
          {
            slideImages?.map((slideImage, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className={`slide relative w-full h-[480px] xs:h-[320px] sm:h-[360px] rounded-xl overflow-hidden before:hover:scale-125 before:duration-300 ${slideImage}`}>
                    <div className="h-full flex flex-col justify-between">
                      <div className="px-1.5 py-3 flex justify-end">
                        <div className="px-2 py-0.5 pt-1 font-semibold xs:text-[10.5px] sm:text-[12.5px] rounded-full backdrop-blur-lg text-white bg-black/30">Starts Aug 30, 12:30PM</div>
                      </div>
                      <div className="px-2">
                        <div className="px-1 mb-3 text-white">
                          <h1 className="w-[80%] text-xs truncate text-slate-300/60">Hermit Poems</h1>
                          <h1 className="font-medium text-[0.79rem] sm:text-xl truncate">Sarah Krimson - Burning London (Full EP)</h1>
                        </div>
                        <button className="mb-2 py-2 w-full space-x-1 rounded-md font-semibold bg-white">
                          <span><i className="fa-solid fa-bell"></i></span>
                          <span>Get Notified</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })
          }
        </Swiper>
      </div>
    </div>
  );
}

export default UpcomingDrops;
