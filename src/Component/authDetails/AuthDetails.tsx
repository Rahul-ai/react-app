import { store } from "../../Redux/store/Store"

export const AuthDetails = (Child: any) => {
    const user = store.getState();

    const Component = (props: any) => {
        return <Child {...props} user={user} />;
    };
    return Component;
} 