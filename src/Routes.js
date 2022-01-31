import FormImmobilier from './views/FormImmobilier';
import ListImmobilier from './views/ListImmobilier';


const dashboardRoutes = 
[
    {
        path: "/",
        component : ListImmobilier
    },
    {
        path: "/immobilier/:id",
        component : FormImmobilier
    },
    {
        path: "/immobilier",
        component : FormImmobilier
    }
]

export default dashboardRoutes