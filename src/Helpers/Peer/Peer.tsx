import { off } from "process";
import React, { useMemo } from "react";

const PeerContext:any = React.createContext(null);

export const usePeer=() =>{
    return React.useContext(PeerContext);
}

export const PeerProvider = (props:any) =>{
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

    return (<PeerContext.Provider value={{ peer, createOffer, createAnswer, setRemoteAnswer }}>
        {props.children}
    </PeerContext.Provider>)
}