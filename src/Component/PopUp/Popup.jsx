import React from 'react';
import './Popup.css'

export const Popup = (props) =>{
    if(props.trigger){
    return <div className='popup'>
            <div className={props.class ? `${props.class}`:'popup-inner'}>
            <div className='popup-header'>
                {props.icon ? <img src={props.icon} alt="deleteicon" />:props?.heading}
                <button className='close-btn' onClick={()=>{
                    props.setSearch(false)  
                    }}><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" 
                        fill="white" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                </button>
            </div>
            {props.children}
                <div className='popup-footer'>
                { props.action && <button onClick={()=>{props.setSearch(false) }}
                                    className='cancel-button'>No, keep it</button>}
                { props.action && <button onClick={(e)=>{props.action(e,props.actionParams)}} 
                                    className="delete-button" type="button">Yes, delete</button>}
                </div>
            </div>
        </div>
    }
        else{
            return<></>;
        }
}
