import { Link } from "react-router-dom";
import { RTable } from "../../Component/Table/RTable";
import { TableStructure } from "../../Component/Table/TableStructureInterface";
import { formInterface } from "../../Component/GenericForm/formInterface";
import { CardGrid } from "../../Component/CardGrid/CardGrid";

export const UserList = () => {
  const tableStructure: TableStructure[] = [
    {
      name: "id", render: (data: any, index: any) => {
        return index; 
      },
    },
    {
      name: "Name",render: (data: any, index: any) => {
        return `${data.name}`; },
    },
    { name: "UpdatedAt", key: "updatedAt" },
    { name: "CreatedAt", key: "createdAt" },
    { name: "Action", render: (data: any, onDelete: any) => {
      return <><Link to={`/UserForm/${data.id}`}>
        <img width="16px" src="../../../images/edit.svg" alt="edit" />
        </Link>
          <Link to="#" onClick={()=>{onDelete(data.id)}}>
            <img width="16px" src="../../../images/delete.svg" alt="delete" />
          </Link></>;
    },},
  ];

  const SearchInter:formInterface[] = [
    {name:"Search by",type:'select',key:'selector',options:["name","UpdatedAt"],md:12},
    {name:"Name",type:'text',key:'name',condition:'selector',md:12},
  ]

  
  return (
    <div className="container" style={{ marginTop: 100 }}>
      <h3>User Table</h3>
      <RTable searchReg={SearchInter} Addlink="/UserForm" deleteUrl="user/softDelete" api="user/withPagination" tableStructure={tableStructure} />
      <h3>Role Table</h3>
      <RTable deleteUrl="role/softDelete" api="role/withPagination"  />
      <h3>Deleted Role Table</h3>
      <RTable deleteUrl="role/restore" api="role/onlyDeleted" />
      <h3>Role Card Grid</h3>
      <CardGrid />
    </div>
  );
};
