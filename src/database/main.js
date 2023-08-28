import { collection, query, where, doc, getDoc, getDocs, updateDoc, addDoc, deleteDoc} from "firebase/firestore"
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

export const updateContentForPage = (data, page, newSecsTemplates) => {
  //! This one is messy

  let newSecsIndex = 0

  data.forEach(async (dataset, index) => {
    //? Align Key/Value pairs
    const datasetLength = Object.keys(dataset).length

    const finalData = {}

    for(let i = 0; i < (datasetLength / 2); i++){
      finalData[dataset[`field${i}`]] = dataset[`data${i}`]
    }
    //?---------------------

    //! Probably overkill to get an entire snapshot just to get the ID
    const q = query(collection(db, "content"), where("page", "==", page), where("order", "==", index));
    const docToUpdate = await getDocs(q)
    
    if(docToUpdate.docs.length > 0){
      updateDoc(doc(db, "content", docToUpdate.docs[0].id), finalData)
    }

    //? Create new section
    if(docToUpdate.docs.length == 0){
      finalData['order'] = index
      finalData['page'] = page
      finalData['template'] = newSecsTemplates[newSecsIndex].template
      newSecsIndex++

      addDoc(collection(db, "content"), finalData)
    }
  })
}


export const reOrderContentForPage = async (index, page, direction) => {
  direction = direction == "up" ? -1 : 1; //?  up = -1, down = 1
  
  const data = await getContentForPage(page)

  data.sort((a, b) => {return a.order - b.order})

  //? Convert index into the order attribute of the associated object
  const newIndex = data.map(e => e.order).indexOf(index)

  //? fail safe
  if((newIndex + direction) < 0 || (newIndex + direction) >= data.length){
    return
  }

  //? Update the 2 sections being affected
  data.forEach(async (element, i) => {
    if(i == newIndex + direction || i == newIndex){
      const x = i == newIndex ? newIndex : newIndex + direction
      const y = i == newIndex ? newIndex + direction : newIndex
      
      const q = query(collection(db, "content"), where("page", "==", page), where("order", "==", data[x].order));

      const docToUpdate = await getDocs(q)
      const docRef = doc(db, "content", docToUpdate.docs[0].id)

      await updateDoc(docRef, {
        'order': data[y].order
      })
    }
  })
}


export const deleteContentForPage = async (index, page) => {
  const deleteQuery = query(collection(db, "content"), where("page", "==", page), where("order", "==", index));
  const docToDelete = await getDocs(deleteQuery)
  await deleteDoc(doc(db, "content", docToDelete.docs[0].id))


  //? Reduce the order of all sections with an order higher than index by 1
  const updateQuery = query(collection(db, "content"), where("page", "==", page));
  const docsToUpdate = await getDocs(updateQuery);


  docsToUpdate.forEach(async docToUpdate => {
    if(docToUpdate.data().order > index){
      await updateDoc(doc(db, "content", docToUpdate.id), {
        'order': docToUpdate.data().order - 1
      })
    }
  })
}