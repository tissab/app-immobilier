import React, {useMemo, useEffect, useState, useContext } from 'react';
import * as actions from '../actions/dEntityImmobilier';
import {format} from 'date-fns';
import {useHistory} from 'react-router-dom';
import ReactTable from '../table/ReactTable';
import * as main from '../main/SweetAlert';
import {useToasts} from 'react-toast-notifications';
import {ConnectionContext} from '../MyContext';
import axios from 'axios';
import { connect } from 'react-redux';


const ListImmobilier = (props) => {

    const[value, setValue] = useState({});

    const[data, setData] = useState([])

    const [rows, setRows] = useState({});

    const connection = useContext(ConnectionContext);

    const {addToast} = useToasts();

    const COLUMNS = 
    [
        {
            Header: 'Entity_id',
            accessor: 'Entity_id'
        },
        {
            Header: 'Image',
            accessor: 'Imagename',
            position: 'center'
        }
        ,
        {
            Header: 'Description',
            accessor: 'Description',
            position: 'center'
        },
        {
            Header: 'Titre',
            accessor: 'Titre',
            position: 'center'
        }
    ]

    const columns = useMemo(() => COLUMNS, []);

    const history = useHistory();   

    useEffect(()=>{

        document.getElementById('loading').style.display = 'none'
        props.fetchall('/GetListImmobilier'); 

        connection?.on('UpdateData', () => {
            props.fetchall('/GetListImmobilier'); 
        });
        
    },[])   
    
    const New = () => {
        props.reset();
        history.push(`/immobilier`)
    }

    const Edit = () => {
        if(!!value.Entity_id){
            history.push(`/immobilier/${value?.Entity_id}`)
        }
    }

    const Delete = () => {
        if(!!value.Entity_id){
            main.SweetAlert('Voulez-vous supprimer cette donnée','Cette action est irréversible',2,1)
            .then((res)=>{
                if(res.isConfirmed){
                    props.Delete('DeleteImmobilier?guid=',value.Entity_id)
                    main.SweetAlert(
                        'Supprimer!',
                        'Suppression effectuée avec succès.',
                        1
                    )
                    }
                });
        }
    }

    return (
        <>
           <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <button className="btn btn-wd btn-facebook btn-outline mr-2" onClick={New}>
                                <i className="far fa-file fa-lg"></i>  Nouveau 
                            </button>
                            <button className="btn btn-wd btn-facebook btn-outline mr-2" onClick={Edit}>
                                <i className="far fa-pencil-alt fa-lg"></i> Modifier
                            </button>
                            <button className="btn btn-wd btn-facebook btn-outline mr-2" onClick={Delete}>
                                <i className="far fa-trash-alt fa-lg" ></i> Supprimer
                            </button>
                        </div>
                    </div>
                    <ReactTable 
                        columns={columns} 
                        data={props.dEntityList}  
                        Title="Liste immobilier"
                        id="idImmo" 
                        IdColumn = "Entity_id"
                        height= "400px"
                        handleSelect = {setValue}
                        setRows = {setRows}
                        handleDblclick = {Edit}
                        objSelect = {value}
                    /> 
                  
                </div>
            </div>

        </>
    )
}

const mapStateToProps = state => ({
    dEntityList: state.Immobilier.list,
})

const mapActionToProps = {
    fetchall : actions.fetchall,
    reset: actions.reset,
    Delete: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(ListImmobilier);
