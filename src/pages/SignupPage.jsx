import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import useSignupRequest from "../hooks/useSignupRequest";
import toast from "react-hot-toast";
import { saveAuthToken } from "../utils/cookies";

export default function SignupPage() {
    const navigate = useNavigate();
    const { register: registerUser } = useAuthStore();
    const { mutate, error, isPending } = useSignupRequest();

    const methods = useForm({
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
        },
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = methods;

    const onSubmit = (formValues) => {
        mutate(formValues, {
            onError: (error) => toast.error(error.message),
            onSuccess: (data) => {
                console.log("[SignupPage] onSubmit, data:", data);

                saveAuthToken(data.token);
                registerUser(data);

                toast.success("ثبت‌نام با موفقیت انجام شد ✅");
                setTimeout(() => navigate("/"), 1000);
            },
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="card bg-base-100 shadow-xl border border-gray-100">
                    <div className="card-body">
                        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">
                            ایجاد حساب کاربری
                        </h2>

                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="نام"
                                            {...register("firstName", { required: "نام الزامی است" })}
                                            className="input input-bordered w-full"
                                        />
                                        {errors.firstName && (
                                            <p className="text-error text-sm mt-1 text-right">
                                                {errors.firstName.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            placeholder="نام خانوادگی"
                                            {...register("lastName", { required: "نام خانوادگی الزامی است" })}
                                            className="input input-bordered w-full"
                                        />
                                        {errors.lastName && (
                                            <p className="text-error text-sm mt-1 text-right">
                                                {errors.lastName.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <input
                                        type="email"
                                        placeholder="ایمیل"
                                        {...register("email", {
                                            required: "ایمیل الزامی است",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "ایمیل معتبر نیست",
                                            },
                                        })}
                                        className="input input-bordered w-full"
                                    />
                                    {errors.email && (
                                        <p className="text-error text-sm mt-1 text-right">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        type="password"
                                        placeholder="رمز عبور"
                                        {...register("password", {
                                            required: "رمز عبور الزامی است",
                                            minLength: {
                                                value: 4,
                                                message: "حداقل ۴ کاراکتر لازم است",
                                            },
                                        })}
                                        className="input input-bordered w-full"
                                    />
                                    {errors.password && (
                                        <p className="text-error text-sm mt-1 text-right">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                {error?.message && (
                                    <p className="text-error text-sm text-center">{error.message}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="btn btn-primary w-full bg-indigo-600 border-none hover:bg-indigo-700 text-white"
                                >
                                    {isPending ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : (
                                        "ثبت‌نام"
                                    )}
                                </button>
                            </form>
                        </FormProvider>

                        <p className="text-center text-sm text-gray-600 mt-4">
                            حساب دارید؟{" "}
                            <Link
                                to="/login"
                                className="text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                وارد شوید
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
