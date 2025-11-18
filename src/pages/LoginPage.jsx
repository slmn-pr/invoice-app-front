import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Loader2, Receipt, Mail, Lock } from "lucide-react";
import useLoginRequest from "../hooks/useLoginRequest";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { saveAuthToken } from "../utils/cookies";

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { mutate: handleLogin, isPending } = useLoginRequest()
    const navigate = useNavigate();
    const login = useAuthStore((s) => s.login)
    const token = useAuthStore((s) => s.token)

    if (token)
        return <Navigate to="/" />

    const onSubmit = (formValues = {}) => {
        handleLogin({ ...formValues }, {
            onError: (error) => {
                toast.error(error.message)
            },
            onSuccess: (data) => {
                saveAuthToken(data.token)
                login(data)
                toast.success("ورود با موفقیت انجام شد");
                setTimeout(() => {
                    navigate("/");
                }, 1_000);
            }
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" dir="rtl">
            <div className="w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg mb-4">
                        <Receipt className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        فاکتورپلاس
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        به حساب کاربری خود وارد شوید
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                ایمیل
                            </label>
                            <div className="relative">
                                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    {...register("email", { required: "ایمیل الزامی است" })}
                                    placeholder="your@email.com"
                                    className="w-full pr-10 pl-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                رمز عبور
                            </label>
                            <div className="relative">
                                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    {...register("password", { required: "رمز عبور الزامی است" })}
                                    placeholder="••••••••"
                                    className="w-full pr-10 pl-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="animate-spin w-5 h-5" />
                                    <span>در حال ورود...</span>
                                </>
                            ) : (
                                "ورود"
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            حساب کاربری ندارید؟{" "}
                            <Link to="/signup" className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium">
                                ثبت‌نام کنید
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
