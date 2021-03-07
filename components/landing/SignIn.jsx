import { useState, useEffect } from 'react';
import { LOGGED_IN_URL } from '@/lib/constants';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/auth';
import Modal from '@/components/common/Modal';
import Login from './signin/Login';
import Phone from './signin/Phone';

const STEPS = {
  Closed: 0,
  Login: 1,
  Phone: 2
};

const Content = ({ setOpen }) => {
  const router = useRouter();
  const auth = useAuth();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');

  const advance = () => setStep(step + 1);

  const finalState = () => {
    router.push(LOGGED_IN_URL);
    setOpen(false);
  };

  useEffect(() => {
    if (auth.user && auth.user.phone) {
      finalState();
    } else if (step == STEPS.Closed) {
      auth.updateUser({ phone }).then(finalState);
    }
  }, [step]);

  switch (step) {
    case STEPS.Login:
      return <Login advance={advance} auth={auth} />;
    case STEPS.Phone:
      return (
        <Phone
          auth={auth}
          phone={phone}
          setPhone={(value) => setPhone(value)}
          close={() => setOpen(false)}
          advance={() => setStep(0)}
        />
      );
    case STEPS.Closed:
      console.log(`registration complete: ${phone}`);
  }
  return null;
};

const SignIn = ({ setOpen }) => (
  <Modal setOpen={setOpen}>
    <Content setOpen={setOpen} />
  </Modal>
);

export default SignIn;
