import React, {createContext, useContext, useState} from 'react'


export const VendorContext = createContext()

export const VendorDetails = props=>{
    const [vendorlist, setVendorlist] = useState([])

    return(
        <VendorContext.Provider value={[vendorlist, setVendorlist]}>
            {props.children}
        </VendorContext.Provider>
    )
}