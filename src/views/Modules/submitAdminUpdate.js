import { updateContentForPage } from '../../database/main';

export default async function loadContent (router, title, newSectionData) {
    return new Promise (async (resolve, reject) => {
        try {
            const wrappers = document.querySelectorAll(".wrapper")

            const newData = []

            for(let i = 0; i < wrappers.length; i++){
                const wrapper = document.querySelector(`.index${i}`)

                const fields = wrapper.querySelectorAll(".editable")
                const index = wrapper.getAttribute('class').slice(13)
                newData.push({})

                //! Clean this please, its messing up "updateContentForPage" so i can't use it anywhere else
                fields.forEach((field, i2) => {
                    newData[index][`field${i2}`] = field.getAttribute('data-field')
                    newData[index][`data${i2}`] = field.innerHTML
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
