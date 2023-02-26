import { GenericForm } from "../../Component/GenericForm/GenericForm";
import { Form } from "../../Helpers/Form/form";

export const LogIn = () => {

    const config = [
        { type: "text", require:true},
        { type: "password", require:true },
    ];


    const Submit = () => {
        
    }

    return <div className="login_container">
        <form onSubmit={Submit}>
            { GenericForm(config) }
            <button type="submit">LogIn</button>
        </form>
    </div>
}