import React, { useCallback, useEffect, useState } from "react"
import { useSocket } from "../../Helpers/Socket/Socket"
import { usePeer } from "../../Helpers/Peer/Peer";
import ReactPlayer from "react-player";

export const RoomPage =()=>{
    const [stream, setStream] = useState<any>();
    const [remoteStream, setRemoteStream] = useState();
    const { socket }:any = useSocket();
    const { Peer, createOffer, createAnswer, setRemoteAnswer }:any = usePeer();
   
    const handelNewUserJoined = useCallback(async({email}:any)=>{
      console.log("new User",email)
      const offer = await createOffer();
      socket.emit("call-user",{email,offer});
    },[])

    const handelIncommingCall = useCallback(async({from,offer} :any)=>{
        console.log(from);
        console.log(offer);
        const ans = await createAnswer(offer);
        socket.emit('call-accepted',{email:from,ans:ans});
    },[]);

    const handelAcceptCall = useCallback(async({ans} :any)=>{
        await setRemoteAnswer(ans);
        console.log(ans);
    },[]);

    const getUserMediaStream = useCallback(async()=>{
        const stream = await navigator.mediaDevices.getUserMedia({audio:true,video:true});
        setStream(stream);
    },[]);

    useEffect(()=>{
        console.log("started");
        socket.on('User-joined',handelNewUserJoined);
        socket.on('incomming-call', handelIncommingCall);
        socket.on('call-accept',handelAcceptCall);
        return()=>{
            socket.off('User-joined',handelNewUserJoined);
            socket.off('incomming-call', handelIncommingCall);
            socket.off('call-accept',handelAcceptCall);
        }
    },[socket,handelNewUserJoined,handelIncommingCall,handelAcceptCall]);

    useEffect(()=>{
        getUserMediaStream();
    },[]);

return (
    <div>
        <h4>Room Joined</h4>
        <ReactPlayer url={stream} playing muted/>
    </div>
)
}