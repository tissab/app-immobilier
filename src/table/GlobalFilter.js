import React,{useState} from 'react';
import {useAsyncDebounce} from 'react-table';

export const GlobalFilter = ({setGlobalFilter, globalFilter}) => {

    const [value, setValue] = useState(globalFilter);

    const onChange = useAsyncDebounce(value =>{
        setGlobalFilter(value || undefined)
    },200)

    return (
        <>
            <div className="row" style={{marginTop: "10px"}}>
                <div className="col-md-12">
                    <span>
                        <input className="form-control" placeholder="Rechercher..." value={value || ''}
                         onChange={e => {
                             setValue(e.target.value);
                             onChange(e.target.value);
                             }}/>
                    </span>
                </div>
            </div>
        </>
    )
}
