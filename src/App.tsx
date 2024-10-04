import Giphy from "./pages/Giphy";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className=" h-screen">
                <Giphy />
            </div>
        </BrowserRouter>
    );
}

export default App;
