
interface urlProps{
    url:string
}
export const Sendurl=async({url}:urlProps)=>{
    try {

        const res=await fetch('/api/',{
            method:"POST",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({url})
        })

        return res.json();
    } catch (error) {
        console.error('Error while sending Url',error)
    }
}


export const Geturl=async(url:string)=>{
    try {
const urlkey=url
        const res=await fetch(`/api/?urlkey=${urlkey}`,{
            method:"GET",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
        })

        return res.json();
    } catch (error) {
        console.error('Error while Getting Url',error)
    }
}

export default {}