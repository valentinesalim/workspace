import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/auth';
import { LOGGED_IN_URL } from '@/lib/constants';
import Navbar from '@/components/landing/Navbar';
import SocialSignIn from './SocialSignIn';

const Header = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-yellow-900 bg-hero-img bg-cover h-full">
      <Navbar />
      <div className="container mx-auto px-4 xl:px-0">
        <div className="flex flex-col md:flex-row justify-center items-center flex-wrap md:pt-48 md:py-72 py-16">
          <div className="max-w-3xl w-full md:max-w-2xl lg:w-1/2 mr-12">
            <div className="pb-8">
              <h1 className="text-white font-bold leading-2 text-5xl md:text-7xl pb-4">
                Re-imagining virtual classroom
              </h1>
              <p className="text-left text-white text-2xl leading-12">
                Creating flexible and collaborative learning experience to boost your productivity
              </p>
            </div>
            <button
              onClick={() => {
                if (user) {
                  return router.push(LOGGED_IN_URL);
                }
                setOpen(true);
                console.log('activated');
              }}
              className="text-white font-semibold bg-teal-400 px-8 py-3 rounded-lg shadow-sm text-lg"
            >
              Start Now
            </button>
          </div>
          <div className="w-1/2"></div>
        </div>
      </div>
      {open && <SocialSignIn setOpen={setOpen} />}
    </div>
  );
};

export default Header;
