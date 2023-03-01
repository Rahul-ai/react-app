import { header } from "./header"

export const Header = (props:Partial<header>) =>{
    return<h1>{props.name}{props.status}{props.children}</h1>
}