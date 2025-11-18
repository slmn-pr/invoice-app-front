import { 
    Receipt, 
    Users, 
    DollarSign, 
    TrendingUp,
    FileText,
    Calendar
} from "lucide-react";
import StatCard from "../components/Dashboard/StatCard";
import RevenueChart from "../components/Dashboard/RevenueChart";
import StatusChart from "../components/Dashboard/StatusChart";
import RecentInvoicesTable from "../components/Dashboard/RecentInvoicesTable";
import TopCustomersTable from "../components/Dashboard/TopCustomersTable";
import LoadingSpinner from "../components/LoadingSpinner";
import useStatisticsOverview from "../hooks/statistics/useStatisticsOverview";
import useRevenueOverTime from "../hooks/statistics/useRevenueOverTime";
import useInvoicesByStatus from "../hooks/statistics/useInvoicesByStatus";
import useRecentInvoices from "../hooks/statistics/useRecentInvoices";
import useTopCustomers from "../hooks/statistics/useTopCustomers";
import { Link } from "react-router-dom";

export default function HomePage() {
    const { data: overview, isLoading: overviewLoading } = useStatisticsOverview();
    const { data: revenueData, isLoading: revenueLoading } = useRevenueOverTime({ period: "monthly" });
    const { data: statusData, isLoading: statusLoading } = useInvoicesByStatus();
    const { data: recentInvoices, isLoading: recentLoading } = useRecentInvoices({ limit: 5 });
    const { data: topCustomers, isLoading: topCustomersLoading } = useTopCustomers({ limit: 5 });

    const isLoading = overviewLoading || revenueLoading || statusLoading;

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    داشبورد
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    نمای کلی از آمار و عملکرد شما
                </p>
            </div>

            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            title="کل فاکتورها"
                            value={overview?.totalInvoices || 0}
                            icon={Receipt}
                        />
                        <StatCard
                            title="کل مشتریان"
                            value={overview?.totalCustomers || 0}
                            icon={Users}
                        />
                        <StatCard
                            title="کل درآمد"
                            value={overview?.totalRevenue || 0}
                            icon={DollarSign}
                        />
                        <StatCard
                            title="درآمد پرداخت شده"
                            value={overview?.paidRevenue || 0}
                            icon={TrendingUp}
                        />
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Revenue Over Time Chart */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    درآمد در طول زمان
                                </h3>
                                <Calendar className="w-5 h-5 text-gray-400" />
                            </div>
                            {revenueLoading ? (
                                <div className="flex items-center justify-center h-64">
                                    <LoadingSpinner size={32} message="در حال بارگیری..." />
                                </div>
                            ) : (
                                <RevenueChart data={revenueData || []} />
                            )}
                        </div>

                        {/* Invoices by Status Chart */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    فاکتورها بر اساس وضعیت
                                </h3>
                                <FileText className="w-5 h-5 text-gray-400" />
                            </div>
                            {statusLoading ? (
                                <div className="flex items-center justify-center h-64">
                                    <LoadingSpinner size={32} message="در حال بارگیری..." />
                                </div>
                            ) : (
                                <StatusChart data={statusData || []} />
                            )}
                        </div>
                    </div>

                    {/* Tables Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Invoices */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    فاکتورهای اخیر
                                </h3>
                                <Link
                                    to="/invoices"
                                    className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium"
                                >
                                    مشاهده همه
                                </Link>
                            </div>
                            {recentLoading ? (
                                <div className="flex items-center justify-center h-64">
                                    <LoadingSpinner size={32} message="در حال بارگیری..." />
                                </div>
                            ) : (
                                <RecentInvoicesTable invoices={recentInvoices || []} />
                            )}
                        </div>

                        {/* Top Customers */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    مشتریان برتر
                                </h3>
                                <Link
                                    to="/customers"
                                    className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium"
                                >
                                    مشاهده همه
                                </Link>
                            </div>
                            {topCustomersLoading ? (
                                <div className="flex items-center justify-center h-64">
                                    <LoadingSpinner size={32} message="در حال بارگیری..." />
                                </div>
                            ) : (
                                <TopCustomersTable customers={topCustomers || []} />
                            )}
                        </div>
                    </div>

                    {/* Additional Stats */}
                    {overview?.invoicesByStatus && Object.keys(overview.invoicesByStatus).length > 0 && (
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                جزئیات وضعیت فاکتورها
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Object.entries(overview.invoicesByStatus).map(([status, count]) => (
                                    <div
                                        key={status}
                                        className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                                    >
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{status}</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                            {new Intl.NumberFormat("fa-IR").format(count)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}