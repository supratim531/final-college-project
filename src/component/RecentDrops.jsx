import React from 'react';

function RecentDrops() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center">
        <div className="text-2xl font-medium">Recent Drops</div>
      </div>
      <div className="flex gap-x-3">
        <button className="px-3 py-1 rounded-lg font-medium text-white/90 bg-[#262626]">Hot</button>
        <button className="px-3 py-1 rounded-lg text-slate-700 hover:bg-[#262626]/20 bg-slate-100">Following</button>
      </div>
      <div className="recent-drops grid gap-6">
        <div className="h-[480px] xs:h-[320px] sm:h-[360px] rounded-xl bg-red-400"></div>
        <div className="h-[480px] xs:h-[320px] sm:h-[360px] rounded-xl bg-red-400"></div>
        <div className="h-[480px] xs:h-[320px] sm:h-[360px] rounded-xl bg-red-400"></div>
        <div className="h-[480px] xs:h-[320px] sm:h-[360px] rounded-xl bg-red-400"></div>
        <div className="h-[480px] xs:h-[320px] sm:h-[360px] rounded-xl bg-red-400"></div>

        <div className="h-[480px] xs:h-[320px] sm:h-[360px] rounded-xl bg-red-400"></div>
        <div className="h-[480px] xs:h-[320px] sm:h-[360px] rounded-xl bg-red-400"></div>
        <div className="h-[480px] xs:h-[320px] sm:h-[360px] rounded-xl bg-red-400"></div>
      </div>
      <div className="flex justify-center items-center">
        <button className="px-6 py-2 font-medium rounded-md outline outline-1 outline-slate-800 active:outline-2 hover:shadow hover:shadow-slate-600 hover:bg-slate-100 text-slate-800">See All</button>
      </div>
    </div>
  );
}

export default RecentDrops;
