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
