<script setup>
import { getStorage, ref, uploadBytes } from "firebase/storage";


const upload = (e) => {
  e.preventDefault()

  const file = document.querySelector("#myFile").files[0]
  const splitFile = file.name.split('.')
  const fileEnding = splitFile[splitFile.length-1]

  if(fileEnding != "jpg" && fileEnding != "jepg" && fileEnding != "png" && fileEnding != "gif" && fileEnding != "webp"){
    console.log("Unsupported file type!") //! Should give a clearer message
  }else{
    const storage = getStorage()
    const storageRef = ref(storage, `${Math.random() * 100000000000000000}.${fileEnding}`)
  
    if(file){
      uploadBytes(storageRef, file)
      .then(() => {
        console.log('Uploaded a blob or file!') //! Should give a clearer message
      })
    }else{
      console.error("Field Empty") //! Should give a clearer message
    }
  }
}

</script>


<template>
    
<form @submit="upload">
  <input type="file" id="myFile" name="filename">
  <input type="submit">
</form>

</template>



<style lang="sass" scoped>



</style>