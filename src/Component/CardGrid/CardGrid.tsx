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

export const CardGrid: any = () => {
  let data = [
    { name: "Rahul", age: 22 },
    { name: "Amar", age: 42 },
    { name: "Prince", age: 24 },
  ];

  let variant = [
    "Primary",
    "Secondary",
    "Success",
    "Danger",
    "Warning",
    "Info",
    "Dark",
  ];

  const getRandomArbitrary = (min: number, max: number) => {
    return Math.ceil(Math.random() * (max - min) + min);
  };

  const cardLoad = () => {
    let a = data.map((d: any, index: any) => {
      return (
        <Col>
          <Card
            border={variant[getRandomArbitrary(0, 5)].toLowerCase()}
            key={variant[getRandomArbitrary(0, 5)]}>
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
            totalPages={5}
            // totalPages={this.totalPages()}
            // page={this.page}
            // TotalRecord = {TotalRecord}
            // onClickNext={this.onClickNext}
            // onClickPrevious={this.onClickPrevious}
          />
    </div>
  );
};
