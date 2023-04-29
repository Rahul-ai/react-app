import { Link } from "react-router-dom";
import { RTable } from "../../Component/Table/RTable";
import { TableStructure } from "../../Component/Table/TableStructureInterface";
import { useRef } from "react";

export const SecurityLog = () =>{

  const tableStructure: TableStructure[] = [
    {
      name: "id", render: (data: any, index: any) => {
        return index; 
      },
    },
    {
      name: "What",render: (data: any, index: any) => {
        return `${data.resion}`; },
    },
    { name: "UpdatedAt", key: "updatedAt" },
    { name: "CreatedAt", key: "createdAt" },
    { name: "Modification", render:(data:any)=>{
      return<><p>{JSON.stringify(data.data)}</p></>
    } },
    { name: "Action", render: (data: any, onDelete: any) => {
      return <><Link to={`/UserForm/${data.id}`}>
        <img width="16px" src="../../../images/edit.svg" alt="edit" />
        </Link>
          <Link to="#" onClick={()=>{onDelete(data.id)}}>
            <img width="16px" src="../../../images/delete.svg" alt="delete" />
          </Link></>;
    },},
  ];
  
      return (
        <div className="container" style={{ marginTop: 100 }}>
          <h3>Log Table</h3>
          <RTable deleteUrl="Log/softDelete" api="log/withPagination" tableStructure={tableStructure} />
        </div>
      );
};
