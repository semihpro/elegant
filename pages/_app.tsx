import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import '@uploadthing/react/styles.css';
import Router from 'next/router';
import NProgress from 'nprogress'; // Import nprogress
import 'nprogress/nprogress.css'; // Import the nprogress CSS
import '../style/main.css';

// Bind NProgress to Next.js Router events
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
