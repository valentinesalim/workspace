import { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';
import { createUser } from './firestore';
import firebase from './firebase';
import cookie from 'js-cookie';
import { ROOT_URL } from './constants';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      const fsUser = createUser(user.uid, userWithoutToken);
      setUser(fsUser);

      cookie.set(
        'workspace-auth',
        { email: user.email, uid: user.uid },
        { expires: 1 }
      );
    } else {
      setUser(false);
      cookie.remove('workspace-auth');
      return false;
    }
  };

  const updateUser = (newUser) => {
    if (!user) {
      console.warn('Bad State, user not defined');
      return Promise.resolve();
    }
    return createUser(user.uid, newUser)
    .then(fsUser => setUser(fsUser));
  };

  const signInWithGithub = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((response) => handleUser(response.user));
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((response) => handleUser(response.user));
  };

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false))
      .finally(() => Router.push(ROOT_URL));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    updateUser,
    signInWithGithub,
    signInWithGoogle,
    signOut
  };
}

const formatUser = async (user) => {
  const token = user.getIdToken();
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user?.providerData[0]?.providerId,
    photoUrl: user.photoURL,
    token
  };
};
