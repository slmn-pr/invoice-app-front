
export default function PageLayuot({
    pageTitle = "صفحه جدید",
    buttonSlot = <></>,
    children
}) {

    return <div className="space-y-5">

        {/* Hader and page title */}
        <div className="w-full h-20 bg-teal-400 dark:bg-teal-600 flex items-center justify-between rounded px-5">
            <h2 className="font-bold text-3xl text-white ">
                {pageTitle}
            </h2>

            {buttonSlot}
        </div>


        {children}
    </div>
}