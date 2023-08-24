import React from 'react';

function Avatar({ avatar, twRounded, skeletonTwRounded, sizeInPixel, skeletonSizeInPixel }) {
  return (
    <div style={{ height: `${sizeInPixel ? sizeInPixel : 40}px`, width: `${sizeInPixel ? sizeInPixel : 40}px` }} className={`relative cursor-pointer ${twRounded ? twRounded : "rounded"} before:content-[''] before:absolute before:w-full before:h-full ${skeletonTwRounded ? skeletonTwRounded : "before:rounded"} before:z-[-1] before:animate-pulse before:bg-slate-300`}>
      <div className="absolute z-[-1] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <svg style={{ height: `${skeletonSizeInPixel ? skeletonSizeInPixel : 20}px`, width: `${skeletonSizeInPixel ? skeletonSizeInPixel : 20}px` }} className="text-slate-400 animate-pulse" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <img className={`${twRounded ? twRounded : "rounded"}`} src={avatar} alt="" />
    </div>
  );
}

export default Avatar;
