require("dotenv").config();

const cors = require("cors");
const multer = require("multer");
const express = require("express");
const pinataSDK = require("@pinata/sdk");
const streamifier = require("streamifier");

const { PORT, PINATA_DOMAIN, PINATA_API_KEY, PINATA_API_SECRET } = process.env;

const app = express();
const port = PORT || 5000;
const upload = multer({ limits: { fileSize: 1000000000 } });
const pinata = new pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);

app.post("/upload", cors(), upload.array("file"), async (req, res) => {
  try {
    console.log("data:", req.body);
    console.log("files:", req.files);
    const [imageFile, coverImageFile, songFile] = req.files;

    /* converting files into readableStream */
    const imageFileReadableStream = streamifier.createReadStream(
      imageFile.buffer
    );
    const coverImageFileReadableStream = streamifier.createReadStream(
      coverImageFile.buffer
    );
    const songFileReadableStream = streamifier.createReadStream(
      songFile.buffer
    );
    /* converting files into readableStream */

    /* metadata of files to store in pinata */
    const pinataOptions = {
      cidVersion: 0,
    };
    const imageFilePinOptions = {
      pinataMetadata: {
        name: imageFile.originalname,
      },
      pinataOptions,
    };
    const coverImageFilePinOptions = {
      pinataMetadata: {
        name: coverImageFile.originalname,
      },
      pinataOptions,
    };
    const songFilePinOptions = {
      pinataMetadata: {
        name: songFile.originalname,
      },
      pinataOptions,
    };
    /* metadata of files to store in pinata */

    /* response of each file uploaded to pinata */
    const imageFileResponse = await pinata.pinFileToIPFS(
      imageFileReadableStream,
      imageFilePinOptions
    );
    console.log({ imageFileResponse });
    const coverImageFileResponse = await pinata.pinFileToIPFS(
      coverImageFileReadableStream,
      coverImageFilePinOptions
    );
    console.log({ coverImageFileResponse });
    const songFileResponse = await pinata.pinFileToIPFS(
      songFileReadableStream,
      songFilePinOptions
    );
    console.log({ songFileResponse });
    /* response of each file uploaded to pinata */

    // It is the tokenURI which will be attached with the NFT
    const tokenURI = {
      title: req.body.title,
      artist: req.body.artist,
      imageURL: `https://${PINATA_DOMAIN}/ipfs/${imageFileResponse.IpfsHash}`,
      coverImageURL: `https://${PINATA_DOMAIN}/ipfs/${coverImageFileResponse.IpfsHash}`,
      songURL: `https://${PINATA_DOMAIN}/ipfs/${songFileResponse.IpfsHash}`,
      attributes: [
        {
          color: req.body.color,
        },
      ],
      description: req.body.description,
      image: `https://${PINATA_DOMAIN}/ipfs/${imageFileResponse.IpfsHash}`,
      name: req.body.title,
    };

    const tokenURIPinOptions = {
      pinataMetadata: {
        name: `${songFile.originalname}.metadata.json`,
      },
      pinataOptions,
    };

    const tokenURIResponse = await pinata.pinJSONToIPFS(
      tokenURI,
      tokenURIPinOptions
    );
    console.log({ tokenURIResponse });

    return res.status(201).json({
      songURL: tokenURI.songURL,
      imageURL: tokenURI.imageURL,
      coverImageURL: tokenURI.coverImageURL,
      tokenURI: `https://${PINATA_DOMAIN}/ipfs/${tokenURIResponse.IpfsHash}`,
    });
  } catch (err) {
    console.log({ err });

    return res.status(500).json({
      error: err,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
