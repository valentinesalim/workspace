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
  const { updateUser } = useAuth();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');

  const advance = () => setStep(step + 1);

  useEffect(() => {
    if (step == STEPS.Closed) {
      updateUser({ phone })
      .then(() => {
        router.push(LOGGED_IN_URL);
        setOpen(false);
      });
    }
  }, []);

  switch (step) {
    case STEPS.Login:
      return <Login advance={advance} />;
    case STEPS.Phone:
      return (
        <Phone
          phone={phone}
          setPhone={(value) => setPhone(value)}
          close={() => setOpen(false)}
          advance={() => setStep(0)}
        />
      );
    case STEPS.Closed:
      console.log(`registration complete: ${phone}`)
  }
  return null;
};

const SignIn = ({ setOpen }) => (
  <Modal setOpen={setOpen}>
    <Content setOpen={setOpen} />
  </Modal>
);

export default SignIn;
