import { collection, query, where, doc, getDoc, getDocs} from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAEZXwNWeSvyD-jXL3Asc718byShmbONp8",
  authDomain: "asoap-bbc58.firebaseapp.com",
  projectId: "asoap-bbc58",
  storageBucket: "asoap-bbc58.appspot.com",
  messagingSenderId: "403745147272",
  appId: "1:403745147272:web:7189b297e8f3b7100e123d",
  measurementId: "G-J37E5BHQCQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



/* Call db here! */
export const getContent = async () => {
  /* only get 1 */
  const contentSnap = await getDoc(doc(db, "content", "Ei6N2h9vL48o4VUok4Dj"))
  if(contentSnap.exists){
    return contentSnap.data()
  }else{
    console.log("No data")
    return null
  }
}

export const getContentForPage = async(page = "/") => {
  const q = query(collection(db, "content"), where("page", "==", page));

  const querySnapshot = await getDocs(q);

  //console.log(querySnapshot)

  const content = []

  querySnapshot.forEach((doc) => {
    content.push(doc.data())
  });

  return content
}


