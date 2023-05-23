import { useEffect, useState } from "react";                                                                                                                                                                                                                                                                                                                                                                                                                
import { Form, Button, Row, Container,Col } from "react-bootstrap";
import { GenericForm } from "../../Component/GenericForm/GenericForm";
import { Api } from "../../Helpers/axios/axios";
import { formInterface } from "../../Component/GenericForm/formInterface";
import { useNavigate,useParams } from "react-router-dom";

export const UserForm = () => {
  const url = "/user"
  const navigate = useNavigate();
  const { id } = useParams();

  //Form Data
  const config: formInterface[] = [
    { type: "text", name: "Full Name", key: "name", require: true, md:12 },
  ];

  const [data, setData] = useState<any>();

  useEffect(() => {
    if(id){
      fetch(id);
    }
  }, [id]);

  const fetch = (id:any) => {
    Api.get(`${url}/${id}`).then((res: any) => {
        console.log(res);
        setData(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const Submit = async (e: React.FormEvent<HTMLInputElement> | any) => {
    e.preventDefault();
    if(id){
        Update();
    }
    else{
      Create();
    }
  };

  const Update = () =>{
    Api.put(`${url}/${id}`,data).then((res: any) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      }).finally(()=>{
        navigate(`/UserForm/${id}`);
      }); 
  }

  const Create = () =>{
    console.log("data");
        Api.post(`${url}`,data).then((res: any) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        }).finally(()=>{
          navigate(`/userlist`);
        });
  }

  const onChange = (key: string, value: any) => {
    console.log({ key, value });
    let d = { ...data };
    d[key] = value;
    setData(d);
  };

  return (
    <Container>
      <Form onSubmit={Submit}>
        <Row style={{ width:500,height:50}}>
          {GenericForm(config, onChange, data)}
          <Col md={12}>
          <Button className="mt-2" style={{ width:200,height:50}} type="submit">
            Submit
          </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
