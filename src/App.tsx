import GiphySearch from "./pages/GiphySearch";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="bg-blue-50 h-screen">
                <GiphySearch />
            </div>
        </BrowserRouter>
    );
}

export default App;
