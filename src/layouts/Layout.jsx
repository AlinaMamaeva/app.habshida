import { Outlet } from "react-router-dom";
import DefaultBanner from "../components/banners/DefaultBanner";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar";




export default function Layout() {
    return(
        <div>
           <Navbar />
           <DefaultBanner />
            <Sidebar />
            <Outlet />
        </div>
    )
}