import React from 'react';
import { motion } from 'framer-motion';

const LeaveCallModal = ({ setOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      end={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      id="overlay"
      className="fixed inset-0 z-50 overflow-auto h-screen w-full flex flex-row items-center justify-center md:px-0 px-12"
    >
      <div className="relative w-11/12 mx-auto mb-4 my-6 md:w-5/12 shadow sm:px-10 sm:py-12 py-4 px-4 bg-white dark:bg-gray-800 rounded-md">
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

        <div className="flex pb-3 items-center">
          <div className="-ml-1 text-gray-600 dark:text-gray-400">
            <svg
              className="w-6 h-6 text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>
          <p className="text-lg text-gray-800 dark:text-gray-100 font-semibold pl-2">
            End Call
          </p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 pb-3 font-normal">
          Are you sure you would like to leave the session? By leaving this
          session, you will lose all your data from this session. Make sure to
          save everything before leaving.
        </p>
        <button
          onClick={(e) => setOpen(false)}
          className="inline-block rounded shadow-sm bg-red-500 px-3 py-2 text-white text-md font-semibold"
        >
          ✌️ Leave Call
        </button>
      </div>
    </motion.div>
  );
};

export default LeaveCallModal;
