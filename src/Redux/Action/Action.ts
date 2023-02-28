export const UserDetails = (token:{})=>{
    return{
        type:"login",
        data:token,
    }
}