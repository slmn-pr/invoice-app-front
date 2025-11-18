import { Loader } from "lucide-react";

export default function LoadingSpinner({ 
    message = "در حال بارگیری داده‌ها...",
    size = 48 
}) {
    return (
        <div className="w-full flex flex-col justify-center items-center py-20">
            <Loader 
                size={size} 
                className="animate-spin text-teal-500 dark:text-teal-400 mb-4" 
            />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {message}
            </span>
        </div>
    )
}

