import React from "react";
import toast from "react-hot-toast";

const Wallet = ({ wallet, className = "", ...props }) => {
  if (!wallet) return null;
  else if (wallet.length < 42) return null;

  const abbriviatedWallet = `${wallet.slice(0, 5)}...${wallet
    .split("")
    .reverse()
    .join("")
    .slice(0, 4)}`;

  const handleCopyText = () => {
    navigator.clipboard
      .writeText(wallet)
      .then(() => {
        toast.success("wallet copied", {
          position: "top-left",
        });
      })
      .catch((err) => {
        toast.error("wallet couldn't copied", {
          position: "top-left",
        });
      });
  };

  return (
    <span
      onClick={handleCopyText}
      title="Copy Wallet"
      className={`cursor-pointer font-poppins font-medium text-[12px] text-blue-400 ${className}`}
      {...props}
    >
      {abbriviatedWallet}
    </span>
  );
};

export default Wallet;
