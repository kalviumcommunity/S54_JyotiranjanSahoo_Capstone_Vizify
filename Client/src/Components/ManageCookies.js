const setCookie =(name,value,daysToExpire)=>{
    const date = new Date()
    date.setTime(date.getTime() + daysToExpire*24*60*60*1000)
    const expire = "expires="+date.toUTCString()
    document.cookie = `${name}=${value};${expire};path=/`
}

const deleteCookie = (name)=>{
    document.cookie = `${name}=deleted;expires=Thu, 18 Dec 2013 12:00:00 UTC;path=/`
}

const getCookie = (name)=>{
    const cookieArray = decodeURIComponent(document.cookie).split("; ")
    let result = null
    cookieArray.forEach(e=>{
        if (e.indexOf(name) === 0) {
            result = e.slice(name.length+1)
        }
    })
    return result
}

export {setCookie,deleteCookie,getCookie}