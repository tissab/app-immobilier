import React from 'react'


const InputModel = ({hasError,label,  type, placeholder,register, id, style, name, error, readOnly}) => {

    return (    
             <div className={hasError}>
                <label>{label}</label>

                <input id={id}  type= {type === undefined ? "text" : type} placeholder={placeholder} className="form-control"
                    ref={register} name={name} style={style} readOnly={readOnly}/>

                <label className="error">{error}</label>
            </div>  
    )
}

export default InputModel
