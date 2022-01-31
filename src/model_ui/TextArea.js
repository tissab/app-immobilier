import React from 'react'

const TextArea = ({hasError,label, rows, type, placeholder,register, id, style, name, error, readOnly}) => {
    return (    
             <div className={hasError}>
                <label>{label}</label>
                <textarea id={id} rows={rows} type= {type === undefined ? "text" : type} placeholder={placeholder} className="form-control"
                    ref={register} name={name} style={style} readOnly={readOnly}/>
                <label className="error">{error}</label>
            </div>  
    )
}

export default TextArea
