import React from 'react'
import SpinnerLoading from './SpinnerLoading'

const FullPageLoader = () => {
    return (
        <div id="loading" className="loader-container">
            <div className="loader">
                <SpinnerLoading/>
            </div>
        </div>
    )
}

export default FullPageLoader
