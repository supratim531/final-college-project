import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

function UpcomingDrops() {
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
          <SwiperSlide>
            <div className="slide w-full h-[480px] xs:h-[320px] sm:h-[360px] rounded-xl before:hover:scale-125 before:duration-300 overflow-hidden">
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-[480px] xs:h-[320px] sm:h-[360px] rounded-xl bg-red-400"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-[480px] xs:h-[320px] sm:h-[360px] rounded-xl bg-red-400"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-[480px] xs:h-[320px] sm:h-[360px] rounded-xl bg-red-400"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-[480px] xs:h-[320px] sm:h-[360px] rounded-xl bg-red-400"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-[480px] xs:h-[320px] sm:h-[360px] rounded-xl bg-red-400"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-[480px] xs:h-[320px] sm:h-[360px] rounded-xl bg-red-400"></div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default UpcomingDrops;
