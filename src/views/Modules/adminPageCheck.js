import { useRoute } from 'vue-router'

export default async function adminPageCheck () {
    const route = useRoute()

    return new Promise (async (resolve, reject) => {
        try {
            let result = null

            if(route.params.admin == "admin"){
                result = true
            }else{
                result = false
            }
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}
