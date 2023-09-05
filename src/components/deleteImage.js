import { getStorage, ref, deleteObject } from "firebase/storage";

export default async function (image, router) {
    return new Promise (async (resolve, reject) => {
        try {
            const storage = getStorage();
            const desertRef = ref(storage, image);
            
            await deleteObject(desertRef)

            router.push('/update')

            resolve("Success!")
        } catch (error) {
            reject(error)
        }
        
    })
}