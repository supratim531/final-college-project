import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { mintNFT } from "../redux/services/nftServices";
import defaultAxios from "../axios";

const UploadSong = () => {
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const { isWalletConnected, nftContract, businessContract } = useSelector(
    (state) => state.auth
  );

  const [data, setData] = useState({
    title: "",
    artist: "",
    color: "black",
    numberOfEditions: "",
    price: "",
    description: "",
  });

  const [file, setFile] = useState({
    imageFile: null,
    coverImageFile: null,
    songFile: null,
  });

  const handleDataChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFile((prev) => ({
      ...prev,
      [e.target.name]: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("artist", data.artist);
      formData.append("color", data.color);
      formData.append("description", data.description);
      formData.append("file", file.imageFile);
      formData.append("file", file.coverImageFile);
      formData.append("file", file.songFile);

      console.log(data);
      console.log(file);
      console.log(formData);

      const res = await defaultAxios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log({ res });
      const ipfsResponse = res.data;
      // setIsProcessing(false);
      toast.success("Assets uploaded to IPFS successfully", {
        position: "top-left",
      });
      dispatch(
        mintNFT(
          data,
          ipfsResponse,
          nftContract,
          businessContract,
          setIsProcessing
        )
      );
    } catch (err) {
      console.log({ err });
      setIsProcessing(false);
      toast.error("Something went wrong while storing assets on IPFS", {
        position: "top-left",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      {isWalletConnected ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="-mb-6 text-2xl font-bold text-gray-800">Metadata</div>
          <input
            type="text"
            name="title"
            className="form-input"
            placeholder="Title for the Song"
            value={data.title}
            onChange={handleDataChange}
          />
          <input
            type="text"
            name="artist"
            className="form-input"
            placeholder="Name of the Artist"
            value={data.artist}
            onChange={handleDataChange}
          />
          {/* <input
          type="color"
          name="color"
          className="form-input"
          value={data.color}
          onChange={handleDataChange}
        /> */}
          <input
            type="text"
            name="numberOfEditions"
            className="form-input"
            placeholder="Number of Editions (eg. 2 or 3)"
            value={data.numberOfEditions}
            onChange={handleDataChange}
          />
          <input
            type="text"
            name="price"
            className="form-input"
            placeholder="Price of each Edition (in wei format)"
            value={data.price}
            onChange={handleDataChange}
          />
          <textarea
            rows={5}
            cols={3}
            name="description"
            className="form-input"
            placeholder="Description for the Song"
            value={data.description}
            onChange={handleDataChange}
          ></textarea>

          <div className="-mb-6 text-2xl font-bold text-gray-800">Assets</div>
          <div>
            <label>Choose an Image: </label>
            <input type="file" name="imageFile" onChange={handleFileChange} />
          </div>
          <div>
            <label>Choose a Cover Image: </label>
            <input
              type="file"
              name="coverImageFile"
              onChange={handleFileChange}
            />
          </div>
          <div className="">
            <label>Choose the Song: </label>
            <input type="file" name="songFile" onChange={handleFileChange} />
          </div>
          {isProcessing ? (
            <button
              type="button"
              disabled
              className="cursor-not-allowed italic self-start px-6 py-3 rounded opacity-80 text-white bg-blue-600"
            >
              Uploading...
            </button>
          ) : (
            <button
              type="submit"
              className="self-start px-6 py-3 rounded transition-all text-white bg-blue-600 hover:bg-blue-800"
            >
              Upload
            </button>
          )}
        </form>
      ) : (
        <div className="text-center font-medium opacity-60 text-gray-600">
          Connect your MetaMask wallet first to use this application
        </div>
      )}
    </div>
  );
};

export default UploadSong;
