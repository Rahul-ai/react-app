import {
  Button,
  Card,
  CardImg,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { TablePagination } from "../Table/TablePagination";
import { useEffect, useState } from "react";
import { Api } from "../../Helpers/axios/axios";

export const CardGrid: any = () => {
  const [data, setData] = useState([]);
  const [count, setCount]= useState<number>();
  const [limit, setLimit] = useState(10);
  const [pageSize,setPageSize] = useState<number>(1);

  let variant = [
    "Primary",
    "Secondary",
    "Success",
    "Danger",
    "Warning",
    "Info",
    "Dark",
  ];

  const featch = () => {
    Api.post("role/withPagination", { page: 1, limit: limit })
      .then((res: any) => {
        if (res[0] && res[1]){
          setData(res[0]);
          setCount(res[1]);
        }
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {});
  };

  const totalPage=()=>{
    if(count && count != -1){
      return Math.ceil(count / 10);
    }
      return 1;
  }

  useEffect(() => {
    featch();
  }, []);

  const getRandomArbitrary = (min: number, max: number) => {
    return Math.ceil(Math.random() * (max - min) + min);
  };

  const cardLoad = () => {
    let a = data.map((d: any, index: any) => {
      return (
        <Col>
          <Card
            border={variant[getRandomArbitrary(0, 5)].toLowerCase()}
            key={variant[getRandomArbitrary(0, 5)]}
          >
            <Card.Header>Entre No. {index + 1}</Card.Header>
            <Card.Body>
              <ListGroup className="list-group-flush">
                {cardStructure(d)}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      );
    });
    return a;
  };

  const cardStructure = (data: any) => {
    let a = Object.keys(data).map((key: any) => {
      return (
        <ListGroupItem>
          {key}:{data[key]}
        </ListGroupItem>
      );
    });
    return a;
  };

  return (
    
    <div className="container" style={{ marginTop: 100 }}>
      <Row xs={1} md={2} className="g-4 mb-3">
        {cardLoad()}
      </Row>
      <TablePagination
        key={"TablePagination"}
        // onSelectClick={onSelectClick}
        // onClick={this.onClick}
        totalPages={pageSize}
        // page={this.page}
        // TotalRecord = {TotalRecord}
        // onClickNext={this.onClickNext}
        // onClickPrevious={this.onClickPrevious}
      />
    </div>
  );
};
