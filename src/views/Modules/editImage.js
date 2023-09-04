import { doc } from "firebase/firestore"

export default function editImage (condition) {
    return new Promise ((resolve, reject) => {
        try {
            const images = document.querySelectorAll("img.editable")
            
            for(let i = 0; i < images.length; i++){
                const image = images[i]

                const clickFunction = () => {
                    const imageLibraryBar = document.querySelector("#imageLibrary")
                    
                    if(imageLibraryBar.style.display == "none"){
                        imageLibraryBar.style.display = "flex"
                    }
                }

                if(condition){
                    image.addEventListener("click", clickFunction)
                }else{
                    image.removeEventListener("click", clickFunction)
                }
            }

            resolve("Success!")
        } catch (error) {
            reject(error)
        }
    })
}