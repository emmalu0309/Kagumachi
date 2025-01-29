import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const Modal = ({ isOpen, onClose, title, description, buttons }) => {
  return (
    <Dialog as="div" className="relative z-10" open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-25" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-xl transition-all">
          <DialogTitle as="h3" className="text-lg font-medium text-gray-900">
            {title}
          </DialogTitle>
          <div className="mt-4">
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <div className="mt-6 flex justify-center gap-4">
            {buttons.map((btn, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 rounded-md ${
                  btn.type === "primary"
                    ? "bg-[#5e3b25] text-white hover:bg-[#c3a789]"
                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                }`}
                onClick={btn.onClick}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
