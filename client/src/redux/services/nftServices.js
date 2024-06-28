import toast from "react-hot-toast";

export const mintNFT =
  (data, ipfsResponse, nftContract, businessContract, setIsProcessing) =>
  async (dispatch, getState) => {
    try {
      let res = await nftContract.mintNFT(
        ipfsResponse.tokenURI,
        data.numberOfEditions
      );
      console.log({ res });
      let receipt = await res.wait();
      console.log({ receipt });

      res = await nftContract.getTokenId();
      const currentTokenId = res;
      console.log({ currentTokenId });

      // set Approval for all NFTs to the Business Contract in order to manage NFTs on behalf of the creator/owner
      await (
        await nftContract.setApprovalForAll(businessContract.target, true)
      ).wait();

      res = await businessContract.saveAndTransferTokensToBusinessContract(
        data.title,
        data.artist,
        ipfsResponse.imageURL,
        data.description,
        data.price,
        ipfsResponse.tokenURI,
        nftContract.target,
        Number(currentTokenId) - Number(data.numberOfEditions),
        data.numberOfEditions
      );
      console.log({ res });
      receipt = await res.wait();
      console.log({ receipt });
      setIsProcessing(false);
      toast.success("NFT minted successfully", {
        position: "top-left",
      });
    } catch (err) {
      console.log({ err });
      setIsProcessing(false);
      toast.error(err?.reason, {
        position: "top-left",
      });
    }
  };
