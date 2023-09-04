import { useRoute } from 'vue-router'
import { default as editImage } from './editImage'

export default async function adminModeToggle (condition, adminLink) {
    const route = useRoute()

    return new Promise (async (resolve, reject) => {
        try {
            let adminLinkExtention = null

            if(condition){
                route.path == "/admin" ? adminLink = "/" : adminLink = route.path.slice(0, -6)
        
                const fields = document.querySelectorAll(".editable")
                fields.forEach(field => {
                    field.outerHTML = field.outerHTML.replace('class="editable"', 'class="editable" contenteditable')
                })

                editImage(condition)
        
                adminLinkExtention = "/admin"
            }else{
                route.path == "/" ? adminLink = "/admin" : adminLink = route.path + "/admin"
        
                const fields = document.querySelectorAll(".editable")
                fields.forEach(field => {
                    field.outerHTML = field.outerHTML.replace('class="editable" contenteditable', 'class="editable"')
                })
                
                editImage(condition)
        
                adminLinkExtention = ""
            }

            resolve({
                adminLinkExtention,
                adminLink
            })
        } catch (error) {
            reject(error)
        }
    })
}
