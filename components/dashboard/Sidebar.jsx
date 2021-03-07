import { useAuth } from '@/lib/auth';
import LogoText from '@/components/LogoText';

const Sidebar = ({ STEPS, setStep, setWhiteboardMode }) => {
  const auth = useAuth();

  return (
    <div className={`block h-screen lg:flex-shrink-0 bg-blueGray-800 w-24`}>
      <div className="px-4 py-16">
        <div className="flex flex-row justify-center items-center ">
          <LogoText showImage hideText />
        </div>
      </div>
      <div className="mt-6">
        <ul className="w-full">
          <li
            onClick={() => setStep(STEPS.Browser)}
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
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
          </li>
          <li
            onClick={() => setStep(STEPS.Whiteboard)}
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
                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
              />
            </svg>
          </li>
          <li
            onClick={() => setStep(STEPS.Notes)}
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
          <li
            onClick={() => auth.signOut()}
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
