import { TableStructure } from "./TableStructureInterface"

export interface rTableInterface{
    render?:Function
    api?:string
    tableStructure?:TableStructure[]
    data?:[]
    config?:any
    deleteUrl:string
    Addlink?:any
    ExportStructure?:[]
    ActionEditLink?:string
    ActionDeleteLink?:string
} 