import { useEffect, useState } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import { RenderComponent } from "../../Component/RenderComponent/RenderComponent";
import { GenericForm } from "../../Component/GenericForm/GenericForm";
import { Api } from "../../Helpers/axios/axios";
import { formInterface } from "../../Component/GenericForm/formInterface";
import { UserDetails } from "../../Redux/Action/Action";
import { store } from "../../Redux/store/Store";
import { useNavigate } from "react-router-dom";

const LogIn = ({user}:any) => {
    const navigate = useNavigate();
    
    //Form Data 
    const config: formInterface[] = [
        { type: "text", name: "User Name", key: "user", require: true },
        // { type: "select", name: "User Name", key: "user", options:["sda","adsad"] , require: true },
        { type: "password", name: "Password", require: true, key: "password" },
    ];

    const [data, setData] = useState<any>();

    useEffect(()=>{
        window.localStorage.clear();
    },[])

    const Submit = async (e: React.FormEvent<HTMLInputElement> | any) => {
        e.preventDefault();
        Api.logIn(data).then((res)=>{
            store.dispatch(UserDetails(res));  
            console.log(store.getState());
             navigate("/UserList")
        });       
    };

    const onChange = (key: string, value: any) => {
        console.log({key,value})
        let d = { ...data };
        d[key] = value;
        setData(d);
    };

    return <Container>
        <Form onSubmit={Submit}>
            <Row>
                {GenericForm(config, onChange)}
                <Button className="mt-2" type="submit">
                    Submit
                </Button>
            </Row>
        </Form>
    </Container>
};

export const SignIn = RenderComponent(LogIn);