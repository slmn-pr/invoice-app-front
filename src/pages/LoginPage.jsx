import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useLoginRequest from "../hooks/useLoginRequest";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { saveAuthToken } from "../utils/cookies";

export default function LoginPage() {
    const { register, handleSubmit } = useForm();
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
                console.log("[LoginPage] onSubmit, data:", data);

                saveAuthToken(data.token)

                // save to global state
                console.log("[LoginPage] onSubmit, global store:", login);
                login(data)

                toast.success("ورود با موفقیت انجام شد");

                setTimeout(() => {
                    navigate("/");
                }, 1_000);
            }
        })
    }



    return (
        <div
            className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-500 to-gray-900"
            dir="rtl"
        >
            <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl w-full max-w-md p-8 border border-white/20">
                <h1 className="text-3xl font-bold text-white text-center mb-6">
                    ورود به سیستم مدیریت فاکتورها
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-white mb-1">ایمیل</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            placeholder="مثلاً your@email.com"
                            className="input input-bordered w-full text-right bg-white/80"
                        />
                    </div>

                    <div>
                        <label className="block text-white mb-1">رمز عبور</label>
                        <input
                            type="password"
                            {...register("password", { required: true })}
                            placeholder="********"
                            className="input input-bordered w-full text-right bg-white/80"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="btn btn-primary w-full text-lg mt-4 bg-teal-600 border-none hover:bg-teal-700"
                    >
                        {isPending ? (
                            <Loader2 className="animate-spin w-5 h-5" />
                        ) : (
                            "ورود"
                        )}
                    </button>
                </form>

                <p className="text-gray-200 text-center mt-6">
                    حساب کاربری ندارید؟
                    <Link to="/register" className="text-teal-300 hover:underline">
                        ثبت‌نام کنید
                    </Link>
                </p>
            </div>
        </div>
    );
}
