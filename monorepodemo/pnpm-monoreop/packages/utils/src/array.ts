export const arrayUtil={
    findIndex:(key:number|string,val:any[])=>{
        return val.findIndex((item)=>item===key)
    }
}