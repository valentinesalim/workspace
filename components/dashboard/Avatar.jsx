import React from 'react';

const Avatar = ({ imgURL }) => {
  return (
    <div className="w-16 h-16 lg:w-20 lg:h-20 mb-4 lg:mb-0 bg-cover rounded-full relative">
      <img
        src={imgURL || 'images/avatar.png'}
        alt=""
        className="rounded-full h-full w-full overflow-hidden shadow"
      />
      <div className="h-2 w-2 bg-green-400 rounded-full absolute right-2 top-2 mt-px border border-white"></div>
    </div>
  );
};

export default Avatar;
