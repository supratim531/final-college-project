import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Navigation } from 'swiper/modules';
import Avatar from './Avatar';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

function MintedDrops() {
  const slideImages = [
    "before:bg-[url(https://www.sound.xyz/_next/image?url=https%3A%2F%2Fd2i9ybouka0ieh.cloudfront.net%2Fartist-uploads%2F9a1fc2b0-a6a5-461c-ad9b-0b5e0470d844%2FRELEASE_COVER_IMAGE%2F1553383-newImage.png&w=640&q=75)]",
    "before:bg-[url(https://www.sound.xyz/_next/image?url=https%3A%2F%2Fd2i9ybouka0ieh.cloudfront.net%2Fartist-uploads%2Fb8b38cf4-d2c9-431a-9b9f-63175ea256e8%2FRELEASE_COVER_IMAGE%2F9148347-newImage.png&w=640&q=75)]",
    "before:bg-[url(https://www.sound.xyz/_next/image?url=https%3A%2F%2Fd2i9ybouka0ieh.cloudfront.net%2Fartist-uploads%2F3406b6ca-5a30-4a9f-80d3-41dc38984fb5%2FRELEASE_WEB_STATIC_IMAGE%2F2471506-newImage.png&w=384&q=75)]",
    "before:bg-[url(https://www.sound.xyz/_next/image?url=https%3A%2F%2Fd2i9ybouka0ieh.cloudfront.net%2Fartist-uploads%2F9ce6cc2c-f66e-4e1c-9483-b2d90721b724%2FRELEASE_COVER_IMAGE%2F6127373-newImage.png&w=640&q=75)]",
    "before:bg-[url(https://www.sound.xyz/_next/image?url=https%3A%2F%2Fd2i9ybouka0ieh.cloudfront.net%2Fartist-uploads%2Fec8f4d60-f05f-419c-8788-e898883e8a33%2FRELEASE_COVER_IMAGE%2F9749089-newImage.png&w=384&q=75)]",
    "before:bg-[url(https://www.sound.xyz/_next/image?url=https%3A%2F%2Fd2i9ybouka0ieh.cloudfront.net%2Fartist-uploads%2F5a2b085c-e7a2-4590-b3e6-800b284a0698%2FRELEASE_COVER_IMAGE%2F5988474-newImage.png&w=384&q=75)]",
    "before:bg-[url(https://www.sound.xyz/_next/image?url=https%3A%2F%2Fd2i9ybouka0ieh.cloudfront.net%2Fartist-uploads%2F36c9b18d-63c1-4d8b-bb3f-6e7db4f4d666%2FRELEASE_COVER_IMAGE%2F8311342-newImage.png&w=384&q=75)]",
  ];

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-4 justify-between items-center">
        <div className="text-2xl font-medium">Freshly Minted Drops by Top Collectors</div>
        {
          window.screen.width >= 640 ?
            <div className="px-2 font-medium select-none cursor-pointer rounded-lg outline outline-1 text-slate-800 hover:bg-slate-200 outline-slate-200">See All</div> :
            <div className="self-start">
              <i className="fa-solid fa-chevron-right text-xl"></i>
            </div>
        }
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
                        <div className="px-2 py-0.5 pt-1 font-semibold xs:text-[10.5px] sm:text-[12.5px] rounded-full backdrop-blur-lg text-white bg-black/30">Ends in 4d</div>
                      </div>
                      <div className="px-2">
                        <div className="px-1 mb-3 text-white">
                          <h1 className="w-[80%] text-xs truncate text-slate-300/60">Hermit Poems</h1>
                          <h1 className="font-medium text-[0.79rem] sm:text-xl truncate">Sarah Krimson - Burning London (Full EP)</h1>
                        </div>
                        <div className="mb-4 flex justify-between items-center rounded-md">
                          <div className="w-[50%] flex gap-x-2 items-center">
                            <div className="">
                              <Avatar
                                sizeInPixel={25}
                                skeletonSizeInPixel={15}
                                twRounded={"rounded-full"}
                                skeletonTwRounded={"before:rounded-full"}
                                avatar={"after:bg-[url(https://www.sound.xyz/_next/image?url=https%3A%2F%2Fd2i9ybouka0ieh.cloudfront.net%2Fartist-uploads%2F2082be4d-5303-42a3-8b44-9d9bcd9b76b8%2FRELEASE_COVER_IMAGE%2F7715268-newImage.png&w=384&q=75)]"}
                              />
                            </div>
                            <div className="text-xs font-semibold truncate text-white">Utsav Chatterjee</div>
                          </div>
                          <div className="text-[12px] text-gray-400/70">minted 1 edition</div>
                        </div>
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

export default MintedDrops;
