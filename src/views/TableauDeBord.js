import React, { useEffect, useState } from 'react'
import * as actions from '../../src/actions/dEntityTableauDeBord';
import { connect } from 'react-redux';


const TableauDeBord = (props) => {

    const listItem = 
    [
        {
            IconeClass: "icon-big text-center icon-primary",
            Icone : "fal fa-mail-bulk",
            TextColor: "text-primary",
            Iconcolor: "#0062cc",
            TitleIcon : "Courriers arrivés",
            Chiffre : props.objData?.a_data,
            ClassBtn: "btn btn-primary btn-wd btn-block",
            path : "/courrier/list-courrier-arrive"
            
        },
        {
            IconeClass: "icon-big text-center icon-success",
            Icone : "fal fa-mail-bulk",
            TextColor: "text-success",
            Iconcolor: "#78b414",
            TitleIcon : "Courriers imputés",
            Chiffre : props.objData?.b_data,
            ClassBtn: "btn btn-success btn-wd btn-block",
            path : "/courrier/list-courrier-impute"
        }       
        , 
        {
            IconeClass: "icon-big text-center icon-warning",
            Icone : "fal fa-hand-pointer",
            TextColor: "text-danger",
            Iconcolor: "#fa1825",
            TitleIcon : "courriers non imputés",
            Chiffre : props.objData?.c_data,
            ClassBtn: "btn btn-danger btn-wd btn-block",
            path : "/courrier/list-courrier-a-imputer"
        },
        {
            IconeClass: "icon-big text-center icon-success",
            Icone : "fal fa-envelope",
            TextColor: "text-linkedin",
            Iconcolor: "#0976b4",
            TitleIcon : "Courriers traités",
            Chiffre : props.objData?.d_data,
            ClassBtn: "btn btn-linkedin btn-wd btn-block",
            path : "/courrier/list-courrier-traite"
        }       
        ,
        {
            IconeClass: "icon-big text-center icon-warning",
            Icone : "fal fa-exclamation-triangle",
            TextColor: "text-warning",
            Iconcolor: "#FFA534",
            TitleIcon : "Courriers non traités",
            Chiffre : props.objData?.e_data,
            ClassBtn: "btn btn-warning btn-wd btn-block",
            path : "/courrier/list-courrier-non-traite"
        }
        ,
        {
            IconeClass: "icon-big text-center icon-danger",
            Icone : "fal fa-alarm-clock",
            TextColor: "text-google",
            Iconcolor: "#c23321",
            TitleIcon : "Courriers retards",
            Chiffre : props.objData?.f_data,
            ClassBtn: "btn btn-google btn-wd btn-block",
            path : "/courrier/list-courrier-retard"
        }
        ,
        {
            IconeClass: "icon-big text-center icon-tumblr",
            Icone : "fal fa-envelope-open-text",
            TextColor: "text-tumblr",
            Iconcolor: "#222d3c",
            TitleIcon : "Courriers départs",
            Chiffre : props.objData?.g_data,
            ClassBtn: "btn btn-tumblr btn-wd btn-block",
            path : "/courrier/list-courrier-depart"
        }
        ,
        {
            IconeClass: "icon-big text-center icon-facebook",
            Icone : "fal fa-clipboard-list-check",
            TextColor: "text-facebook",
            Iconcolor: "#2d4373",
            TitleIcon : "Workflow document",
            Chiffre : props.objData?.h_data,
            ClassBtn: "btn btn-facebook btn-wd btn-block",
            path : "/list-contrat"
        }
       ,
        {
            IconeClass: "icon-big text-center icon-twitter",
            Icone : "fal fa-calendar-check",
            TextColor: "text-twitter",
            Iconcolor: "#55acee",
            TitleIcon : "Rendez-vous",
            Chiffre : props.objData?.i_data,
            ClassBtn: "btn btn-twitter btn-wd btn-block",
            path : "/courrier/list-courrier-rendez-vous"
        }

    ]

    const [isGet, setIsGet] = useState(false)

    useEffect(()=>{

        // if(isGet === false){
        //     props.getDataDashboard('GetDataDashboard')
        //     setIsGet(true);
        // }

    },[])   

    return (
        <div className="content">
            <div className="container-fluid">    
             
            </div>

        </div>
    )
}

const mapStateToProps = state => ({
    objData: state.dataDashboard.obj,
})

const mapActionToProps = {
    getDataDashboard : actions.fetchData
}

export default connect(mapStateToProps, mapActionToProps)(TableauDeBord);
