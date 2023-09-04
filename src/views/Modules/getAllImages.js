import { getStorage, ref, listAll } from "firebase/storage";

export default async function getAllImages () {
    return new Promise(async (resolve, reject) => {
        try {
            const storage = getStorage()
            const listRef = ref(storage, '');

            const images = await listAll(listRef)

            const urls = []
            images.items.forEach((itemRef) => {
                urls.push("https://firebasestorage.googleapis.com/v0/b/asoap-bbc58.appspot.com/o/" + itemRef.fullPath +"?alt=media&token=790bad1b-2a76-446d-8999-f6fc19bb1f64")
            });

            resolve(urls)
        } catch (error) {
            reject(error)
        }
    })
} 

