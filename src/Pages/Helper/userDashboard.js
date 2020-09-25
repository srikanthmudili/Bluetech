
import firebase from './../../firebase'




const allCourses = async (username) => {
    const todo = [];
    const completed = [];
    const attempted = [];
    const testRef = firebase.firestore()
        .collection('users').doc(username).collection('courses');


    await testRef.where("is_completed", "==", false).get().then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
            todo.push(doc.data());
        });
    });

    await testRef.where("is_completed", "==", true).get().then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
            completed.push(doc.data());
        });
    });

    await testRef.where("is_attempted", "==", true).get().then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
            attempted.push(doc.data());
        });
    });
    
    return { todo, completed, attempted };
}


export default allCourses;