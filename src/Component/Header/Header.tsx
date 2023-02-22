interface header{
   name:string,
   status:string,
}

export const Header = (props:Partial<header>) =>{
    return<h1>{props.name}{props.status}</h1>
}