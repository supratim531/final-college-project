import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import Wallet from "./Wallet";
import { parseTokenHistory } from "../utils/nftUtils";

const TokenHistory = () => {
  const { tokenId } = useParams();
  const [tokenHistory, setTokenHistory] = useState([]);
  const { businessContract } = useSelector((state) => state.auth);

  const getPurchaseHistoryOfToken = async (tokenId) => {
    try {
      const res = await businessContract.findPurchaseHistoryOfToken(tokenId);
      console.log({ res });
      const history = parseTokenHistory(res);
      console.log({ history });
      setTokenHistory(history);
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(() => {
    if (tokenId && businessContract) {
      getPurchaseHistoryOfToken(tokenId);
    }
  }, [tokenId, businessContract]);

  return (
    <div className="flex w-full bg-[#121212]">
      {tokenHistory?.length === 0 && (
        <div className="text-center w-full text-white">
          No history found for tokenId #{tokenId}
        </div>
      )}

      {tokenHistory?.length !== 0 ? (
        <div className="w-full text-gray-300">
          <div className="grid grid-cols-5 gap-4 px-4 py-2 items-center text-center">
            <div className="col-span-1 text-sm font-medium">Token ID</div>
            <div className="col-span-1 text-sm font-medium">Price</div>
            <div className="col-span-1 text-sm font-medium">From</div>
            <div className="col-span-1 text-sm font-medium">To</div>
            <div className="col-span-1 text-sm font-medium">
              Date of Purchase
            </div>
          </div>
          {tokenHistory?.map((record) => (
            <div
              key={`${tokenId}-${record.date}`}
              className="grid grid-cols-5 gap-4 px-4 py-2 items-center text-center"
            >
              <div className="col-span-1 text-sm text-blue-400">#{tokenId}</div>
              <div
                title={`${Number(ethers.formatEther(record.price)).toFixed(
                  18
                )} ETH`}
                className="col-span-1 text-sm cursor-pointer"
              >
                {Number(ethers.formatEther(record.price)).toFixed(5)} ETH
              </div>
              <div className="col-span-1 text-sm">
                <Wallet wallet={record.from} />
              </div>
              <div className="col-span-1 text-sm">
                <Wallet wallet={record.to} />
              </div>
              <div className="col-span-1 text-sm">
                {new Date(record.date * 1000).toDateString()}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default TokenHistory;
