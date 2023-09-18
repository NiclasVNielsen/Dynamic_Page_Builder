export default async function convertLinks () {
    return new Promise (async (resolve, reject) => {
        try {
            const fields = document.querySelectorAll(".editable")

            const regex = /[*][a-zA-Z0-9 ]*[@][a-zA-Z0-9 .:/]*[*]/g
            
            fields.forEach(field => {
                let fieldData = field.innerHTML

                //.replace(/[|&;$%@"<>()+,]/g, "")

                const regexResult = regex.exec(fieldData)

                if(regexResult != null){
                    let data = regexResult[0] /* Loop here */
                    data = data.substring(1, data.length-1);

                    data = data.split('@')
                    if(data.length != 2){
                        console.error(data)
                        console.error("Ehmm this link is on fire!")
                    }else{
                        data[0] = data[0].trim()
                        data[1] = data[1].trim()
                        
                        field.innerHTML = fieldData.replace(`${regexResult[0]}`, `<a href="${data[1]}">${data[0]}</a>`)
                    }
                }

                /* regex.exec(field) */

            })

            resolve("Success!")
        } catch (error) {
            reject(error)
        }
    })
}
