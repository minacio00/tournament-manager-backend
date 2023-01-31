const {initializeApp} = require ('firebase/app')
require('dotenv').config();

const firebaseConfig = {
 // usar .evn para esses valores e então commitar o firebaseCredentials.js
  apiKey: process.env.API_KEY,

  authDomain: process.env.AUTH_DOMAIN,

  projectId: process.env.PROJECT_ID,

  storageBucket: process.env.STORAGE_BUCKET,
  
  messagingSenderId: process.env.MESSAGING_SENDER_ID,

  appId: process.env.APP_ID

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
module.export = app