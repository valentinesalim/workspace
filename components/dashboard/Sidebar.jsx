import React from 'react';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className={`block h-screen lg:flex-shrink-0 bg-blueGray-800 w-24`}>
      <div className="px-4 py-16">
        <div className="flex flex-row justify-center items-center ">
          <img className="w-20" src="/images/logo.png" alt="me" />
        </div>
      </div>
      <div className="mt-6">
        <ul className="w-full">
          <li
            onClick={() => router.push('/dashboard')}
            className="hover:bg-blueGray-500 py-6 text-center cursor-pointer text-white text-lg font-medium flex justify-center"
          >
            <svg
              className="w-8 h-8 text-center"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </li>
          <li
            onClick={() => router.push('/trends')}
            className="hover:bg-blueGray-500 py-6 text-center cursor-pointer text-white text-lg font-medium flex justify-center"
          >
            <svg
              className="w-8 h-8 text-center"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <rect x="5" y="3" width="14" height="18" rx="2" />
              <line x1="9" y1="7" x2="15" y2="7" />
              <line x1="9" y1="11" x2="15" y2="11" />
              <line x1="9" y1="15" x2="13" y2="15" />
            </svg>
          </li>

          <li
            onClick={() => router.push('/preference')}
            className="hover:bg-blueGray-500 py-6 text-center cursor-pointer text-white text-lg font-medium flex justify-center"
          >
            <svg
              className="w-8 h-8 text-center"
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-layout-kanban"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="4" y1="4" x2="10" y2="4" />
              <line x1="14" y1="4" x2="20" y2="4" />
              <rect x="4" y="8" width="6" height="12" rx="2" />
              <rect x="14" y="8" width="6" height="6" rx="2" />
            </svg>
          </li>
          <li className="hover:bg-blueGray-500 py-6 text-center cursor-pointer text-white text-lg font-medium flex justify-center">
            <svg
              className="w-8 h-8 text-center"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
