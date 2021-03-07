import { AuthProvider } from '@/lib/auth';
import '../styles/globals.css';
import '../styles/board.css';
/*
const SOCKET_SERVER =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'https://aiot-fit-xlab.uk.r.appspot.com';*/
// Screw it just hardcode for prod
const SOCKET_SERVER ='https://aiot-fit-xlab.uk.r.appspot.com';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...{...pageProps, socketUrl: SOCKET_SERVER}} />
    </AuthProvider>
  );
}

export default MyApp;
