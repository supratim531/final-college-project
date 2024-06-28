import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import axios from "../axios";
import { getAllSongs } from "../redux/services/businessServices";
import Wallet from "./Wallet";
import MusicPlayer from "./MusicPlayer";

const MarketPlace = () => {
  const dispatch = useDispatch();
  const etherConversion = useLoaderData();
  const [songURL, setSongURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tokensOnSale, setTokenOnSale] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMusicPlayed, setIsMusicPlayed] = useState(false);
  const [selectedTokenId, setSelectedTokenId] = useState("");
  const { tokens } = useSelector((state) => state.business);
  const [totalEarningsFromArtists, setTotalEarningsFromArtists] = useState("");
  const { wallet, nftContract, businessContract } = useSelector(
    (state) => state.auth
  );

  const getTotalEarningsFromArtists = async () => {
    try {
      const inrPerEth = 1 / etherConversion?.ETH;
      const res = await businessContract.totalEarningsFromArtists();
      console.log({ res });
      const etherToINR = ethers.formatEther(res.toString()) * inrPerEth;
      console.log({ etherToINR });
      setTotalEarningsFromArtists(etherToINR);
    } catch (err) {
      console.log({ err });
    }
  };

  const handlePurchaseToken = async (tokenId, price) => {
    setIsProcessing(true);

    try {
      const tx = await businessContract.purchaseToken(
        nftContract.target,
        tokenId,
        { value: price }
      ); // price in wei
      console.log({ tx });
      const receipt = await tx.wait();
      console.log({ receipt });
      // set Approval for all NFTs to the Business Contract in order to manage NFTs on behalf of the creator/owner
      await (
        await nftContract.setApprovalForAll(businessContract.target, true)
      ).wait();
      setIsProcessing(false);
      toast.success(
        `You successfully purchased the NFT and now you are the owner of #${tokenId}`,
        {
          position: "top-left",
        }
      );
      console.log("calling the getAllSongs function again");
      dispatch(getAllSongs(businessContract));
    } catch (err) {
      console.log({ err });
      setIsProcessing(false);
      toast.error("Something went wrong OR User denied the transaction", {
        position: "top-left",
      });
    }
  };

  const handlePlayMusic = async (tokenURI) => {
    setIsLoading(true);

    try {
      const { data } = await axios.get(tokenURI);
      console.log({ data });
      setIsPlaying(true);
      setIsLoading(false);
      setIsMusicPlayed(true);
      setSongURL(data.songURL);
    } catch (err) {
      console.log({ err });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (businessContract) {
      dispatch(getAllSongs(businessContract));
    }
  }, [businessContract]);

  useEffect(() => {
    if (tokens) {
      const tokensOnSale = tokens.filter((token) => token.isOnSale);
      setTokenOnSale(tokensOnSale);
    }
  }, [tokens]);

  useEffect(() => {
    if (etherConversion && businessContract) {
      getTotalEarningsFromArtists();
    }
  }, [etherConversion, businessContract]);

  return (
    <div className="flex w-full bg-[#121212]">
      <MusicPlayer
        songURL={songURL}
        setIsPlaying={setIsPlaying}
        isMusicPlayed={isMusicPlayed}
      />

      {(tokensOnSale === null || tokensOnSale?.length === 0) && (
        <div className="text-center w-full text-white">No tokens found</div>
      )}

      {tokensOnSale !== null && tokensOnSale?.length !== 0 ? (
        <div className="w-full py-4 flex flex-col gap-4 text-gray-300">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="mb-0.5">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0 1 18 0z"
                  />
                </svg>
              </div>
              {totalEarningsFromArtists && (
                <div className="text-sm">
                  ₹{Number(totalEarningsFromArtists).toFixed(2)} Earned by
                  artists from fans on rythmXchange
                </div>
              )}
            </div>
            <div>{tokensOnSale?.length} items</div>
          </div>
          <div className="flex justify-center items-center">
            <div className="h-[0.1px] w-[98%] bg-gray-600"></div>
          </div>
          <div className="grid grid-cols-8 gap-4 px-4 py-2 items-center text-center">
            <div className="col-span-1 text-sm font-medium">Item</div>
            <div className="col-span-1 text-sm font-medium">Artist</div>
            <div className="col-span-1 text-sm font-medium">Token ID</div>
            <div className="col-span-1 text-sm font-medium">Creator</div>
            <div className="col-span-1 text-sm font-medium">Current Owner</div>
            <div className="col-span-1 text-sm font-medium">Date of Mint</div>
            <div className="col-span-1 text-sm font-medium">Current Price</div>
            <div className="col-span-1 text-sm font-medium">Action</div>
          </div>
          {tokensOnSale?.map((tokenOnSale) => (
            <div
              key={`${tokenOnSale.tokenId}-${tokenOnSale.tokenURI}`}
              className="grid grid-cols-8 gap-4 px-4 py-2 items-center text-center"
            >
              <div
                onClick={() => handlePlayMusic(tokenOnSale.tokenURI)}
                className="cursor-pointer col-span-1 flex justify-center"
              >
                <img
                  className="w-10 h-10 object-cover"
                  src={tokenOnSale.song.imageURL}
                  alt="Image"
                />
              </div>
              <div className="col-span-1 text-sm">
                {tokenOnSale.song.artist}
              </div>
              <div className="col-span-1 text-sm text-blue-400">
                <Link to={`/token/${tokenOnSale.tokenId}`}>
                  <span>#{tokenOnSale.tokenId}</span>
                </Link>
              </div>
              <div className="col-span-1 text-sm">
                <Wallet wallet={tokenOnSale.creator} />
              </div>
              <div className="col-span-1 text-sm">
                <Wallet wallet={tokenOnSale.currentOwner} />
              </div>
              <div className="col-span-1 text-sm">
                {new Date(tokenOnSale.dateOfMint * 1000).toDateString()}
              </div>
              <div
                title={`${Number(ethers.formatEther(tokenOnSale.price)).toFixed(
                  18
                )} ETH`}
                className="col-span-1 text-sm cursor-pointer"
              >
                {Number(ethers.formatEther(tokenOnSale.price)).toFixed(5)} ETH
              </div>
              <div className="col-span-1 text-sm">
                {wallet.toLowerCase() === tokenOnSale.creator.toLowerCase() ? (
                  <p className="italic text-gray-600">You Created</p>
                ) : wallet.toLowerCase() ===
                  tokenOnSale.currentOwner.toLowerCase() ? (
                  <p className="italic text-gray-600">You Owned</p>
                ) : isProcessing && selectedTokenId === tokenOnSale.tokenId ? (
                  <button
                    disabled
                    className="cursor-not-allowed italic px-4 py-2 rounded-md font-medium opacity-40 text-black bg-white"
                  >
                    Requesting...
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedTokenId(tokenOnSale.tokenId);
                      handlePurchaseToken(
                        tokenOnSale.tokenId,
                        tokenOnSale.price
                      );
                    }}
                    className="px-4 py-2 rounded-md font-medium text-black bg-white"
                  >
                    Own
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default MarketPlace;
