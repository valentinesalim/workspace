import { firestore } from './firebase';

const users = firestore.collection('users');

export async function createUser(uid, data) {
  let payload = { uid, ...data}

  return users.doc(uid).set(payload, { merge: true });
}