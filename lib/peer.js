import { useEffect, useContext, createContext, useState } from 'react';
import Loader from '@/components/shared/Loader';
import SimplePeer from 'simple-peer';
import io from 'socket.io-client';

const avContext = createContext();
var socketConnection;

export default function AVProvider({ children, auth, socketUrl }) {
  if (!auth.user) {
    return <Loader />;
  }

  const av = useProvideAV(auth, socketUrl);
  return <avContext.Provider value={av}>{children}</avContext.Provider>;
}

export const useAV = () => {
  return useContext(avContext);
};

function useProvideAV({ user }, socketUrl) {
  const [peerId, setPeerId] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    socketConnection = io.connect(socketUrl, {
      auth: { uid: user.uid }
    });
    const waitForSocket = new Promise((resolve, reject) => {
      socketConnection.on('connect', function () {
        const sessionID = socketConnection.id;
        console.log(`Connected As: ${sessionID}`);
        setPeerId(sessionID);
        setSocket(socketConnection);
        resolve(sessionID);
      });
    });

    waitForSocket.then((clientId) => {
      const peer = new SimplePeer(clientId);

      peer.on('signal', ({ from, data }) => {
        socketConnection.emit('signal', { to: from, data });
      });

      socketConnection.on('signal', ({ data }) => peer.signal(data));

      peer.on('connect', () => {
        peer.send('test');
      });

      peer.on('data', (data) => {
        console.log('Received data: ', data);
      });
    });

    return () => {
      console.log('peer destroyed');
      socketConnection.disconnect();
    };
  }, []);

  const connect = (targetId) => {
    //const clientId = await waitForSocket;
    const peer = new SimplePeer(peerId, { initiator: true });

    peer.on('signal', (data) => {
      socketConnection.emit('signal', {
        from: clientId,
        to: targetId,
        data
      });
    });

    socketConnection.on('signal', ({ data }) => peer.signal(data));

    peer.on('connect', () => {
      peer.send('test');
    });

    peer.on('data', (data) => {
      console.log('Received data: ', data);
    });
  };

  return {
    peerId,
    socket,
    connect
  };
}
