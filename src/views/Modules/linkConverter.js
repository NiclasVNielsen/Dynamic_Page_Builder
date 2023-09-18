export default async function convertLinks () {
    return new Promise (async (resolve, reject) => {
        try {
            const fields = document.querySelectorAll(".editable")

            const regex = /[*][a-zA-Z0-9 ]*[@][a-zA-Z0-9 .:/]*[*]/g
            
            fields.forEach(field => {
                let fieldData = field.innerHTML

                const regexResult = fieldData.match(regex)

                if(regexResult != null){
                    regexResult.forEach((result, index) => {
                        let data = result
                        data = data.substring(1, data.length-1);
    
                        data = data.split('@')
                        if(data.length != 2){
                            console.error("Ehmm this link is on fire!")
                        }else{
                            data[0] = data[0].trim()
                            data[1] = data[1].trim()
                            if(data[1].match(/^http/)){
                                data[1] = `<a target="_blanc" href="${data[1]}">${data[0]}</a>`
                            }else{
                                data[1] = `<a href="${data[1]}">${data[0]}</a>`
                            }
                            
                            
                            field.innerHTML = field.innerHTML.replace(`${regexResult[index]}`, data[1])
                        }
                    })
                }
            })

            resolve("Success!")
        } catch (error) {
            reject(error)
        }
    })
}
