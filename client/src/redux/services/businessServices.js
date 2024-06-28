import { parseResult } from "../../utils/nftUtils";
import { fetchAllSongs } from "../actions/businessActions";

export const getAllSongs =
  (businessContract, allowDuplicate = true) =>
  async (dispatch, getState) => {
    try {
      const res = await businessContract.findAllTokens();
      console.log({ res });
      const tokens = parseResult(res, allowDuplicate);
      console.log({ tokens });
      dispatch(fetchAllSongs(tokens));
    } catch (err) {
      console.log({ err });
    }
  };
