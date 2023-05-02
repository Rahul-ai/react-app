import { useCallback, useEffect, useState } from "react"
import { useSocket } from "../../customHook/Socket/Socket"
import { usePeer } from "../../customHook/Peer/Peer";
import ReactPlayer from "react-player";

export const RoomPage =()=>{
    const [stream, setStream] = useState<any>();
    const [remoteId, setRemoteId] = useState<any>();  

    const { socket }:any = useSocket();
    const { peer, createOffer, createAnswer, setRemoteAnswer, sendTracks,remoteStream }:any = usePeer();
   
    const handelNewUserJoined = useCallback(async({email}:any)=>{
      setRemoteId(email);
      const offer = await createOffer();
      socket.emit("call-user",{email,offer});
    },[])

    const handelIncommingCall = useCallback(async({from,offer} :any)=>{
        const ans = await createAnswer(offer);
        socket.emit('call-accepted',{email:from,ans:ans});
        setRemoteId(from);
    },[]);

    const handelAcceptCall = useCallback(async({ans} :any)=>{
        await setRemoteAnswer(ans);
    },[]);

    const getUserMediaStream = useCallback(async()=>{
        const stream = await navigator.mediaDevices.getUserMedia({audio:true,video:true});
        setStream(stream);    
        sendTracks(stream);
    },[sendTracks]);

    const handelNegotiationNeeded = useCallback(async() =>{
        const offer = peer.localDescription;
        socket.emit('call-user',{email:remoteId,offer:offer});
    },[peer, peer.localDescription,remoteId, socket]);

    useEffect(()=>{
        peer.addEventListener('negotiationneeded',handelNegotiationNeeded);
        return()=>{
            peer.removeEventListener('negotiationneeded',handelNegotiationNeeded);
          }
    },[])

    useEffect(()=>{
        socket.on('User-joined',handelNewUserJoined);
        socket.on('incomming-call',handelIncommingCall);
        socket.on('call-accept',handelAcceptCall);
        return()=>{
            socket.off('User-joined',handelNewUserJoined);
            socket.off('incomming-call',handelIncommingCall);
            socket.off('call-accept',handelAcceptCall);
        }
    },[socket,handelNewUserJoined,handelIncommingCall,handelAcceptCall]);

    useEffect(()=>{
        getUserMediaStream();
    },[getUserMediaStream]);

return (
    <div>
        <h4>Room Joined</h4>
        <h4>{remoteId}</h4>
        <ReactPlayer url={stream} playing muted/>
        <ReactPlayer url={remoteStream} playing muted/>
    </div>
)
}