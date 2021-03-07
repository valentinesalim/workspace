import { useAuth } from '@/lib/auth';
import Loader from '@/components/shared/Loader';
import { retrieveRoomData } from '@/lib/firestore';
import dynamic from 'next/dynamic';
import Dashboard from'@/components/room/Dashboard';

const AVProvider = dynamic(() => import('@/lib/peer'), {
  ssr: false,
  loading: () => <Loader />
});

export async function getServerSideProps({ params: { roomId } }) {
  const roomData = await retrieveRoomData(roomId);

  return { props: { roomData: {...roomData, roomId} } };
}

const Room = ({ roomData }) => {
  const auth = useAuth();

  return (<AVProvider auth={auth}>
      <Dashboard roomData={roomData} auth={auth}/>
    </AVProvider>
  );
};

export default Room;
