import { collection, query, where, doc, getDoc, getDocs, updateDoc} from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { firebaseConfig } from "./config.js";

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

  const content = []

  querySnapshot.forEach((doc) => {
    content.push(doc.data())
  });

  return content
}

export const getNavigationForPage = async(page = "/") => {
  const q = query(collection(db, "navigations"), where("paths", "array-contains", page));

  const querySnapshot = await getDocs(q);

  let navs = []

  querySnapshot.forEach((doc) => {
    navs.push(doc.data())
  });

  if(navs.length != 1){
    const tooMany = "Error: Too many navigations assigned to this page"
    const tooFew = "Error: This page does not have a navigation assigned to it"

    navs = navs.length > 1 ? tooMany : tooFew
  }

  return navs
}

export const updateContentForPage = (data, page) => {
  //! This one is messy
  data.forEach(async (dataset, index) => {
    const datasetLength = Object.keys(dataset).length

    const finalData = {}

    for(let i = 0; i < (datasetLength / 2); i++){
      console.log(dataset[`data${i}`])

      finalData[dataset[`field${i}`]] = dataset[`data${i}`]
    }

    //! Probably overkill to get an entire snapshot just to get the ID
    const q = query(collection(db, "content"), where("page", "==", page), where("order", "==", index));
    const docToUpdate = await getDocs(q)

    updateDoc(doc(db, "content", docToUpdate.docs[0].id), finalData)
  })
}
