import { Outlet } from "react-router-dom";
import { AppStyles } from "@/App.styled";

import Header from "@/features/Header";
import Footer from "@/features/Footer";

const MainLayout: React.FC = () => {
    return (
        <>
            <AppStyles />
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;
