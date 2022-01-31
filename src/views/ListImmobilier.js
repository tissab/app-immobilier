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

    const ExportData = (url, accept, extension) =>{
        let lst = [];
        lst = rows.map(x => x.values).map(x =>{
            return {Adressemail: x.Adressemail, Contact: x.Contact, Matricule: x.Matricule, Nom: x.Nom, NomDepartement: x.NomDepartement, 
                NomService: x.NomService, NomProfil: x.NomProfil, Prenom: x.Prenom, Utilisateur_id: x.Utilisateur_id}
        });
        document.getElementById('loading').style.display = 'block';
          axios.post(`/${url}`
          ,
          lst
          ,
          {
              responseType: 'arraybuffer',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': `${accept}`
              }
          }
          ).then(response => {
            document.getElementById('loading').style.display = 'none';
              const url = URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', `Report.${extension}`); //or any other extension
              document.body.appendChild(link);
              link.click();
              link.remove();
              // win.location = url;
              //console.log(response.data);
          })
    }

    const Print = () =>{
        
        let lstCourrierArrive = [];
        lstCourrierArrive = rows.map(x => x.values).map(x =>{
            return {CourrierArrive_id: x.CourrierArrive_id, NumOrdre: x.NumOrdre, NumInterne: x.NumInterne, DateArrivee: x.DateArrivee, DateRendezVous: x.DateRendezVous, 
                NomExpediteur: x.NomExpediteur, ContactExpediteur: x.ContactExpediteur, EmailExpediteur: x.EmailExpediteur}
        });
               
        document.getElementById('loading').style.display = 'block'
        axios.post('/exportCourrierArrivePdf'
        ,
        lstCourrierArrive 
        ,
        {
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
            }
        }).then(response => {
            document.getElementById('loading').style.display = 'none';
            let url = URL.createObjectURL(response.data);
            window.open(url);
            // window.URL.revokeObjectURL(url);
           // win.location.href = url;
        })
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
                            <button className="btn btn-wd btn-facebook btn-outline mr-2" onClick={Print}>
                                <i className="far fa-print fa-lg" ></i> Imprimer
                            </button>
                            <div className="btn-group mx-auto " >
                                <button type="button" className="btn btn-wd btn-facebook btn-outline mr-2" id="dropdownMenuButton" 
                                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,20">
                                    <i className="fas fa-ellipsis-h fa-lg"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-center" aria-labelledby="dropdownMenuButton" style={{marginTop:"5px"}}>
                                    <a className="dropdown-item" type="button" onClick={()=>ExportData('exportCourrierArrivePdf','application/pdf','pdf')}>PDF</a>
                                    <a className="dropdown-item" type="button" onClick={()=>ExportData('exportCourrierArriveExcel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','xlsx')}>EXCEL</a>
                                    <a className="dropdown-item" type="button" onClick={()=>ExportData('exportCourrierArriveCSV','text/csv','csv')}>CSV</a>
                                    <a className="dropdown-item" type='button' onClick={()=>ExportData('exportCourrierArriveHtml','text/html','html')}>HTML</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" type='button' onClick={()=>ExportData('exportCourrierArriverDocX','application/vnd.openxmlformats-officedocument.wordprocessingml.document','docx')}>DOC</a>
                               </div>
                            </div>
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
