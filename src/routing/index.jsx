import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout";
import HomePage from "../pages/Home";
import NotFoundPgae from "../pages/NotFound";
import InvoicesPage from "../pages/InvoicesPage";
import InvoicePreviewPage from "../pages/InvoicePreview";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            { index: true, element: <HomePage /> },

            { path: "invoices", element: <InvoicesPage /> },
            { path: "preview", element: <InvoicePreviewPage /> },
            { path: "*", element: <NotFoundPgae /> },
            // { path: "about", element: <About /> },

        ],
    }
]);


export default router;