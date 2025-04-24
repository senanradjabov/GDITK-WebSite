import { lazy } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { adminPaths, pathPublic } from "./helpers";
import api from "@/services/request";
import axios, { AxiosError } from "axios";

const LoginPage = lazy(() => import("@/pages/AdminPages/LoginPage"));
const Layout = lazy(() => import("@/features/Layout"));
const HomePage = lazy(() => import("@/pages/AdminPages/HomePage"));

const NewsListPage = lazy(() => import("@/pages/AdminPages/NewsListPage"));
const NewsUpsetPage = lazy(() => import("@/pages/AdminPages/NewsFormPage"));

const GallerySliderListPage = lazy(() => import("@/pages/AdminPages/GallerySliderListPage"));
const GallerySliderUpsetPage = lazy(
    () => import("@/pages/AdminPages/GallerySliderUpsetPage")
);

const CooperationListPage = lazy(() => import("@/pages/AdminPages/CooperationListPage"));
const CooperationUpsetPage = lazy(() => import("@/pages/AdminPages/CooperationUpsetPage"));

const DepartmentListPage = lazy(() => import("@/pages/AdminPages/DepartmentListPage"));
const DepartmentUpsetPage = lazy(() => import("@/pages/AdminPages/DepartmentUpsetPage"));

const StaffListPage = lazy(() => import("@/pages/AdminPages/StaffListPage"));
const StaffUpsetPage = lazy(() => import("@/pages/AdminPages/StaffUpsetPage"));

const ManagementListPage = lazy(() => import("@/pages/AdminPages/ManagementListPage"));
const ManagementUpsetPage = lazy(() => import("@/pages/AdminPages/ManagementUpsetPage"));

const HistoryPage = lazy(() => import("@/pages/AdminPages/HistoryPage"));

const AppealListPage = lazy(() => import("@/pages/AdminPages/AppealListPage"));
const AppealUpsetPage = lazy(() => import("@/pages/AdminPages/AppealUpsetPage"));

const DocumentsListPage = lazy(() => import("@/pages/AdminPages/DocumentsListPage"));
const DocumentsUpsetPage = lazy(() => import("@/pages/AdminPages/DocumentsUpsetPage"));

const ScheduleListPage = lazy(() => import("@/pages/AdminPages/ScheduleListPage"));
const ScheduleUpsetPage = lazy(() => import("@/pages/AdminPages/ScheduleUpsetPage"));

const UsersListPage = lazy(() => import("@/pages/AdminPages/UsersListPage"));
const UserUpsetPage = lazy(() => import("@/pages/AdminPages/UserUpsetPage"));

const SpecialtiesListPage = lazy(() => import("@/pages/AdminPages/SpecialtiesListPage"));
const SpecialtiesUpsetPage = lazy(() => import("@/pages/AdminPages/SpecialtiesUpsetPage"));


const MainLayout = lazy(() => import("@/features/MainLayout"));
const MainHomePage = lazy(() => import("@/pages/MainPages/HomePage"));
const NewsPage = lazy(() => import("@/pages/MainPages/NewsPage"));
const NewsDetailPage = lazy(() => import("@/pages/MainPages/NewsDetailPage"));
const MainHistoryPage = lazy(() => import("@/pages/MainPages/HistoryPage"));
const ManagementPage = lazy(() => import("@/pages/MainPages/ManagementPage"));
const StaffDetailsPage = lazy(() => import("@/pages/MainPages/StaffDetailsPage"));
const DepartmentPage = lazy(() => import("@/pages/MainPages/DepartmentPage"));
const AppealPage = lazy(() => import("@/pages/MainPages/AppealPage"));
const MainScheduleListPage = lazy(() => import("@/pages/MainPages/ScheduleListPage"));
const DocumentListPage = lazy(() => import("@/pages/MainPages/DocumentListPage"));
const NewsSearchPage = lazy(() => import("@/pages/MainPages/NewsSearchPage"));
const SpecialtiesPage = lazy(() => import("@/pages/MainPages/SpecialtiesPage"));

const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));



interface LoginResponse {
    message: string;
}

