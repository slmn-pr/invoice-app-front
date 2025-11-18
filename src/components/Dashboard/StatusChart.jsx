import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS = {
    "پرداخت شده": "#22c55e",
    "ارسال شده": "#3b82f6",
    "پیش‌نویس": "#94a3b8",
    "لغو شده": "#ef4444",
};

const DEFAULT_COLORS = ["#14b8a6", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"];

export default function StatusChart({ data = [] }) {
    const formatNumber = (value) => {
        return new Intl.NumberFormat("fa-IR").format(value);
    };

    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                داده‌ای برای نمایش وجود ندارد
            </div>
        );
    }

    const chartData = data.map((item) => ({
        name: item.status,
        value: item.count,
        color: COLORS[item.status] || DEFAULT_COLORS[data.indexOf(item) % DEFAULT_COLORS.length],
    }));

    return (
        <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatNumber(value)} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

