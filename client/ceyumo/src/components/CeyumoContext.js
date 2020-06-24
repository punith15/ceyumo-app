import React,{useState,createContext} from 'react'

const CeyumoContext = createContext()

const ExternalData = props=>{
    const [loginUser, setLoginUser] = useState('')

    return(
        <CeyumoContext.Provider value={[loginUser, setLoginUser]}>
            {props.children}
        </CeyumoContext.Provider>
    )
}

export {CeyumoContext, ExternalData}