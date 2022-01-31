import React from 'react'

const InputModelReadonly = ({hasError,label, type, placeholder,register, id, style, name, error}) => {
    return (    
             <div className={hasError}>
                <label>{label}</label>
                <input id={id} type= {type === undefined ? "text" : type} placeholder={placeholder} className="form-control"
                    ref={register} name={name} style={style} readOnly  />
                <label className="error">{error}</label>
            </div>  
    )
}

export default InputModelReadonly