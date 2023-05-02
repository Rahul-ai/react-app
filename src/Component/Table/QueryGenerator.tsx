import { Row, Container,Col } from "react-bootstrap";
import { GenericForm } from "../../Component/GenericForm/GenericForm";

export const QueryGenerator = (props:any) =>{
    const config = props.queryRef;
    const data:any = [];
    return <Container>
      <Row style={{ width:500,height:50}}>
        {GenericForm(config, props.qChange, data)}
        <Col md={12}>
        </Col>
      </Row>
  </Container>
}