export const parseResult = (proxyResult, allowDuplicate = true) => {
  let tokens = proxyResult.toArray().map((token, index) => {
    if (index === 0) return {};

    const _token = {
      song: {
        title: token[0][0],
        artist: token[0][1],
        imageURL: token[0][2],
        description: token[0][3],
      },
      isOnSale: token[1],
      price: token[2].toString(),
      tokenId: token[3].toString(),
      tokenURI: token[4],
      dateOfMint: token[5].toString(),
      currentOwner: token[6],
      creator: token[7],
    };

    return _token;
  });

  if (allowDuplicate === false) {
    tokens = tokens.filter(
      (token, index, self) =>
        index === self.findIndex((t) => t.tokenURI === token.tokenURI)
    );
    tokens = [...tokens];
  }

  return tokens;
};

export const parseTokenHistory = (proxyResult) => {
  let history = proxyResult.toArray().map((record, index) => {
    const _record = {
      to: record[0],
      from: record[1],
      date: record[2].toString(),
      price: record[3].toString(),
    };

    return _record;
  });

  return history;
};

export const etherToINR = async () => {
  const res = await fetch(
    `https://api.coinbase.com/v2/exchange-rates?currency=INR`
  );
  const { data } = await res.json();
  console.log({ data });
  return data.rates;
};
