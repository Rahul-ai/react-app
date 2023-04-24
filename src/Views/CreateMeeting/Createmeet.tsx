import { useEffect, useState } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import { RenderComponent } from "../../Component/RenderComponent/RenderComponent";
import { GenericForm } from "../../Component/GenericForm/GenericForm";
import { formInterface } from "../../Component/GenericForm/formInterface";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../Helpers/Socket/Socket";

const Createmeet = ({user}:any) => {
    const navigate = useNavigate();
    const {socket}:any = useSocket();
    //Form Data 
    const config: formInterface[] = [
        { type: "text", name: "email", key: "email", require: true },
        // { type: "select", name: "User Name", key: "user", options:["sda","adsad"] , require: true },
        { type: "text", name: "room Id", require: true, key: "roomId" },
    ];

    const [data, setData] = useState<any>();

 
    const handelRoomJoined = ({roomId}:any) =>{
        navigate(`/joinedroom/${roomId}`)
    }
    
    useEffect(()=>{
        socket.on("joined-room",handelRoomJoined)
    },[socket])

    

    const Submit = async (e: React.FormEvent<HTMLInputElement> | any) => {
        e.preventDefault();
        // console.log("sadas")
        socket.emit("join-room", data);
        // navigate("/rahul")
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
                    Start meet
                </Button>
            </Row>
        </Form>
    </Container>
};
export const CreatM = RenderComponent(Createmeet);