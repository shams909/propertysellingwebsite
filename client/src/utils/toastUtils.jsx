import toast from "react-hot-toast";

// Common Glassmorphism Style for Success/Error
const glassStyle = {
    background: "rgba(0, 0, 0, 0.6)", // Darker semi-transparent for readability
    backdropFilter: "blur(10px)",
    color: "#fff",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: "16px",
    fontWeight: "500",
};

export const successToast = (message) => {
    return toast.success(message, {
        style: glassStyle,
        iconTheme: {
            primary: "#10B981", // Emerald Green
            secondary: "#fff",
        },
    });
};

export const errorToast = (message) => {
    return toast.error(message, {
        style: glassStyle,
        iconTheme: {
            primary: "#EF4444", // Red
            secondary: "#fff",
        },
    });
};

// Custom Confirmation Toast (Logout, Delete, etc.)
export const confirmationToast = ({
    message = "Are you sure?",
    confirmText = "Yes",
    cancelText = "Cancel",
    onConfirm
}) => {
    return toast(
        (t) => (
            <div className="flex flex-col gap-4 p-2 bg-black/90 backdrop-blur-xl border border-black/40 shadow-2xl rounded-3xl min-w-[280px]">
                <p className="text-white font-semibold text-center px-2">
                    {message}
                </p>
                <div className="flex justify-center gap-3">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-5 py-2 bg-white/50 hover:bg-green-600 text-white font-medium rounded-full transition-all border border-white/20 shadow-sm text-sm"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            if (onConfirm) onConfirm();
                            toast.dismiss(t.id);
                        }}
                        className="px-5 py-2 bg-red-500/90 hover:bg-red-600 text-white font-medium rounded-full transition-all shadow-lg text-sm"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        ),
        {
            duration: Infinity,
            style: {
                background: 'transparent',
                boxShadow: 'none',
            },
        }
    );
};
