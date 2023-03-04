export interface formInterface{
    type: "number"|"text"|"textarea"|"email"|"password"|"select"|"fileUpload"|"multi-select",
    key:string
    name:string
    require?:boolean
    options?:string[]
}