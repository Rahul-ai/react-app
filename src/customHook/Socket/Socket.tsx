import React, { useMemo } from "react"
import { io } from "socket.io-client"

const SocketContext:any = React.createContext(null);

export const useSocket = () =>{
    return React.useContext(SocketContext);
}

export const SocketProvider = (props:any) =>{
    const socket = useMemo(()=>io("http://localhost:2000"),[]);
     return (
        <SocketContext.Provider value={{ socket }}>
            {props.children}
        </SocketContext.Provider>
     )
}