import { Link } from "react-router-dom";
import { RTable } from "../../Component/Table/RTable";
import { TableStructure } from "../../Component/Table/TableStructureInterface";
import { useRef } from "react";

export const UserList = () => {
  const tableStructure: TableStructure[] = [
    {
      name: "id", render: (data: any, index: any) => {
        return index; },
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
      <RTable deleteUrl="user/softDelete" api="user/withPagination" tableStructure={tableStructure} />
      <RTable deleteUrl="role/softDelete" api="role/withPagination"  />
      <RTable deleteUrl="role/softDelete" api="role/onlyDeleted"  />
    </div>
  );
};
