export const user = (token:{})=>{
    return{
        type:"login",
        data:token,
    }
}