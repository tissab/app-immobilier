import React from 'react'

const TraitModel = ({name}) => {
    return (
    <div className="mb-4">
        <h6 className=" text-lowercase font-italic"><ins>{name}</ins></h6>
        <hr style={{borderTopWidth: "2px", borderTopStyle: "dotted", borderTopColor: "rgb(153,153,153)"}}></hr>
    </div>
    )
}

export default TraitModel
