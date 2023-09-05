import { getStorage, ref, uploadBytes } from "firebase/storage";

export default async function(file, fileEnding, router) {
    return new Promise (async (resolve, reject) => {
        try {
            const storage = getStorage()
            const storageRef = ref(storage, `${Math.random() * 100000000000000000}.${fileEnding}`)
        
            await uploadBytes(storageRef, file)
            
            router.push('/update')
            console.log('Uploaded a blob or file!') //! Should give a clearer message

            resolve("Success!")
        } catch (error) {
            reject(error)
        }
    })
}