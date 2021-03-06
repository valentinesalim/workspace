import React from 'react';

const Message = ({ msg, sender, photoURL, time }) => {
  return (
    <div className="flex flex-row justify-start w-full overflow-x-scroll">
      <img
        className="w-12 h-12 mb-4 lg:mb-0 bg-cover rounded-full mr-2"
        src={photoURL}
        alt={sender}
      />
      <div class="flex flex-col items-start justify-center text-gray-200">
        <div className="flex flex-row text-xs mb-px">
          <p className="text-xs mb-px">{sender} • </p>
          <span className="ml-1 text-gray-50">{time}</span>
        </div>

        <p className="text-sm">{msg}</p>
      </div>
    </div>
  );
};

export default Message;
