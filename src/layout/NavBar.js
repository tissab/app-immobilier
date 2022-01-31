import axios from 'axios';

import React from 'react'


const NavBar = () => {
   
   
    const minimizeSidebar = () => {
        if(document.querySelector('body').classList.contains('sidebar-mini') === false){
             document.querySelector('body').classList.add('sidebar-mini');
        }else{
             document.querySelector('body').classList.remove('sidebar-mini');
        }
    }

    const mobileSidebarToggle = () =>{
       
        var toggle = document.querySelector('.navbar-toggler');

        if (document.querySelector('html').classList.contains('nav-open') === true) {
            document.querySelector('html').classList.remove('nav-open')
           if(document.querySelector('.close-layer') !== null){
               document.querySelector('.close-layer').classList.remove();
           }

        } else {

            document.querySelector('html').classList.add('nav-open');
            var main_panel_height = document.querySelector('.main-panel').scrollHeight;
            var layer = document.createElement('div');
            layer.className = "close-layer";
            layer.style.height = main_panel_height+'px';
            document.querySelector('.main-panel').append(layer);
            
            setTimeout(function() {
                layer.classList.add('visible');
            }, 100);

            layer.addEventListener('click',function() {
                document.querySelector('html').classList.remove('nav-open');
                layer.classList.remove('visible');
                setTimeout(function() {
                    layer.remove();
                    toggle.classList.remove('toggled');
                }, 400);
            });
        }
    }

    

 
   
    return (
        <nav className="navbar navbar-expand-lg navbar-fixed" >
            <div className="container-fluid">
                <div className="navbar-wrapper">
                    <div className="navbar-minimize">
                        <button onClick={minimizeSidebar} className="btn btn-danger btn-fill btn-round btn-icon d-none d-lg-block">
                            <i className="fa fa-ellipsis-v visible-on-sidebar-regular"></i>
                            <i className="fa fa-bars visible-on-sidebar-mini"></i>
                        </button>
                    </div>
                    <a className="navbar-brand" href="#" style={{fontWeight: "bold",color:"#212529"}}> SYSTEME DE GESTION IMMOBILIER</a>
                </div>
                <button  className="navbar-toggler navbar-toggler-right" onClick={mobileSidebarToggle}
                        type="button" 
                        data-toggle="collapse" 
                        aria-controls="navigation-index" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-bar burger-lines"></span>
                    <span className="navbar-toggler-bar burger-lines"></span>
                    <span className="navbar-toggler-bar burger-lines"></span>
                </button>                        
            </div> 
        </nav>
    )
}

export default NavBar
