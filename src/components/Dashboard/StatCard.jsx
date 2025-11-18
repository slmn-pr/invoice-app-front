export default function StatCard({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    trendLabel,
    className = "" 
}) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("fa-IR", {
            style: "currency",
            currency: "IRR",
        })
            .format(amount)
            .replace("ریال", "تومان");
    };

    const formatNumber = (num) => {
        return new Intl.NumberFormat("fa-IR").format(num);
    };

    const isCurrency = typeof value === "number" && value > 1000;

    return (
        <div className={`bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-900/20">
                    {Icon && <Icon className="w-6 h-6 text-teal-600 dark:text-teal-400" />}
                </div>
                {trend && (
                    <div className={`text-sm font-medium ${
                        trend > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    }`}>
                        {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
                    </div>
                )}
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {isCurrency ? formatCurrency(value) : formatNumber(value)}
                </p>
                {trendLabel && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{trendLabel}</p>
                )}
            </div>
        </div>
    );
}