const AllRoutes: React.FC = () => {
    async function logout() {
        try {
            await api.post<LoginResponse>(
                "/auth/logout",
                {},
                {
                    headers: {
                        Accept: "application/json",
                    },
                    withCredentials: true,
                }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                console.error("Данные ответа ошибки:", axiosError.response?.data);
            } else {
                console.error("Ошибка:", error);
            }
        }
    }

    const Logout = () => {
        logout();

        return <Navigate to={adminPaths.login} />;
    };

    return (
        <Routes>
            <Route path={adminPaths.login} element={<LoginPage />} />
            <Route path={adminPaths.logout} element={<Logout />} />

            <Route path={adminPaths.home} element={<Layout />}>
                <Route index element={<HomePage />} />

                {/* News */}
                <Route path={adminPaths.newsList} element={<NewsListPage />} />
                <Route 
                // path={adminPaths.newsAdd} 
                path={`${adminPaths.newsList}/add`}
                element={<NewsUpsetPage />} />
                <Route 
                path={`${adminPaths.newsList}/edit/:slugId`}
                // path={`${adminPaths.newsAdd}/:slugId`} 
                element={<NewsUpsetPage />} />
                <Route
                    path={`${adminPaths.newsList}/edit/:slugId`}
                    element={<NewsUpsetPage />}
                />
                {/* News End */}

                {/* Gallery */}
                <Route path={adminPaths.gallerySlider} element={<GallerySliderListPage />} />
                <Route
                    path={`${adminPaths.gallerySlider}/add`}
                    element={<GallerySliderUpsetPage />}
                />
                <Route
                    path={`${adminPaths.gallerySlider}/edit/:slugId`}
                    element={<GallerySliderUpsetPage />}
                />
                {/* Gallery End */}

                {/* cooperation */}
                <Route path={adminPaths.cooperation} element={<CooperationListPage />} />
                <Route
                    path={`${adminPaths.cooperation}/add`}
                    element={<CooperationUpsetPage />}
                />
                <Route
                    path={`${adminPaths.cooperation}/edit/:slugId`}
                    element={<CooperationUpsetPage />}
                />
                {/* cooperation End */}

                {/* Department */}
                <Route path={adminPaths.department} element={<DepartmentListPage />} />
                <Route
                    path={`${adminPaths.department}/add`}
                    element={<DepartmentUpsetPage />}
                />
                <Route
                    path={`${adminPaths.department}/edit/:slugId`}
                    element={<DepartmentUpsetPage />}
                />
                {/* Department End */}

                {/* Staff */}
                <Route path={adminPaths.staff} element={<StaffListPage />} />
                <Route path={`${adminPaths.staff}/add`} element={<StaffUpsetPage />} />
                <Route
                    path={`${adminPaths.staff}/edit/:slugId`}
                    element={<StaffUpsetPage />}
                />
                {/* Staff End */}

                {/* Management */}
                <Route path={adminPaths.manage} element={<ManagementListPage />} />
                <Route path={`${adminPaths.manage}/add`} element={<ManagementUpsetPage />} />
                <Route
                    path={`${adminPaths.manage}/edit/:slugId`}
                    element={<ManagementUpsetPage />}
                />
                {/* Management End */}

                {/* History */}
                <Route path={adminPaths.history} element={<HistoryPage />} />
                {/* History End */}

                {/* Appeal */}
                <Route path={adminPaths.appeal} element={<AppealListPage />} />
                <Route
                    path={`${adminPaths.appeal}/edit/:slugId`}
                    element={<AppealUpsetPage />}
                />
                {/* Appeal End */}

                {/* Documents */}
                <Route path={adminPaths.documents} element={<DocumentsListPage />} />
                <Route
                    path={`${adminPaths.documents}/add`}
                    element={<DocumentsUpsetPage />}
                />
                <Route
                    path={`${adminPaths.documents}/edit/:slugId`}
                    element={<DocumentsUpsetPage />}
                />
                {/* Documents End */}
                {/* Schedule */}
                <Route path={adminPaths.schedule} element={<ScheduleListPage />} />
                <Route path={`${adminPaths.schedule}/add`} element={<ScheduleUpsetPage />} />
                <Route
                    path={`${adminPaths.schedule}/edit/:slugId`}
                    element={<ScheduleUpsetPage />}
                />
                {/* Schedule End */}

                {/* User */}
                <Route path={adminPaths.user} element={<UsersListPage />} />
                <Route path={`${adminPaths.user}/add`} element={<UserUpsetPage />} />
                <Route
                    path={`${adminPaths.user}/edit/:slugId`}
                    element={<UserUpsetPage />}
                />
                {/* User End */}

                {/* Specialties */}
                <Route path={adminPaths.specialties} element={<SpecialtiesListPage />} />
                <Route path={`${adminPaths.specialties}/add`} element={<SpecialtiesUpsetPage />} />
                <Route
                    path={`${adminPaths.specialties}/edit/:slugId`}
                    element={<SpecialtiesUpsetPage />}
                />
                {/* Specialties End */}

            </Route>

            <Route path={pathPublic.home} element={<MainLayout />}>
                <Route index element={<MainHomePage />} />
                <Route path={pathPublic.news} element={<NewsPage />} />
                <Route path={`${pathPublic.news}/:slugId`} element={<NewsDetailPage />} />
                <Route path={pathPublic.history} element={<MainHistoryPage />} />
                <Route path={pathPublic.management} element={<ManagementPage />} />
                <Route
                    path={`${pathPublic.staff}/:staffId`}
                    element={<StaffDetailsPage />}
                />
                <Route
                    path={`${pathPublic.department}/:slugId`}
                    key={window.location.pathname}
                    element={<DepartmentPage />}
                />
                <Route path={pathPublic.appeal} element={<AppealPage />} />
                <Route path={pathPublic.schedule} element={<MainScheduleListPage />} />
                <Route path={pathPublic.documents} element={<DocumentListPage />} />
                <Route path={pathPublic.search} element={<NewsSearchPage />} />
                <Route path={pathPublic.specialties} element={<SpecialtiesPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AllRoutes;
