
import { useAV } from '@/lib/peer';
import { useState } from 'react';

const CallingScreen = () => {
  const [peerId, setPeerId] = useState('');
  const av = useAV();
  return (
    <>
      <input value={peerId} onChange={(e) => setPeerId(e.target.value)} />
      <button onClick={() => av.connect(peerId)}>send</button>
      <p>{av.peerId}</p>
    </>
  );
};

export default CallingScreen;