import firebase, { firestore } from './firebase';

const users = firestore.collection('users');

export async function createUser(uid, data) {
  const query = await users.doc(uid).get();

  if (query.exists) {
  }
  let payload = { uid, ...data };

  await users.doc(uid).set(payload, { merge: true });

  return { ...query.data(), ...payload };
}

export async function createRoom(roomOwner) {
  const roomsCollectionRef = firestore.collection('rooms');
  const docRef = await roomsCollectionRef.add({ messages: [], roomOwner });

  return docRef.id;
}

export async function addMessage(roomId, messageObj) {
  const roomsCollectionRef = firestore.collection('rooms');
  await roomsCollectionRef
    .doc(roomId)
    .update({ messages: firebase.firestore.FieldValue.arrayUnion(messageObj) });
}

export async function retrieveRoomData(roomId) {
  const roomDocumentRef = firestore.collection('rooms').doc(roomId);
  const doc = await roomDocumentRef.get();

  return doc.data();
}

export async function getUser(uid) {
  const query = await users.doc(uid).get();
  return query.data();
}