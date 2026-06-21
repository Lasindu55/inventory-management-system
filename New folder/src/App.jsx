import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes"; // path එක check කරන්න

export default function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}