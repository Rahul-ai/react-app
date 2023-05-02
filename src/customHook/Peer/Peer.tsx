import React, { useCallback, useEffect, useMemo, useState } from "react";

const PeerContext:any = React.createContext(null);

export const usePeer=() =>{
    return React.useContext(PeerContext);
}

export const PeerProvider = (props:any) =>{
    const [remoteStream, setRemoteStream] = useState();

const peer = useMemo(()=>new RTCPeerConnection({
    iceServers:[
        {
            urls:[
                "stun:stun.l.google.com:19302",
                "stun:global.stun.twilio.com:3478",
            ]
        }
    ]
}),[]);

const createOffer = async() =>{
   const offer = await peer.createOffer();
   await peer.setLocalDescription(offer);
   return offer;
}

const createAnswer = async(offer:any) =>{
    await peer.setRemoteDescription(offer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
}

const setRemoteAnswer = async(offer:any) =>{
    await peer.setRemoteDescription(offer);
}

const sendTracks = (stream:MediaStream) =>{
    const tracks = stream.getTracks();
    for(const track of tracks){
        peer.addTrack(track,stream);
    }
}

const handelStreamTrack = useCallback(async(ev:any) =>{
    const stream = ev.streams;
    setRemoteStream(stream[0]);
},[]);

useEffect(()=>{
  peer.addEventListener('track',handelStreamTrack)
  return()=>{
    peer.removeEventListener('track',handelStreamTrack);
  }
},[peer,handelStreamTrack]);

    return (<PeerContext.Provider
            value={
                {peer,
                sendTracks, 
                createOffer,
                createAnswer,
                setRemoteAnswer,
                remoteStream }}>
        {props.children}
    </PeerContext.Provider>)
}