import { FormSelect, Pagination } from "react-bootstrap";

export const TablePagination = (props: any) => {
  return (
    <div key={"Paginations"}> 
    <div>
        <FormSelect onChange={(e) => props.onSelectClick(e)}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </FormSelect>
    </div>
    <div>
        <Pagination key={"Pagination"}>
          <Pagination.Prev />
          {[...Array(props.totalPages)].map((d, index) => {
            return (
              <Pagination.Item
                key={index + 1}
                onClick={(e) => props.onClick(e)}
              >
                {index + 1}
              </Pagination.Item>
            );
          })}
          <Pagination.Next />
        </Pagination>
    </div>
     
    </div>
  );
};
