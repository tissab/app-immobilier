import React, {useState } from 'react';
import {Controller} from 'react-hook-form';
import Select from 'react-select';

const ControllerModel = ({hasError,label, name, control,listOptions,data=null,onChange,error}) => {  

    
    const [val, setVal] = useState(null)
   
    return (
        listOptions === undefined ? <div> </div> :
        <div className={hasError}>  
            <label>{label}</label>
                <Controller
                    name={name}
                    control={control}
                    defaultValue 
                    isClearable
                    placeholder = "Veuillez selectionner..."
                    noOptionsMessage={() => 'Aucune données trouvées'}
                    render={({field}) => (
                        <Select
                            {...field} 
                            options={listOptions}  
                            defaultValue
                            isClearable
                            placeholder = "Veuillez selectionner..."
                            noOptionsMessage={() => 'Aucune données trouvées'}
                            name={name}
                            value={listOptions.find(c => c.value === (val||data))||null}
                            onChange={val => {
                                setVal(val?.value)
                                onChange(val)
                            }}
                        />
                    )}
                />
              
            <label className="error">{error}</label>
        </div>
    )
}

export default ControllerModel
