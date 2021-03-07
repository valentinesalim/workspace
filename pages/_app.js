import { AuthProvider } from '@/lib/auth';
import '../styles/globals.css';
import '../styles/board.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
