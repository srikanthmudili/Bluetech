import firebase from './../../firebase'

const allUsersdata = async () => {
   
   const users=[]
   const uRef = firebase.firestore()
        .collection('users')
        await uRef.get().then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
                users.push(doc.data())
                
            });
            
            return users;
        });
};

export default allUsersdata;