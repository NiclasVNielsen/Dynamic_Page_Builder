import { updateContentForPage } from '../../database/main';

export default async function loadContent (router, title, newSectionData = undefined) {
    return new Promise (async (resolve, reject) => {
        try {
            const wrappers = document.querySelectorAll(".wrapper")

            const newData = []

            for(let i = 0; i < wrappers.length; i++){
                const wrapper = document.querySelector(`.index${i}`)

                const fields = wrapper.querySelectorAll(".editable")
                const index = wrapper.getAttribute('class').slice(13)
                newData.push({})

                fields.forEach(field => {
                    console.log(field.nodeName)
                    const fieldAttribute = field.getAttribute('data-field')
                    let data = null

                    if(field.nodeName != "IMG"){
                        data = field.innerHTML
                    }else{
                        data = field.src
                    }

                    newData[index][fieldAttribute] = data
                })
            }

            await updateContentForPage(newData, title, newSectionData)
            router.push('/update')

            resolve("Success!")
        } catch (error) {
            reject(error)
        }
    })
}
