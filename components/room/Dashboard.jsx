import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Loader from '@/components/shared/Loader';
import Avatar from '@/components/dashboard/Avatar';
import LeaveCallModal from '@/components/dashboard/LeaveCallModal';
import Message from '@/components/dashboard/Message';
import moment from 'moment';
import sanitize from '@/utils/linkSanitizer';
import Whiteboard from '@/components/dashboard/Whiteboard';
import io from 'socket.io-client';
import { addMessage, getUser } from '@/lib/firestore';
import Notes from '@/components/dashboard/Notes';
import { useAV } from '@/lib/peer';
import InviteFriendsModal from '@/components/dashboard/InviteFriendsModal';

const STEPS = {
  Browser: 0,
  Whiteboard: 1,
  Notes: 2
};

const videoCallers = [
  'https://avatars.githubusercontent.com/u/34843135?s=460&u=183d2d1226afa9895162640e9003eba9ed375e46&v=4',
  'https://avatars.githubusercontent.com/u/40800547?s=460&u=4fdf8848bab01dd154f83882e302edd85995fd94&v=4',
  'https://avatars.githubusercontent.com/u/64887515?s=460&u=6513518865160c8f3a745592ee96430219bd27ea&v=4',
  'https://avatars.githubusercontent.com/u/13199016?s=460&u=40af1d489c8cdfa2ee4fbf3bf8e8fb68ada19aae&v=4'
];

const Dashboard = ({
  roomData: { roomId, messages = [] },
  auth,
  socketUrl
}) => {
  const { socket } = useAV();
  const [website, setWebsite] = useState('https://tailwindcss.com/');
  const [websiteInput, setWebsiteInput] = useState('https://tailwindcss.com/');
  const [message, setMessage] = useState('');
  const [sessionMessages, setSessionMessages] = useState(messages);
  const [open, setOpen] = useState(false);
  const [openInvite, setOpenInvite] = useState(false);
  const [whiteboardMode, setWhiteboardMode] = useState(false);
  const [step, setStep] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(videoCallers);

  console.log(socket);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    if (!!!message) return;
    const { photoUrl, name } = await auth.user;

    const messageObj = {
      msg: message,
      sender: name,
      photoURL: photoUrl,
      time: moment().format('LT')
    };

    addMessage(roomId, messageObj)
      .then(() => setSessionMessages([...sessionMessages, messageObj]))
      .catch((err) => console.log(err));

    // force reset
    setMessage('');
  };

  const updateWebsite = (e) => {
    e.preventDefault();

    const socketRef = io.connect(socketUrl);
    const URLExpression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

    const regex = new RegExp(URLExpression);

    if (!websiteInput.match(regex)) return;

    const sanitizedLink = sanitize(websiteInput);
    setWebsite(sanitizedLink);

    socketRef.emit('update_website', sanitizedLink);
  };

  useEffect(() => {
    const socketRef = io.connect(socketUrl);

    socketRef.on('update_website', (link) => {
      setWebsiteInput(link);
      setWebsite(link);
    });

    const rosterUpdate = async (uids) => {
      const roomUsers = await Promise.all(uids.map((uid) => getUser(uid)));
      const avatars = roomUsers.map((user) => user.photoUrl);
      setOnlineUsers(avatars);
    };

    if (socket) {
      console.log('SocketIO Subscribe', roomId);
      socket.emit('roomjoin', { roomId });

      socket.on('roster', (users) => {
        console.log('Roster Update', users);
        rosterUpdate(users);
      });
    }

    return () => socketRef.disconnect();
  }, [socket]);

  return (
    <div className="bg-gray-900 w-full">
      <div className="flex flex-row relative flex-no-wrap">
        <Sidebar
          STEPS={STEPS}
          setStep={setStep}
          setWhiteboardMode={setWhiteboardMode}
        />
        {!auth.user ? (
          <Loader />
        ) : (
          <div className="flex-1 overflow-x-hidden mb-0 p-0">
            <div className="w-full mx-auto">
              <div className="flex flex-row">
                <div className="flex-1 flex-shrink-0 bg-gray-900 overflow-y-hidden">
                  <div className="flex flex-col h-screen">
                    <div className="bg-blueGray-700 h-5/6">
                      {step === STEPS.Browser && (
                        <>
                          <form onSubmit={updateWebsite}>
                            <input
                              value={websiteInput}
                              onChange={(e) => setWebsiteInput(e.target.value)}
                              className="w-full font-mono tracking-wide	 py-4 text-center bg-blueGray-700 focus:outline-none text-gray-100 text-md flex items-start justify-start"
                              placeholder="Change Website"
                            />
                          </form>
                          <div
                            className="relative w-full h-full overflow:hidden"
                            dangerouslySetInnerHTML={{
                              __html: `<embed src=${website} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" />`
                            }}
                          />
                        </>
                      )}
                      {step === STEPS.Whiteboard && (
                        <Whiteboard socketUrl={socketUrl} />
                      )}
                      {step === STEPS.Notes && <Notes socketUrl={socketUrl} />}
                    </div>
                    <div className="relative bg-blueGray-700 w-full h-1/6">
                      <button
                        onClick={(e) => setOpen(true)}
                        className="absolute bottom-0 right-0 m-4 rounded shadow-sm bg-red-500 px-3 py-2 text-white text-md font-semibold"
                      >
                        ✌️ Leave Call
                      </button>
                      <div className="flex flex-row justify-center items-center h-full space-x-4">
                        {onlineUsers.map((photoURL, idx) => (
                          <Avatar key={idx} imgURL={photoURL} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative flex-shrink-0 w-72 h-full">
                  <div className="h-screen flex flex-col">
                    <div className="px-5 py-4">
                      <div className="flex flex-row justify-between items-center mb-4">
                        <h1 className="text-white font-normal text-3xl">
                          Chat
                        </h1>
                        <button
                          onClick={() => setOpenInvite(true)}
                          className=" rounded shadow-sm bg-blue-700 px-2 py-2 text-white text-sm font-semibold"
                        >
                          Invite Friends
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      <div className="px-5">
                        <div className="flex flex-col space-y-4">
                          {!sessionMessages.length && (
                            <div className="bg-blue-400 text-white flex flex-row rounded-lg shadow-lg py-2 px-2">
                              <svg
                                className="w-6 h-6 text-white mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                              </svg>
                              Send the first message
                            </div>
                          )}
                          {sessionMessages.map((message, idx) => (
                            <Message key={idx} {...message} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <form onSubmit={handleMessageSubmit} className="relative">
                      <svg
                        onClick={handleMessageSubmit}
                        className="w-6 h-6 text-gray-400 absolute top-2.5 right-2 transform rotate-45 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full h-12 px-2 bg-gray-800 focus:outline-none text-gray-100 text-sm"
                        placeholder="Enter Message"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {open && <LeaveCallModal setOpen={setOpen} />}
      {openInvite && <InviteFriendsModal setOpenInvite={setOpenInvite} />}
    </div>
  );
};

export default Dashboard;
