import { useEffect } from "react";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, updateStatus } from "../redux/actions/authActions";
import Business from "../contracts/Business.json";
import MusicNFT from "../contracts/MusicNFT.json";
import { BusinessAddress, MusicNFTAddress } from "../contracts/addresses";
import toast from "react-hot-toast";

const useMetaMaskAuth = () => {
  const { ethereum } = window;
  const dispatch = useDispatch();
  const { isWalletConnected } = useSelector((state) => state.auth);

  const fetchBalance = async (wallet) => {
    try {
      let balance = await ethereum.request({
        method: "eth_getBalance",
        params: [wallet, "latest"],
      });
      balance = ethers.formatEther(balance);
      console.log({ balance });

      return balance;
    } catch (err) {
      console.log({ err });
    }
  };

  const connectWallet = async () => {
    dispatch(updateStatus("pending"));

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const wallet = accounts[0];
      const balance = await fetchBalance(wallet);
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const nftContract = new ethers.Contract(
        MusicNFTAddress,
        MusicNFT.abi,
        signer
      );
      const businessContract = new ethers.Contract(
        BusinessAddress,
        Business.abi,
        signer
      );
      dispatch(
        login({
          wallet,
          balance,
          provider,
          signer,
          nftContract,
          businessContract,
        })
      );
      localStorage.setItem("wallet", wallet);
      toast.success("wallet connected successfully", {
        position: "top-left",
      });
    } catch (err) {
      console.log(err);
      dispatch(updateStatus("rejected"));
      localStorage.removeItem("wallet");

      if (err?.code === -32002) {
        if (err?.message) {
          toast.error(`${err?.message} (Wallet might be locked)`, {
            position: "top-left",
          });
        }
      } else {
        toast.error(
          "MetaMask is not installed OR User denied the authorization",
          {
            position: "top-left",
          }
        );
      }
    }
  };

  const disconnectWallet = () => {
    dispatch(logout());
    localStorage.removeItem("wallet");
  };

  const handleAccountsChanged = (accounts) => {
    console.log("on accountsChanged:", accounts);

    if (accounts.length !== 0) {
    } else {
      dispatch(logout());
      localStorage.removeItem("wallet");
    }
  };

  useEffect(() => {
    if (ethereum) {
      if (localStorage.getItem("wallet") && isWalletConnected === false) {
        connectWallet().then(() => console.log("wallet connection completed"));
      }

      ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        // Cleanup listeners on component unmount
        ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    } else {
      alert("please install MetaMask first to use this application");
    }
  }, [ethereum]);

  return { connectWallet, disconnectWallet };
};

export default useMetaMaskAuth;
