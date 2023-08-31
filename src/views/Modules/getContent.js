import { getContentForPage, getNavigationForPage } from '../../database/main';

export default async function loadContent (title, navigation) {
    return new Promise (async (resolve, reject) => {
        try {
            let data = []

            const content = await getContentForPage(title)

            data = content
            data.sort((a, b) => {return a.order - b.order})


            
            const nav = await getNavigationForPage(title)
            if(typeof nav == "string"){
                navigation = []
            }else{
                navigation = nav
            }

            resolve({
                data,
                navigation
            })
        } catch (error) {
            reject(error)
        }
    })
}
