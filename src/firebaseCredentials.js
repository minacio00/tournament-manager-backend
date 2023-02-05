const {initializeApp, cert, applicationDefault} = require ('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../smashggclone-3bdfde9dd377.json');

const firebaseApp = initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore(firebaseApp);


module.exports = {firebaseApp, db};