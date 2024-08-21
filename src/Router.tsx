import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { History } from "./pages/History";
import { HistoryDetails } from "./pages/HistoryDetails";

export function Router() {
    return (
        <Routes>
            <Route path="/:pathParam?" element={<Home />} />  
            <Route path="/history/:id" element={<History />} />  
            <Route path="/history/details/:id" element={<HistoryDetails />} />  
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}