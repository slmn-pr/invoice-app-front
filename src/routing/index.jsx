import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout";
import HomePage from "../pages/Home";
import NotFoundPage from "../pages/NotFound";
import InvoicesPage from "../pages/InvoicesPage";
import InvoicePreviewPage from "../pages/InvoicePreview";
import ProtectedRoute from "../components/ProtectedRoute";
import LoginPage from "../pages/LoginPage";

const router = createBrowserRouter([

    // مسیرهای عمومی
    {
        path: "/login",
        element: <LoginPage />,
    },
    // {
    //     path: "/register",
    //     element: <RegisterPage />,
    // },


    // Protected route
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <DashboardLayout />,
                children: [
                    { index: true, element: <HomePage /> },
                    { path: "invoices", element: <InvoicesPage /> },
                    { path: "preview", element: <InvoicePreviewPage /> },
                    { path: "*", element: <NotFoundPage /> },
                ],
            },
        ],
    },
]);


export default router;