import React, { useContext } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import RootContext from '../context/RootContext';

function Carousel() {
  const context = useContext(RootContext);

  return (
    <div className="carousel">
      <Swiper
        onSlideChange={e => {
          context.setBackgroundImage(e.el.children[0].children[e.activeIndex].children[0].style.backgroundImage);
        }}
        slidesPerView={'auto'}
        spaceBetween={20}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="swiperjs-carousel"
      >
        {
          context.backgroundImages?.map((backgroundImage, index) => {
            return (
              <SwiperSlide key={index} className="rounded-3xl bg-red-400">
                <div style={{ backgroundImage: `url(${backgroundImage})` }} className="w-full h-[420px] rounded-3xl bg-cover">
                  <div className="spotlight rounded-3xl h-full w-[100%]">
                    <div className="h-full px-5 md:px-10 flex justify-between">
                      <div className="w-full md:w-[55%] py-12 md:py-16 lg:py-0 flex items-end md:items-center">
                        <div className="w-full flex gap-x-4">
                          <button className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-5 rounded-md bg-white">
                            <i className="fa-solid fa-play ml-0.5 text-xl sm:text-2xl md:text-3xl"></i>
                          </button>
                          <h1 className="font-extrabold truncate sm:text-2xl md:text-4xl text-white">Wishing You Well</h1>
                        </div>
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
  );
}

export default Carousel;
