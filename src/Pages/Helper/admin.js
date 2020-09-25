import firebase from './../../firebase'

const Courses = async (username) => {
    const info = [];
    const testRef = firebase.firestore().collection('users').doc(username).collection('courses');

    await testRef.get().then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
            info.push(doc.data());
        });
    });
    
    return (info);

};
export default Courses;