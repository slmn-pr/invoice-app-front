export default function PrimaryButton({ children, onClick, ...props }) {
    return <button {...props} onClick={onClick} className="bg-teal-400 py-2 font-medium px-3 rounded text-white cursor-pointer hover:bg-teal-400">
        {children}
    </button>
}