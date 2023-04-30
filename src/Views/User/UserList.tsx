import { Link } from "react-router-dom";
import { RTable } from "../../Component/Table/RTable";
import { TableStructure } from "../../Component/Table/TableStructureInterface";

export const UserList = () => {
  const tableStructure: TableStructure[] = [
    {
      name: "id", render: (data: any, index: any) => {
        return index; 
      },
    },
    {
      name: "Name",render: (data: any, index: any) => {
        return `${data.firstName} ${data.lastName}`; },
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

  
  return (
    <div className="container" style={{ marginTop: 100 }}>
      <h3>User Table</h3>
      <RTable Addlink="/UserForm" deleteUrl="user/softDelete" api="user/withPagination" tableStructure={tableStructure} />
      <h3>Role Table</h3>
      <RTable deleteUrl="role/softDelete" api="role/withPagination"  />
      <h3>Deleted Role Table</h3>
      <RTable deleteUrl="role/restore" api="role/onlyDeleted" />
    </div>
  );
};
