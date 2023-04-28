const validAll=(value)=>{
    if(value.trim().length===0) return false
    return true
 }


const validName = function (value) {
    value=value.trim().replace(/\s+/g, ' ')
    let name = /^[a-zA-Z. ]{3,}$/
    return name.test(value)
    }


const validemail = function (value) {
    value=value.trim()
            let email = /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/
        return email.test(value)
        }

const validDate = function (value) {
    value=value.trim()
            let date=/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
            return date.test(value)
            }

module.exports={validAll,validName,validemail,validDate}