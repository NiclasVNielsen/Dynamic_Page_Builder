import { collection, query, where, doc, getDoc, getDocs, updateDoc, addDoc, deleteDoc} from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { firebaseConfig } from "./config.js";
import { updateSection, createSection, editContentOrder, reCalculateOrder } from '../database/helpers.js'

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


/* Call db here! */
export const getContentForPage = async(page = "/", fullData = "no") => {
  return new Promise (async (resolve, reject) => {
    try {
      let content = []

      const q = query(collection(db, "content"), where("page", "==", page));
      const querySnapshot = await getDocs(q);

      if(fullData == "no"){
        querySnapshot.forEach((doc) => {
          content.push(doc.data())
        });
      }else{
        content = querySnapshot
      }
    
      resolve(content)
    } catch (error) {
      reject(error)
    }
  })
}

export const getNavigationForPage = async(page = "/") => {
  return new Promise (async (resolve, reject) => {
    try {
      const q = query(collection(db, "navigations"), where("paths", "array-contains", page));
      const querySnapshot = await getDocs(q);
    
      let response = []
    
      querySnapshot.forEach((doc) => {
        response.push(doc.data())
      })
    
      if(response.length != 1){
        const tooMany = "Error: Too many navigations assigned to this page"
        const tooFew = "Error: This page does not have a navigation assigned to it"
    
        reject(response.length > 1 ? tooMany : tooFew)
      }else{
        resolve(response)
      }
    } catch (error) {
      reject(error)
    }
  })
}



export const updateContentForPage = async (data, page, newSecsTemplates) => {
  return new Promise(async (resolve, reject) => {
    try {
      //? Used for multiple creates
      let newSecsIndex = 0
    
      for(let index = 0; index < data.length; index++){
        const dataset = data[index]
    
        //? Update section
        const updateResult = await updateSection(page, index, dataset)
        //?---------------------

        //? Create new section
        if(updateResult == "not found"){
          if(newSecsTemplates.length > newSecsIndex){
            createSection(index, page, newSecsTemplates[newSecsIndex].template, dataset)

            newSecsIndex++
          }else{
            console.error("Data overflow")
          }
        }
        //?---------------------
      }
      resolve("Success!")
    } catch (error) {
      reject(error)
    }
  })
}


export const reOrderContentForPage = async (index, page, direction) => {
  return new Promise (async (resolve, reject) => {
    try {
      direction = direction == "up" ? -1 : 1; //?  up = -1, down = 1
      
      //? Prevents error if there is gaps in ordering   * [1, 2, 4, 5]
      const data = await getContentForPage(page)
      data.sort((a, b) => {return a.order - b.order})
    
      //? Convert index into the order attribute of the associated object
      const newIndex = data.map(e => e.order).indexOf(index)
      //?-------------------
    
      //? fail safe, would move the target out of array
      if((index + direction) < 0 || (index + direction) >= data.length){
        console.error("Out of bounce")
        reject("Out of bounce")
      //?-------------------
      }else{
        //? Update the 2 sections being affected
        await editContentOrder(newIndex, "x", page)
        await editContentOrder(newIndex + direction, newIndex, page)
        await editContentOrder("x", newIndex + direction, page)
        
        resolve("Success!")
      }
    } catch (error) {
      reject(error)
    }
  })
}



export const deleteContentForPage = async (index, page) => {
  return new Promise (async (resolve, reject) => {
    try {
      const deleteQuery = query(collection(db, "content"), where("page", "==", page), where("order", "==", index));
      const docToDelete = await getDocs(deleteQuery)
      await deleteDoc(doc(db, "content", docToDelete.docs[0].id))
    
      reCalculateOrder(page)
      
      resolve("Success!")
    } catch (error) {
      reject(error)
    }
  })
}