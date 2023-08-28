import React, { useEffect, useState } from 'react';
import Avatar from './Avatar';
import Carousel from './Carousel';
import SearchBar from './SearchBar';
import RecentDrops from './RecentDrops';
import MintedDrops from './MintedDrops';
import UpcomingDrops from './UpcomingDrops';
import RootContext from '../context/RootContext';

function Outlet() {
  const backgroundImages = [
    "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-james-wheeler-414612.jpg&fm=jpg",
    "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg",
    "https://img.freepik.com/premium-photo/majestic-mountain-range-sunrise-with-small-lake-lone-tree-foreground_685067-2689.jpg?size=626&ext=jpg&ga=GA1.1.1038686110.1692890733&semt=ais",
    "https://img.freepik.com/premium-photo/random-best-photo_865967-223105.jpg?size=626&ext=jpg&ga=GA1.1.1038686110.1692890733&semt=ais",
    "https://img.freepik.com/free-photo/nature-beauty-captured-tranquil-scene-mountain-peak-reflection-generative-ai_188544-12745.jpg?size=626&ext=jpg&ga=GA1.1.1038686110.1692890733&semt=ais"
  ];

  const [backgroundImage, setBackgroundImage] = useState(null);
  const [landingPageBefore, setLandingPageBefore] = useState(null);

  let value = {
    backgroundImages,
    backgroundImage, setBackgroundImage
  };

  useEffect(() => {
    let tempLandingPageBefore = null;

    if (!landingPageBefore) {
      console.log("dhukche");

      Array.from(document.styleSheets).filter(e => {
        let temp = Array.from(e.cssRules).find(ele => {
          return ele.selectorText === ".landing-page::before";
        });

        if (temp) {
          setLandingPageBefore(temp);
          tempLandingPageBefore = temp;
        }

        return temp;
      });
    }

    if (landingPageBefore)
      landingPageBefore.style.backgroundImage = backgroundImage ? backgroundImage : `url(${backgroundImages[0]})`;
    else
      tempLandingPageBefore.style.backgroundImage = backgroundImage ? backgroundImage : `url(${backgroundImages[0]})`;
  }, [backgroundImage]);

  return (
    <RootContext.Provider value={value}>
      <div className="landing-page relative mt-16 sm:mt-0 overflow-x-hidden before:h-[215px] sm:before:h-[240px] before:duration-300 before:scale-150">
        <div className="container mx-auto">
          <div className="relative section-carousel w-full">
            <div className="py-5 mx-6 flex flex-col gap-y-4">
              <div>
                <div className="flex justify-between items-center gap-x-12">
                  <div className="w-full"><SearchBar /></div>
                  <div className="hidden sm:flex gap-x-4">
                    <button className="px-5 font-medium rounded-md bg-white">Upload</button>
                    <div className="">
                      <Avatar
                        twRounded={"rounded-md"}
                        skeletonTwRounded={"before:rounded-md"}
                        // avatar={"https://www.sound.xyz/_next/image?url=https%3A%2F%2Fd16zqvkniqf1rn.cloudfront.net%2Fplaceholders%2Favatars%2Fv2%2F7.jpg&w=64&q=75"}
                        avatar={"after:bg-[url(https://www.sound.xyz/_next/image?url=https%3A%2F%2Fd2i9ybouka0ieh.cloudfront.net%2Fartist-uploads%2F2082be4d-5303-42a3-8b44-9d9bcd9b76b8%2FRELEASE_COVER_IMAGE%2F7715268-newImage.png&w=384&q=75)]"}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="font-medium text-slate-200">
                <span>$5,731,177 Earned by artists from fans on Sound</span>
              </div>
              <div className="">
                <Carousel />
              </div>
            </div>
          </div>
          <div className="px-6 py-5">
            <UpcomingDrops />
          </div>
          <div className="px-6 py-5">
            <MintedDrops />
          </div>
          <div className="px-6 py-5">
            <RecentDrops />
          </div>
        </div>
      </div>
    </RootContext.Provider>
  );
}

export default Outlet;
