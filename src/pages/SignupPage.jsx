import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
    const navigate = useNavigate();
    const { register } = useAuthStore();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!data.success) throw new Error(data.error || "خطا در ثبت‌نام");

            register(data.data);
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <Card className="shadow-lg border-0">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center font-bold text-indigo-700">
                            ایجاد حساب کاربری
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    name="firstName"
                                    placeholder="نام"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    name="lastName"
                                    placeholder="نام خانوادگی"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <Input
                                name="email"
                                type="email"
                                placeholder="ایمیل"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <Input
                                name="password"
                                type="password"
                                placeholder="رمز عبور"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            {error && (
                                <p className="text-red-500 text-sm text-center">{error}</p>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                            >
                                {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
                            </Button>

                            <p className="text-center text-sm text-gray-600 mt-2">
                                حساب دارید؟{" "}
                                <Link to="/login" className="text-indigo-600 hover:underline">
                                    وارد شوید
                                </Link>
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
