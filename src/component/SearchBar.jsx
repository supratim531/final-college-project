import React from 'react';

function SearchBar() {
  return (
    <div className="search-bar relative mt-4 sm:mt-0 text-black">
      <div className="w-4 absolute bottom-[30%] left-3 top-[35%] sm:top-[30%]">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" className="svg-inline--fa fa-magnifying-glass " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"></path></svg>
      </div>
      <input className="w-full py-3 sm:py-2 pl-10 pr-4 rounded-lg duration-300 focus:outline-none placeholder:select-none placeholder:text-slate-200 focus:bg-white focus:text-black focus:placeholder:text-slate-400 hover:placeholder:text-slate-400 hover:bg-white bg-slate-100/40" type="text" name="" id="" placeholder="Search for anything on Sound" />
    </div>
  );
}

export default SearchBar;
