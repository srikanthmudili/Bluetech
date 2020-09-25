import { deviceDetect } from 'react-device-detect';
import firebase from './../firebase'


const Log = (username) => {
    const testRef = firebase.firestore()
        .collection('users').doc(username)
    const dev = deviceDetect()
    dev.time_stamp = firebase.firestore.FieldValue.serverTimestamp()
    testRef.update(dev).catch(
        (e) => console.log(e)
    )
};

export default Log;