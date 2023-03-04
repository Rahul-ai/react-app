import { format } from "path";
import { RTable } from "../../Component/Table/RTable";
import { rTableInterface } from "../../Component/Table/rTableInterface";

export const UserList = () =>{
    const data = [
        {
          color: "red",
          value: "#f00"
        },
        {
          color: "green",
          value: "#0f0"
        },
        {
          color: "blue",
          value: "#00f"
        },
        {
          color: "cyan",
          value: "#0ff"
        },
        {
          color: "magenta",
          value: "#f0f"
        },
        {
          color: "yellow",
          value: "#ff0"
        },
        {
          color: "black",
          value: "#000"
        }
      ];

      const format:rTableInterface[] = [
        { name:"COLOR", key:'color' },
        { name:"VALUE", key:"value" },
      ]

      return<>
      <RTable tableStructure={format} data={data}/>
      </>
};