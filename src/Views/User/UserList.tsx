import { RTable } from "../../Component/Table/RTable";
import { TableStructure } from "../../Component/Table/TableStructureInterface";

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
  ];

  return (
    <div className="container" style={{ marginTop: 100 }}>
      <RTable api="user/withPagination" tableStructure={tableStructure} />
    </div>
  );
};
