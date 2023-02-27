import { useState } from "react";
import { Api } from "../../Helpers/axios/axios";
import './FileUpload.css';

export const FileUpload = (props: any) => {

    const [Image, setImage] = useState<any>();

    const Upload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        let formData = new FormData();

        if (event.target.files) {
            formData.append("file", event?.target?.files[0])
            let d = await Api.upload(formData);
            setImage(d.path);
        }
        else {
            console.log("error");
        }
    };

    return <div className="file_container">
        <input type="file" onChange={Upload} />
        {Image && <img className="uploaded_image" src={Image}></img>}
    </div>
}