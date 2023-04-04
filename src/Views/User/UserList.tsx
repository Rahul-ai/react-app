import { useRef } from "react";
import { Link } from "react-router-dom";
import { RTable } from "../../Component/Table/RTable";
import { TableStructure } from "../../Component/Table/TableStructureInterface";
import { Api } from "../../Helpers/axios/axios";

export const UserList = () => {

  const tableStructure: TableStructure[] = [
    {
      name: "id",
      render: (data: any, index: any) => {
        return index;
      },
    },
    {
      name: "Name",
      render: (data: any, index: any) => {
        return `${data.firstName} ${data.lastName}`;
      },
    },
    { name: "UpdatedAt", key: "updatedAt" },
    { name: "CreatedAt", key: "createdAt" },
    { name: "Action", render: (data: any, onDelete: any) => {
      return <><Link to={`/UserForm/${data.id}`}>Edit </Link>
          <Link to="#" onClick={()=>{onDelete(data.id)}}>Delete</Link></>;
    },},
  ];

  return (
    <div className="container" style={{ marginTop: 100 }}>
      <RTable deleteUrl="user" api="user/withPagination" tableStructure={tableStructure} />
      <RTable deleteUrl="role" api="role/withPagination"  />
    </div>
  );
};
