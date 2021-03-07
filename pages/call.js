import dynamic from 'next/dynamic';
import { useAuth } from '@/lib/auth';
import Loader from '@/components/shared/Loader';

const AVProvider = dynamic(() => import('@/lib/peer'), {
  ssr: false,
  loading: () => <Loader />
});

const CallingScreen = dynamic(() => import('@/components/dashboard/CallScreen'), {
  ssr: false,
  loading: () => <Loader />
});

const Call = ({ socketUrl }) => {
  const auth = useAuth();
  return (
    <AVProvider auth={auth} socketUrl={socketUrl}>
      <CallingScreen />
    </AVProvider>
  );
};

export default Call;
