import React from "react";
import styled from "styled-components";
import { FaEthereum } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { MetaMaskAvatar } from "react-metamask-avatar";
import useMetaMaskAuth from "../hooks/useMetaMaskAuth";
import Wallet from "./Wallet";

const MetaMaskAvatarWrapper = styled(MetaMaskAvatar)`
  border-radius: 4px;
  border: 1px solid gray;
`;

const Profile = () => {
  const { disconnectWallet } = useMetaMaskAuth();
  const { wallet, balance } = useSelector((state) => state.auth);

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      disconnectWallet();
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <div
        title={`${balance} SepoliaETH`}
        className="cursor-pointer flex flex-col gap-0.5 items-center"
      >
        <FaEthereum size={40} color="white" />
        <div className="font-semibold text-sm text-white">{`${Number(
          balance
        ).toFixed(2)} ETH`}</div>
      </div>
      <div onDoubleClick={logout} className="flex flex-col items-center">
        <div title="Double click to logout" className="cursor-pointer -mb-1.5">
          <MetaMaskAvatarWrapper address={wallet} size={40} />
        </div>
        <Wallet wallet={wallet} />
      </div>
    </div>
  );
};

export default Profile;
