import { motion } from 'framer-motion';

const CloseButton = ({ setOpen }) => (
  <svg
    className="w-6 h-6 absolute top-4 right-4 text-gray-300 cursor-pointer"
    onClick={() => setOpen(false)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const Modal = ({ children, setOpen }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.35 }}
    style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
    className="fixed inset-0 z-50 overflow-auto h-screen w-full flex flex-row items-center justify-center md:px-0 px-12"
  >
    <div className="z-20 bg-black shadow-lg rounded-sm relative pt-4 pb-6 px-8 w-full max-w-sm m-auto flex-col flex">
      <CloseButton setOpen={setOpen} />
      {children}
    </div>
  </motion.div>
);

export default Modal;
