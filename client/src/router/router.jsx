import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SongList from "../components/SongList";
import UploadSong from "../components/UploadSong";
import MarketPlace from "../components/MarketPlace";
import { etherToINR } from "../utils/nftUtils";
import TokenHistory from "../components/TokenHistory";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/songs" element={<SongList />} />
      <Route path="/upload" element={<UploadSong />} />
      <Route path="/token/:tokenId" element={<TokenHistory />} />
      <Route path="/market" loader={etherToINR} element={<MarketPlace />} />
    </Route>
  )
);

export default router;
