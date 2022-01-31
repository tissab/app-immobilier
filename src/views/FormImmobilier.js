import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux';
import * as actions from '../actions/dEntityImmobilier';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useToasts} from 'react-toast-notifications';
import InputModel from '../model_ui/InputModel';
import { useHistory } from 'react-router-dom';
import TextArea from '../model_ui/TextArea';

const defaultImageSrc = '/img/default-image.jpg';

const initialValues = {
    Entity_id: null,
    Imagename:'',
    ImageSrc: '',
    Description: '',
    Titre: ''
} 

const schema  = yup.object().shape({
    Description : yup.string().required('La description est obligatoire'),
    Titre : yup.string().required('Le titre est obligatoire')
});

const FormImmobilier = ({match,...props}) => {

    const {id} = match.params;

    const history = useHistory();

    const [ImageSource, setImagesource] = useState(defaultImageSrc);

    const [isGet, setIsGet] = useState(false)

    const {Immobilier} = props?.obj || initialValues ;
    
    const {Entity_id, Imagename, ImageSrc, Description, Titre} = Immobilier || initialValues 
    
    const {addToast} = useToasts();

    const{register, handleSubmit, errors, reset, setValue,control} = useForm({
        resolver: yupResolver(schema)
    });

    const hasError = (name) => `form-group ${errors[name] === undefined ? "" : "has-label has-error" }`;
    
    

    useEffect(()=>{   

        document.getElementById('loading').style.display = 'none'

        if(!!id){

            if(isGet === false){
                props.fetchById('GetImmobilier?guid=',id);   
                setIsGet(true);
            }
            
            const values = [Entity_id, Imagename, ImageSrc, Description, Titre ]

            if(id === Entity_id){
                const {ImageName,...rest} = initialValues;
                Object.keys(rest).forEach((x,index) => setValue(x,values[index]))
                setImagesource(!!Imagename? ImageSrc : defaultImageSrc)
            }
        }
    },[Entity_id, Imagename, ImageSrc, Description, Titre])


    const showPreview = e => { 
        if(e.target.files && e.target.files[0]){
            let imagefile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setImagesource(x.target.result)
            }
            reader.readAsDataURL(imagefile)
        }else{
            setImagesource(defaultImageSrc)
        }
    }

    const onSubmit = (data) => {    

        const{Imagefile,...rest} = data

        const formData = new FormData();

        formData.append('file',data.Imagefile[0]);
        formData.append('Stringify',JSON.stringify(rest));
        
        if(!!!Entity_id){
            const onSuccess = () => {
                addToast("Enregistrement effectué avec succès", {appearance: 'success', autoDismiss: true})
                Cancel();
            }
            props.create('PostImmobilier',formData,onSuccess)
        }
        else
        {     
            const onSuccess = () => {
                addToast("Modification effectuée avec succès", {appearance: 'success', autoDismiss: true});
                Cancel();
            }
            props.update('UpdateImmobilier?guid=',Entity_id,formData,onSuccess)
        }
       
    }

    const Cancel = ()=> {
        reset();
        history.push('/');
        props.reset();
    }

    return (

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-9 ">
                    <div className="card stacked-form">
                        <div className="card-header">
                            <h4 className="card-title">Fiche immobilière</h4>
                        </div>       
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <InputModel hasError={hasError("Titre")} label = "Titre :" placeholder ="Entrer un titre" 
                                        register = {register} name = "Titre" />
                                </div>
                                <div className="col-md-12">
                                    <TextArea type="text" rows ="5" 
                                    hasError={hasError("Description")} label = "Description :" placeholder ="Entrer un objet" 
                                            register = {register} name = "Description"/>
                                </div> 
                            </div>                      
                    
                            <div className="card-footer text-center">
                                <button type="button" onClick={Cancel} className="btn btn-round btn-danger btn-outline btn-wd" style={{marginRight:"50%"}}>
                                    <i className="fas fa-times fa-2x"></i>
                                </button>
                                
                                <button type="submit" className="btn btn-round btn-success btn-outline btn-wd">
                                    <i className="fas fa-check fa-2x"></i>    
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3" >
                    <div className="card" >
                        <div>
                        <img src={ImageSource} className="img-fluid" alt="responsive image" 
                        style={{display:"block",margin:"auto", marginTop:"5%", height:"15rem", width:"15rem"}}/>
                        </div>
                        <div className="card-body">
                            <div className={hasError("ImageFile")}>
                                <input type="file" accept="image/*" className="form-control-file" 
                                onChange={showPreview} id="image-uploader" ref={register} name="Imagefile" />
                                <label className="error">{errors.ImageFile?.message}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        )
}


const mapStateToProps = state => ({
    obj : state.Immobilier.obj
})

const mapActionToProps = {
    create : actions.create,
    update : actions.update,
    fetchById : actions.fetchById,
    reset: actions.reset
}

export default connect(mapStateToProps, mapActionToProps)(FormImmobilier);
