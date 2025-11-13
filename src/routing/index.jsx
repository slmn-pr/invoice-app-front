import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout";
import HomePage from "../pages/Home";
import NotFoundPage from "../pages/NotFound";
import InvoicesPage from "../pages/InvoicesPage";
import InvoicePreviewPage from "../pages/InvoicePreview";
import ProtectedRoute from "../components/ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

const router = createBrowserRouter([

    // مسیرهای عمومی
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignupPage />,
    },


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
                    { path: "preview/:id", element: <InvoicePreviewPage /> },
                    { path: "*", element: <NotFoundPage /> },
                ],
            },
        ],
    },
]);


export default router;