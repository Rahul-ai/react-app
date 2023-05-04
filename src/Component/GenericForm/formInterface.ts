export interface formInterface{
    type: "number"|"text"|"textarea"|"email"|"password"|"select"|"fileUpload"|"multi-select",
    key:string
    name:string
    require?:boolean
    options?:string[]
    md?:number
    placeHolder?:string
    validation?:any
    condition?:any
}