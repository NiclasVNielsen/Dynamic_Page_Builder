import { default as templateIndex } from '../../components/templateIndex';

export default async function getNewSectionData (templateId) {
    return new Promise (async (resolve, reject) => {
        try {
            let newSectionData

            templateIndex.forEach(template => {
                if(template.templateId == templateId){
                    const newData = {
                        template: templateId
                    }
                    template.fields.forEach(field => {
                        newData[field] = "Insert text here!"
                    })
                    newSectionData = newData
                }
            })

            resolve(newSectionData)
        } catch (error) {
            reject(error)
        }
    })
}
