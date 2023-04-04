import { TableStructure } from "./TableStructureInterface"

export interface rTableInterface{
    render?:Function
    api?:string
    tableStructure?:TableStructure[]
    data?:[]
    tableName:string
} 