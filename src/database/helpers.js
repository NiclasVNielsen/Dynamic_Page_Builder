import { collection, query, where, doc, getDoc, getDocs, updateDoc, addDoc, deleteDoc} from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { firebaseConfig } from "./config.js";
import { getContentForPage } from "./main.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export const alignKeyValuePairs = (dataset) => {
    /*
        ? Takes in:
        {
        data0: "I am a heading and i am number 1"
        data1: "i am the one and only, paragraph2"
        field0: "heading1"
        field1: "paragraph1"
        }

        ? Returns:
        {
        heading1: "I am a heading and i am number 1"
        paragraph1: "i am the one and only, paragraph2"
        }
    */
    const datasetLength = Object.keys(dataset).length
        
    const alignedData = {}

    for(let i = 0; i < (datasetLength / 2); i++){
        alignedData[dataset[`field${i}`]] = dataset[`data${i}`]
    }

    return alignedData
}

export const updateSection = async (page, index, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const q = query(collection(db, "content"), where("page", "==", page), where("order", "==", index));
            const docToUpdate = await getDocs(q)

            if(docToUpdate.docs.length > 0){
                await updateDoc(doc(db, "content", docToUpdate.docs[0].id), data)
                resolve("updated")
            }else{
                resolve("not found")
            }
        } catch (error) {
            reject()
        }
    })
}

export const createSection = async (index, page, template, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            data['order'] = index
            data['page'] = page
            data['template'] = template

            await addDoc(collection(db, "content"), data)

            resolve()
        } catch (error) {
            reject()
        }
    })
}

export const editContentOrder = async (oldOrder, newOrder, page) => {
    console.log(oldOrder, newOrder)
    return new Promise (async (resolve, reject) => {
        try {
        const q = query(collection(db, "content"), where("page", "==", page), where("order", "==", oldOrder));
        const docToUpdate = await getDocs(q)
        
        console.log(docToUpdate.docs)

        const docRef = doc(db, "content", docToUpdate.docs[0].id)

        await updateDoc(docRef, {
            'order': newOrder
        })

        resolve()
        } catch (error) {
        reject()
        }
    })
}

export const reCalculateOrder = async (page) => {
  return new Promise (async (resolve, reject) => {
    try {
      let data = await getContentForPage(page, "fullData")
      data = data.docs

      for(let index = 0; index < data.length; index++){
        const docRef = doc(db, "content", data[index].id);

        await updateDoc(docRef, {
          'order': index
        })
      }
      
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}