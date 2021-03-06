import { ROOT_URL } from '@/lib/constants';
import Router from 'next/router';

export default function LogoText({ showImage, hideText }) {
  return (
    <a onClick={() => Router.push(ROOT_URL)} className="cursor-pointer">
      <div className="flex flex-row items-center space-x-2">
        {showImage ? (
          <img className="w-16" src="/images/logo.png" alt="me" />
        ) : null}
        {hideText ? null : (
          <h1 className="lg:ml-2 text-white font-bold text-3xl">
            <span className="text-pri-orange">Work</span>
            <span className="text-pri-blue">.</span>
            <span className="text-pri-yellow">Space</span>
          </h1>
        )}
      </div>
    </a>
  );
}
