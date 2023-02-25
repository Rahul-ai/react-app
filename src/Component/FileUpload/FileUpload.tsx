import { Api } from "../../Helpers/axios";

export const FileUpload = (props: any) => {

    const Upload = (event: React.ChangeEvent<HTMLInputElement>) => {
        let formData = new FormData();

        if (event.target.files) {
            formData.append("file", event?.target?.files[0])
            Api.upload(formData).then((res) => { console.log(res) });
        }
        else {
            console.log("error");
        }
    };

    return <input type="file" onChange={Upload} />
}