import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function RevenueChart({ data = [] }) {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat("fa-IR", {
            style: "currency",
            currency: "IRR",
            maximumFractionDigits: 0,
        })
            .format(value)
            .replace("ریال", "تومان");
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("fa-IR", { 
            month: "short", 
            year: "numeric" 
        });
    };

    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                داده‌ای برای نمایش وجود ندارد
            </div>
        );
    }

    return (
        <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                        dataKey="date" 
                        tickFormatter={formatDate}
                        stroke="#6b7280"
                        style={{ fontSize: "12px" }}
                    />
                    <YAxis 
                        tickFormatter={(value) => formatCurrency(value)}
                        stroke="#6b7280"
                        style={{ fontSize: "12px" }}
                    />
                    <Tooltip 
                        formatter={(value) => formatCurrency(value)}
                        labelFormatter={(label) => formatDate(label)}
                        contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                        }}
                    />
                    <Legend />
                    <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#14b8a6" 
                        strokeWidth={2}
                        dot={{ fill: "#14b8a6", r: 4 }}
                        name="درآمد"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

