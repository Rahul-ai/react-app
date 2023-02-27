import { Form } from "react-bootstrap";
import { GenericForm } from "../../Component/GenericForm/GenericForm";
import { formInterface } from "../../Helpers/Form/formInterface";

export const LogIn = () => {

    const config:formInterface[] = [
        { type: "text", key:"user", name:"User Name", require:true },
        { type: "password", name:"User Name", require:true, key:"password" },
    ];


    const Submit = (e:any) => {
        e.preventDefault();
        console.log(typeof e)
    }

    return <div className="login_container">
        <Form onSubmit={Submit}>
            { GenericForm(config) }
            <button type="submit">LogIn</button>
        </Form>
    </div>
}