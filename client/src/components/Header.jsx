import React from "react";
import useMetaMaskAuth from "../hooks/useMetaMaskAuth";
import { FaMagnifyingGlass, FaWallet } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";

const Header = () => {
  const navigate = useNavigate();
  const { connectWallet } = useMetaMaskAuth();
  const { status, isWalletConnected } = useSelector((state) => state.auth);

  return (
    <nav className="px-8 py-4 flex justify-between items-center gap-8 border-b border-b-slate-400 bg-[#121212]">
      <div
        onClick={() => navigate("/")}
        className="relative cursor-pointer flex justify-center items-center gap-2"
      >
        <img
          className="w-10"
          src="https://testnets.opensea.io/static/images/logos/opensea-logo.svg"
          alt="logo"
        />
        <span className="font-[Poppins] font-semibold text-xl text-white">
          rythmXchange
        </span>
        <span className="absolute -bottom-3 right-0 text-[10px] px-[4px] pt-[2px] rounded bg-[#f2994a]">
          Testnets
        </span>
      </div>
      <ul className="flex items-center gap-4 text-white">
        {isWalletConnected && (
          <Link to={"/songs"}>
            <li>Songs</li>
          </Link>
        )}
        {isWalletConnected && (
          <Link to={"/upload"}>
            <li>Upload</li>
          </Link>
        )}
        {isWalletConnected && (
          <Link to={"/market"}>
            <li>MarketPlace</li>
          </Link>
        )}
      </ul>
      <div className="hidden group px-4 flex-grow items-center rounded-[0.5rem] transition-all bg-[#1b1b1b] hover:bg-[#252525]">
        <FaMagnifyingGlass color="white" />
        <input
          className="pl-4 pr-2 py-3 w-full transition-all focus:outline-none text-gray-400 placeholder:text-gray-400 bg-[#1b1b1b] group-hover:bg-[#252525]"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="">
        {isWalletConnected ? (
          <Profile />
        ) : status === "pending" ? (
          <button
            disabled
            className="italic px-4 py-3 flex justify-center items-center gap-2 opacity-70 rounded-[0.5rem] text-white bg-[#1b1b1b]"
          >
            <span className="italic">Connecting...</span>
          </button>
        ) : (
          <button
            onClick={connectWallet}
            className="px-4 py-3 flex justify-center items-center gap-2 rounded-[0.5rem] transition-all text-white bg-[#1b1b1b] hover:bg-[#252525]"
          >
            <span>Connect</span>
            <FaWallet color="white" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
