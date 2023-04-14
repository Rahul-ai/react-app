import { useEffect, useState } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import { RenderComponent } from "../../Component/RenderComponent/RenderComponent";
import { GenericForm } from "../../Component/GenericForm/GenericForm";
import { Api } from "../../Helpers/axios/axios";
import { formInterface } from "../../Component/GenericForm/formInterface";
import { UserDetails } from "../../Redux/Action/Action";
import { store } from "../../Redux/store/Store";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../Component/Socket/Socket";

const Createmeet = ({user}:any) => {
    const navigate = useNavigate();
    
    //Form Data 
    const config: formInterface[] = [
        { type: "text", name: "email", key: "email", require: true },
        // { type: "select", name: "User Name", key: "user", options:["sda","adsad"] , require: true },
        { type: "text", name: "room Id", require: true, key: "room_id" },
    ];

    const [data, setData] = useState<any>();

    useEffect(()=>{
        window.localStorage.clear();
    },[])

    // const Submit = async (e: React.FormEvent<HTMLInputElement> | any) => {
    //     e.preventDefault();
    //     let user = await Api.logIn(data);
    //     store.dispatch(UserDetails(user));
    //     navigate("/rahul")
    // };

    const onChange = (key: string, value: any) => {
        console.log({key,value})
        let d = { ...data };
        d[key] = value;
        setData(d);
    };
    const {socket}:any = useSocket();

    socket.on("hello", (arg:any)=>{
        console.log(arg);
    })

    return <Container>
        {/* <Form onSubmit={Submit}> */}
            <Row>
                {GenericForm(config, onChange)}
                <Button className="mt-2" type="submit">
                    Submit
                </Button>
            </Row>
        {/* </Form> */}
    </Container>
};
export const CreatM = RenderComponent(Createmeet);