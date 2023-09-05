<script setup>
import { default as uploadImage } from './uploadImage.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const upload = (e) => {
  e.preventDefault()

  const file = document.querySelector("#myFile").files[0]
  const splitFile = file.name.split('.')
  const fileEnding = splitFile[splitFile.length-1]

  if(fileEnding != "jpg" && fileEnding != "jepg" && fileEnding != "png" && fileEnding != "gif" && fileEnding != "webp"){
    console.log("Unsupported file type!") //! Should give a clearer message

  }else{
    if(file){
      uploadImage(file, fileEnding, router)
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