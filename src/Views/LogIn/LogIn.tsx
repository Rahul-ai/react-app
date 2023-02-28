import { useEffect, useState } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import { GenericForm } from "../../Component/GenericForm/GenericForm";
import { Api } from "../../Helpers/axios/axios";
import { formInterface } from "../../Helpers/Form/formInterface";
import { user } from "../../Redux/Action/Action";
import { store } from "../../Redux/store/Store";

export const LogIn = () => {
    //Form Data 
    const config: formInterface[] = [
        { type: "text", name: "User Name", key: "user", require: true },
        { type: "password", name: "Password", require: true, key: "password" },
    ];

    const [data, setData] = useState<any>();

    useEffect(()=>{
        window.localStorage.clear();
    },[])

    const Submit = async (e: React.FormEvent<HTMLInputElement> | any) => {
        e.preventDefault();
        let user = await Api.logIn(data);
        store.dispatch(user(user));
    };

    const onChange = (key: string, value: any) => {
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
}