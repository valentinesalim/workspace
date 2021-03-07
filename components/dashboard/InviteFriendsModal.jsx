import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const InviteFriendsModal = ({ setOpenInvite }) => {
  const [phone, setPhone] = useState('');

  const sendSMS = (e) => {
    e.preventDefault();

    const sendFriendSMS = async () => {
      try {
        await axios
          .post('/api/proxy?proxyRoute=sendsmsnotivize ', {
            token: process.env.NEXT_PUBLIC_BACKEND_TOKEN,
            message: `Hey! Join my Work.Space Room ${window.location.href}`,
            receiver: phone
          })
          .then(() => setOpenInvite(false));
      } catch (error) {
        console.log(error);
      }
    };

    sendFriendSMS();
  };

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
      <div className="xl:w-5/12 w-11/12 mx-auto mb-4 my-6 md:w-2/3 shadow sm:px-10 sm:py-6 py-4 px-4 bg-white dark:bg-gray-800 rounded-md">
        <svg
          className="w-6 h-6 absolute top-4 right-4 text-gray-300 cursor-pointer"
          onClick={() => setOpenInvite(false)}
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
        <p className="text-lg text-gray-800 dark:text-gray-100 font-semibold mb-3">
          Invite your friends
        </p>
        <label
          htmlFor="email"
          className="text-sm text-gray-600 dark:text-gray-400 font-normal"
        >
          Enter the phone number of your friend
        </label>
        <div className="flex flex-col items-start sm:items-center sm:flex-row mt-4">
          <div className="relative w-full sm:w-2/3">
            <div className="absolute text-gray-600 dark:text-gray-400 flex items-center px-4 border-r border-gray-300 dark:border-gray-700 h-full">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <form onSubmit={sendSMS}>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                id="email"
                className="py-3 text-gray-600 dark:text-gray-400 bg-transparent focus:outline-none focus:border focus:border-indigo-700 font-normal w-full pl-16 text-sm border-gray-300 dark:border-gray-700 rounded border shadow"
                placeholder="+14085555555"
              />
            </form>
          </div>
          <button
            onClick={sendSMS}
            className="mt-4 sm:mt-0 sm:ml-4 focus:outline-none bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-3 text-sm"
          >
            Submit
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default InviteFriendsModal;
