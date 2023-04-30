import { FormSelect, Pagination } from "react-bootstrap";
import "./TablePagination.css"

export const TablePagination = (props: any) => {
  return (
    <div style={{display:'flex', justifyContent:"space-between"}}  key={"Paginations"} className="Paginations"> 
    <div style={{width:'auto',display:'flex',height:40}}>
        <FormSelect className="Pagination-limit" onChange={(e) => props.onSelectClick(e)}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={500}>500</option>
          <option value={-1}>All</option>
        </FormSelect>
        <div className="bg-success p-2 text-dark bg-opacity-25 record">Total Records: {props.TotalRecord}</div>
    </div>
    <div style={{float:"left"}}>
        <Pagination key={"Pagination"}>
          {props.page!==1 && <Pagination.Prev onClick={()=>{props.onClickPrevious()}} />}
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
          {props.page!==props.totalPages && <Pagination.Next onClick={()=>{props.onClickNext()}} />}
        </Pagination>
    </div>
     
    </div>
  );
};
