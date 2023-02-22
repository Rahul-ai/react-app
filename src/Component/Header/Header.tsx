interface header{
   name:string,
   status:string,
   children: React.ReactNode,
}

export const Header = (props:Partial<header>) =>{
    return<h1>{props.name}{props.status}{props.children}</h1>
}