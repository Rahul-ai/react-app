import { Pagination } from "react-bootstrap"

export const TablePagination = (props: any) => {

    return <div>
        <Pagination>
            <Pagination.Prev />
            {[...Array(props.totalPages)].map((d, index) => {
                return <Pagination.Item key={index + 1} onClick ={(e)=>props.onClick(e)}>{index + 1}</Pagination.Item>
            })}
            <Pagination.Next />
        </Pagination></div>
}