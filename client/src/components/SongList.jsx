import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import { FaPlay } from "react-icons/fa6";
import { getAllSongs } from "../redux/services/businessServices";
import Wallet from "./Wallet";
import MusicPlayer from "./MusicPlayer";

const SongList = () => {
  const dispatch = useDispatch();
  const [songURL, setSongURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMusicPlayed, setIsMusicPlayed] = useState(false);
  const { tokens } = useSelector((state) => state.business);
  const { businessContract } = useSelector((state) => state.auth);

  const handlePlayMusic = async (tokenURI) => {
    setIsLoading(true);

    try {
      const { data } = await axios.get(tokenURI);
      console.log({ data });

      if (data.songURL !== songURL) {
        setIsPlaying(true);
        setIsLoading(false);
        setIsMusicPlayed(true);
        setSongURL(data.songURL);
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.log({ err });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (businessContract) {
      dispatch(getAllSongs(businessContract, false));
    }
  }, [businessContract]);

  return (
    <div className="py-4">
      <MusicPlayer
        songURL={songURL}
        setIsPlaying={setIsPlaying}
        isMusicPlayed={isMusicPlayed}
      />

      {tokens.length <= 1 && (
        <div className="text-center font-medium opacity-60 text-gray-600">
          No songs found
        </div>
      )}

      {tokens.length > 1 ? (
        <div className="w-full flex flex-row flex-wrap justify-center gap-4">
          {tokens?.map(
            (token) =>
              token?.tokenURI && (
                <div
                  key={`${token.tokenId}-${token.tokenURI}`}
                  className="min-w-[16rem] max-w-[16rem] shadow-md shadow-gray-300 rounded-lg"
                >
                  <div className="relative group overflow-hidden">
                    {isPlaying === false && (
                      <div className="invisible group-hover:visible absolute z-[1] w-full h-full flex justify-center items-center bg-opacity-40 bg-black">
                        <button
                          onClick={() => handlePlayMusic(token.tokenURI)}
                          className="p-4 cursor-pointer flex justify-center items-center rounded-full bg-opacity-40 bg-white"
                        >
                          {isLoading ? (
                            <svg
                              aria-hidden="true"
                              className="inline w-8 h-8 text-transparent animate-spin fill-green-400"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                          ) : (
                            <FaPlay color="white" size={20} />
                          )}
                        </button>
                      </div>
                    )}
                    <img
                      src={token.song.imageURL}
                      alt="Image Description"
                      className="group-hover:scale-125 duration-300 w-full h-64 object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-lg font-semibold mb-2 text-gray-800">
                      {token.song.title} ({token.song.artist})
                    </p>
                    <p className="font-medium text-gray-800">
                      Creator:{" "}
                      <Wallet
                        wallet={token.creator}
                        className="text-base text-blue-400"
                      />
                    </p>
                  </div>
                </div>
              )
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SongList;
