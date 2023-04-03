import { useState } from "react";
import { Col } from "react-bootstrap";
import { Api } from "../../Helpers/axios/axios";
import './FileUpload.css';

export const FileUpload = (props: any) => {

    const [Image, setImage] = useState<any>();

    const Upload = (event: React.ChangeEvent<HTMLInputElement>) => {
        let formData = new FormData();

        if (event.target.files) {
            formData.append("file", event?.target?.files[0])
            Api.upload(formData).then((data)=>{
                setImage(data.path);    
            }).catch((error)=>{
                console.log(error)
            });
        }
        else {
            console.log("error");
        }
    };

    return <Col md={4} className="file_container">
        <input type="file" onChange={Upload} />
        {(props.value || Image) && <img className="uploaded_image" src={props.value || Image}></img>}
        </Col>
}