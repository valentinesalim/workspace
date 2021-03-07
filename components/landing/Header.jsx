import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/auth';
import { LOGGED_IN_URL } from '@/lib/constants';
import Navbar from '@/components/landing/Navbar';
import Signin from './SignIn';
import { createRoom } from '@/lib/firestore';

const Header = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onCreateRoom = () => {
    createRoom(user.name).then((id) => {
      router.push(`/dashboard/${id}`);
    });
  };

  return (
    <div className="bg-hero-img bg-cover h-full">
      <Navbar />
      <div className="container mx-auto px-4 xl:px-0">
        <div className="flex flex-col md:flex-row justify-center items-center flex-wrap md:pt-48 md:py-72 py-16">
          <div className="max-w-3xl w-full md:max-w-2xl lg:w-1/2 mr-12">
            <div className="pb-8">
              <h1 className="text-white font-bold leading-2 text-5xl md:text-7xl pb-4">
                <span className="text-pri-yellow">Re-</span>imagining <br />{' '}
                virtual workspace
              </h1>
              <p className="text-left text-white text-2xl leading-12">
                Creating flexible and collaborative working experience to boost
                your productivity
              </p>
            </div>
            {!user ? (
              <button
                onClick={() => {
                  setOpen(true);
                  console.log('activated');
                }}
                className="text-white font-semibold bg-pri-orange px-8 py-3 rounded-lg shadow-sm text-lg"
              >
                Start Now
              </button>
            ) : (
              <button
                onClick={onCreateRoom}
                className="text-white font-semibold bg-green-500 px-8 py-3 rounded-lg shadow-sm text-lg"
              >
                Create Room
              </button>
            )}
          </div>
          <div className="md:w-1/2">
            <img
              className="md:ml-12 mt-6 md:mt-0 w-full"
              src="/images/header-img.gif"
              alt="Table"
            />
          </div>
        </div>
      </div>
      {open && <Signin setOpen={setOpen} />}
    </div>
  );
};

export default Header;
