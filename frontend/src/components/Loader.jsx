import React from 'react'

const Loader = ({ small, dark }) => {
    return (
        <div className={`lds-ring flex gap-1 flex-wrap justify-center ${small ? 'small-ring' : ''}`}>
            <div className={`${small ? 'small' : ''} ${dark ? 'darkRing' : ''}`}></div>
            <div className={`${small ? 'small' : ''} ${dark ? 'darkRing' : ''}`}></div>
            <div className={`${small ? 'small' : ''} ${dark ? 'darkRing' : ''}`}></div>
            <div className={`${small ? 'small' : ''} ${dark ? 'darkRing' : ''}`}></div>
        </div>
    )
}

export default Loader