import React, {useEffect} from 'react';
import Footer from './layout/Footer';
import NavBar from './layout/NavBar';
import {store} from './actions/store';
import {Provider} from 'react-redux';
import { Route, Switch} from 'react-router-dom';
import NotFound from './views/NotFound';
import {ToastProvider} from 'react-toast-notifications';
import routes from './Routes.js';


const AppLayout = () => {

    const getRoutes = (routes) => {
      return routes.map((prop, key)=>{
          return(
            <Route
                exact path={prop.path}
                component={prop.component}
                key = {key}
                />
          );
      });
    };
 
   
    useEffect(()=>{
      document.getElementById('root').classList.add('wrapper');     
      var window_width = window.innerWidth;           
      if (window_width > 991) {
          document.querySelector('.main-panel .navbar-fixed').style.removeProperty("width");
      }           
      window.addEventListener('resize',()=> {
          if (window.innerWidth > 991) {                  
              if(document.querySelector('.main-panel .navbar-fixed') !== null){
                  document.querySelector('.main-panel .navbar-fixed').style.removeProperty("width");  
              }
          }
      });            
    },[])
      
  return (  
      <ToastProvider autoDismiss={true}>       
            <div className="sidebar" data-color="red" >
              <div className="sidebar-background" ></div>
            </div>
            <div className="main-panel">
                <Provider store={store}>
                  <NavBar />
                  <div className="content">
                    <div className="container-fluid">
                        <Switch>
                            {getRoutes(routes)}
                            <Route exact path="*" component={NotFound}/>
                        </Switch> 
                    </div>
                  </div>
                </Provider>
                <Footer/>
            </div>
      </ToastProvider>         
  );
}

export default AppLayout;
