export const asyncButtonClickListner = (id)=>{
    return new Promise((res)=>{
        document.getElementById(id).addEventListener('click',(ev)=>{
            res('clicked')
        })
    })
}
export const getInputValueWithId=(id)=>{
    return document.getElementById(id)?.value
}