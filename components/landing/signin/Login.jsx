import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import LogoText from '@/components/LogoText';

const Login = ({ auth, advance }) => {
  const { user, signInWithGoogle, signInWithGithub } = auth;

  useEffect(() => {
    user && advance();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full p-4">
        <div className="mb-2">
          <img className="w-20" src="/images/logo.png" alt="Work.Space Logo" />
        </div>
        <div className="flex flex-row items-center space-x-2 pr-1">
          <LogoText />
        </div>
        <p className="text-center text-md mt-4 text-white">
          Log in to get access to your workspace
        </p>
      </div>
      <div className="mt-4 flex flex-col space-y-4 justify-center">
        <button
          onClick={() => signInWithGoogle().then(advance)}
          className="bg-white w-full flex flex-row justify-center items-center rounded shadow-sm transition duration-200 ease-in-out transform hover:-translate-y-1"
        >
          <div className="bg-white inline-block p-2 rounded m-1">
            <FcGoogle size={32} />
          </div>
          <span className="mx-auto pr-8 text-lg text-blue-600 font-semibold">
            Google
          </span>
        </button>
        <button
          onClick={() => signInWithGithub().then(advance)}
          className="bg-gray-900 w-full flex flex-row justify-center items-center rounded shadow-sm transition duration-200 ease-in-out transform hover:-translate-y-1"
        >
          <div className="bg-transparent inline-block p-2 rounded m-1">
            <FaGithub fill="white" size={32} />
          </div>
          <span className="mx-auto pr-8 text-lg text-white font-semibold">
            GitHub
          </span>
        </button>
      </div>
    </>
  );
};

export default Login;
