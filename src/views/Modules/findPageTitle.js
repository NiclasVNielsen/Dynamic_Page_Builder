export default async function findPageTitle (route) {
    return new Promise ((resolve, reject) => {
        try {
            //* Updates the title
            let title = route.path
            
            if(title.includes("admin")){
                //* Cuts of the "/admin" from the string
                title = title.slice(0, -6)

                //* "/admin" would give "" instead of "/"
                if(title == ""){
                    title = "/"
                }
            }
            resolve(title)
        } catch (error) {
            reject(error)
        }
    })
}
