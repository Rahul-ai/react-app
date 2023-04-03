import { FormSelect, Pagination } from "react-bootstrap";
import { Right } from "react-bootstrap/lib/Media";

export const TablePagination = (props: any) => {
  return (
    <div style={{display:'flex', justifyContent:"space-between"}}  key={"Paginations"} className="Paginations"> 
    <div style={{width:80}}>
        <FormSelect onChange={(e) => props.onSelectClick(e)}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          {/* <option value={5}>5</option> */}
        </FormSelect>
    </div>
    <div style={{float:"left"}}>
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
