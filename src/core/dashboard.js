
var mobile_menu_visible = 0,
    mobile_menu_initialized = false,
    toggle_initialized = false,
    sidebar, image_src,sidebar_container, sidebar_wrapper, navbar,
    isWindows, nav_content, toggle, main_panel_height, layer;

const lbd = {
    misc: {
        navbar_menu_visible: 0
    }
}

// export const checkSidebarImage = () => {
//     sidebar = document.querySelector('.sidebar');
//     image_src = sidebar.getAttribute('data-image');
//     // console.log(image_src);
//     if (image_src !== undefined) {
//         // sidebar_container = '<div class="sidebar-background" style="background-image: url(' + image_src + ') "/>'
//         sidebar_container = document.createElement('div');
//         sidebar_container.className = 'sidebar-background';
//         sidebar_container.style.backgroundImage = 'url(' + image_src + ')';
//         // console.log(sidebar_container);  
//         sidebar.appendChild(sidebar_container);
//     } else if (mobile_menu_initialized == true) {
//         // reset all the additions that we made for the sidebar wrapper only if the screen is bigger than 991px
//         let nav_mobile_menu = Array.from(document.querySelector('.sidebar-wrapper').children[2].children)
//         .filter(x => x.classList.contains("nav-mobile-menu"));
//         let navbar_form = Array.from(nav_mobile_menu[0].children).filter(x => x.classList.contains("navbar-form"));
//         navbar_form[0].remove();
//         nav_mobile_menu[0].remove();

//         mobile_menu_initialized = false;
//     }
// }

export const initRightMenu = () => {
    sidebar_wrapper = document.querySelectorAll('.sidebar-wrapper');
    
    if (!mobile_menu_initialized) {

        let nav = document.querySelector('nav');
        navbar = Array.from(nav.children[0].children)
        .filter(x => x.classList.contains("navbar-collapse"));

        let content = '';

        Array.from(navbar[0].cloneNode(true).children).forEach(x => { 
            content += x.innerHTML;
        });
        
        // let sidebar_nav = Array.from(document.querySelector('.sidebar-wrapper').children)
        // .filter(x => x.classList.contains("nav"));
        
        // let sidebar_nav = Array.from(document.querySelector('.sidebar-wrapper').children[0].children[0].children)
        // .filter(x => x.classList.contains("nav"));

        //insert the navbar form before the sidebar list

        // nav_content = document.createElement('ul');
        // nav_content.className = "nav nav-mobile-menu";
        // nav_content.innerHTML = content;
        // console.log(sidebar_nav);
        // sidebar_nav[0].parentElement.insertBefore(nav_content,sidebar_nav[0])
                    
        // document.querySelector('.sidebar-wrapper .dropdown .dropdown-menu > div')
        // .addEventListener('click',(e) =>{
        //         e.stopPropagation();
        // });

        mobile_menu_initialized = true;
    } else {
        // console.log('window with BASSIT:' + window.innerWidth);
        
        if (window.innerWidth > 991) {
            // reset all the additions that we made for the sidebar wrapper only if the screen is bigger than 991px
            // let sidebar_wrapper = document.querySelector('.sidebar-wrapper').children;
            let nav_mobile_menu = Array.from(document.querySelector('.sidebar-wrapper').children[2].children).filter(x => x.classList.contains("nav-mobile-menu"));
            let navbar_form = Array.from(nav_mobile_menu[0].children).filter(x => x.classList.contains("navbar-form"));
            navbar_form[0].remove();
            nav_mobile_menu[0].remove();  

            mobile_menu_initialized = false;
        }
    }

    if (!toggle_initialized) {
        toggle = document.querySelector('.navbar-toggler');

        toggle.addEventListener('click', ()=> {

            if (mobile_menu_visible == 1) {
                document.querySelector('html').classList.remove('nav-open')

                document.querySelector('.close-layer').classList.remove();
                setTimeout(function() {
                    toggle.classList.remove('toggled');
                }, 400);

                mobile_menu_visible = 0;
            } else {
                setTimeout(function() {
                    toggle.classList.add('toggled');
                }, 430); 

                main_panel_height = document.querySelector('.main-panel').scrollHeight;
                layer = document.createElement('div');
                layer.className = "close-layer";
                layer.style.height = main_panel_height+'px';
                document.querySelector('.main-panel').append(layer);
                
                setTimeout(function() {
                    layer.classList.add('visible');
                }, 100);

                layer.addEventListener('click',function() {
                    document.querySelector('html').classList.remove('nav-open');
                    mobile_menu_visible = 0;
                    layer.classList.remove('visible');

                    setTimeout(function() {
                        layer.remove();
                        toggle.classList.remove('toggled');

                    }, 400);
                });

                document.querySelector('html').classList.add('nav-open');
                mobile_menu_visible = 1;

            }
        });

        toggle_initialized = true;
    }
}

export const initMinimizeSidebar = () => {
    
    let inBsCollapse = document.createElement('div');
    inBsCollapse.className = 'in.bs.collapse'
    document.querySelector('.sidebar .collapse ')
    .addEventListener('click',()=>{
        if (window.innerWidth > 991) {
            if (lbd.misc.sidebar_mini_active == true) {
                return false;
            } else {
                return true;
            }
        }
    })
    
    // document.querySelector('#minimizeSidebar').addEventListener('click',function() {
        
    //     if (lbd.misc.sidebar_mini_active == true) {
      
    //         document.querySelector('body').classList.remove('sidebar-mini');
    //         lbd.misc.sidebar_mini_active = false;

    //         if (isWindows) {
    //             document.querySelector('.sidebar .sidebar-wrapper').perfectScrollbar();
    //         }

    //     } else {
                            
    //         if (isWindows) {
    //             document.querySelector('.sidebar .sidebar-wrapper').perfectScrollbar('destroy');
    //         }
            
    //         setTimeout(function() {
    //             document.querySelector('body').classList.add('sidebar-mini');
    //             document.querySelector('.sidebar .collapse').style.height ='auto';
    //             lbd.misc.sidebar_mini_active = true;
    //         }, 300);
    //     }

    //     // we simulate the window Resize so the charts will get updated in realtime.
    //     var simulateWindowResize = setInterval(function() {
    //         window.dispatchEvent(new Event('resize'));
    //     }, 180);

    //     // we stop the simulation of Window Resize after the animations are completed
    //     setTimeout(function() {
    //         clearInterval(simulateWindowResize);
    //     }, 1000);
    // });
}