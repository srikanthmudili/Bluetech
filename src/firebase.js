import firebase from 'firebase/app'
import 'firebase/firestore';
const config={
    apiKey: "AIzaSyBewCzPfin7Nx9RRPf9h3u7wL45Eyjjk-8",
    authDomain: "bluetech-f35fc.firebaseapp.com",
    databaseURL: "https://bluetech-f35fc.firebaseio.com",
    projectId: "bluetech-f35fc",
    storageBucket: "bluetech-f35fc.appspot.com",
    messagingSenderId: "1082845410274",
    appId: "1:1082845410274:web:eb4326af7700dbb555bfbb",
    measurementId: "G-NQ4G6JDPCY"
};
firebase.initializeApp(config)
export default firebase;