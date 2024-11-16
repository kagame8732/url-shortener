import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AdminOverView from "../pages/AdminOverView";
import UserInputMask from "../pages/UserInputMask";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Layout = () => {
  const { sideBarHidden } = useSelector((state: RootState) => state.switchSides);

  return (
    <div className="flex h-[100vh] w-full bg-[#FAFAFA]">
      {!sideBarHidden && (
        <div className="w-1/5">
          <Sidebar />
        </div>
      )}
      <div className={sideBarHidden ? "w-full" : "w-4/5"}>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/admin-overview" />,
      },
      {
        path: '/admin-overview',
        element: <AdminOverView />,
      },
      {
        path: '/user-input-mask',
        element: <UserInputMask />,
      },
    ]
  }
]);

export default router;