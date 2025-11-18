export default function PageLayuot({
    pageTitle = "صفحه جدید",
    buttonSlot = <></>,
    children
}) {
    return (
        <div className="space-y-6">
            {/* Modern Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {pageTitle}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        مدیریت و کنترل {pageTitle}
                    </p>
                </div>
                {buttonSlot && (
                    <div className="flex items-center gap-3">
                        {buttonSlot}
                    </div>
                )}
            </div>

            {/* Content Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                {children}
            </div>
        </div>
    )
}