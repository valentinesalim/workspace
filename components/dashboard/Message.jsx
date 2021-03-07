import React from 'react';

const Message = ({ msg, sender, photoURL, time }) => {
  const URLExpression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

  const regex = new RegExp(URLExpression);
  const isLink = msg.match(regex);

  return (
    <div className="flex flex-row justify-start w-full overflow-x-hidden">
      <img
        className="w-12 h-12 mb-4 lg:mb-0 bg-cover rounded-full mr-2"
        src={photoURL}
        alt={sender}
      />
      <div className="flex flex-col items-start justify-center text-gray-200">
        <div className="flex flex-row text-xs mb-px">
          <p className="text-xs mb-px">{sender} • </p>
          <span className="ml-1 text-gray-50">{time}</span>
        </div>
        <p className="text-sm">
          {!isLink ? (
            msg
          ) : (
            <a
              className="text-blue-400"
              href={msg}
              target="_blank"
              rel="noopener noreferrer"
            >
              {msg}
            </a>
          )}
        </p>
      </div>
    </div>
  );
};

export default Message;
