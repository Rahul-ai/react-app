import { AxiosResponse } from "axios";
import { type } from "os";
import { useEffect, useState } from "react";
import { Api } from "../../Helpers/axios";

export const FileUpload = (props: any) => {

    const [Image, setImage] = useState<any>();
    const Upload = (event: React.ChangeEvent<HTMLInputElement>) => {
        let formData = new FormData();

        if (event.target.files) {
            formData.append("file", event?.target?.files[0])
            Api.upload(formData).then((data:any) =>{
                let d = JSON.parse(data.data)
                 setImage(d.path);
                });
        }
        else {
            console.log("error");
        }
    };

    useEffect(()=>{
       console.log(Image);
    },[Image]);

    return <div>
        <input type="file" onChange={Upload} />
        {Image && <img src={Image}></img>}
    </div>
}