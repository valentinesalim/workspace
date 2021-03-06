import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/auth';
import { LOGGED_IN_URL } from '@/lib/constants';
import Signin from './SignIn';
import LogoText from '../LogoText';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);

  return (
    <div className="mx-auto container relative px-6 xl:px-0">
      <nav>
        <div className="lg:flex justify-between w-full py-12 hidden">
          <LogoText showImage />
          <div className="flex">
            <ul className="font-normal text-lg flex space-x-16 justify-between items-center text-white">
              <li className="text-white cursor-pointer">
                <a className="hover:text-pri-yellow transition duration-200 ease-in-out">
                  Home
                </a>
              </li>
              {user && user.phone ? (
                <li className="text-white cursor-pointer">
                  <a
                    onClick={() => router.push(LOGGED_IN_URL)}
                    className="hover:text-pri-yellow transition duration-200 ease-in-out"
                  >
                    Dashboard
                  </a>
                  <a
                    onClick={() => signOut()}
                    className="pl-16 hover:text-pri-yellow transition duration-200 ease-in-out"
                  >
                    Sign Out
                  </a>
                </li>
              ) : (
                <li className="text-white cursor-pointer">
                  <a
                    onClick={() => setOpen(true)}
                    className="hover:text-pri-yellow transition duration-200 ease-in-out"
                  >
                    Get Started
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <nav className="lg:hidden py-4">
        <div className="flex py-2 justify-between items-center">
          <LogoText showImage />
          <div className=" flex items-center">
            {show && (
              <ul
                id="list"
                className=" py-2 mx-8 border-r bg-white absolute rounded top-0 left-0 right-0 shadow mt-20 md:px-4 md:mt-20 z-20"
              >
                <li className="flex justify-center cursor-pointer text-gray-800 text-sm leading-3 tracking-normal py-2 hover:text-pri-yellow focus:text-pri-yellow focus:outline-none">
                  <a>
                    <span className="font-bold text-md">Home</span>
                  </a>
                </li>
                {user && user.phone ? (
                  <li className="flex justify-center cursor-pointer text-gray-800 text-sm leading-3 tracking-normal py-2 hover:text-pri-yellow focus:text-pri-yellow focus:outline-none">
                    <a onClick={() => router.push(LOGGED_IN_URL)}>
                      <span className="font-bold text-md">Dashboard</span>
                    </a>
                    <a onClick={() => signOut()}>
                      <span className="font-bold text-md">Sign Out</span>
                    </a>
                  </li>
                ) : (
                  <li className="flex justify-center cursor-pointer text-gray-800 text-sm leading-3 tracking-normal py-2 hover:text-pri-yellow focus:text-pri-yellow focus:outline-none">
                    <a>
                      <span className="font-bold text-md">Get Started</span>
                    </a>
                  </li>
                )}
              </ul>
            )}
            <div className="xl:hidden " onClick={() => setShow(!show)}>
              {show ? (
                <svg
                  className="text-white cursor-pointer"
                  aria-label="Close"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1={18} y1={6} x2={6} y2={18} />
                  <line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              ) : (
                <div className=" close-m-menu" onClick="MenuHandler(false)">
                  <svg
                    aria-haspopup="true"
                    aria-label="Main Menu"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white cursor-pointer"
                    width={28}
                    height={28}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1={4} y1={8} x2={20} y2={8} />
                    <line x1={4} y1={16} x2={20} y2={16} />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      {open && <Signin setOpen={setOpen} />}
    </div>
  );
};

export default Navbar;
