import { useEffect} from "react"


const ModalModel = ({showModal,children}) =>{

  // const[backdrop, setBackdrop] = useState(false);

    useEffect(()=>{
        if(showModal === true){
          document.body.classList.add('modal-open');
          document.body.style.paddingRight = "17px";

            let x = document.createElement('div');
            x.classList.add('modal-backdrop','fade','show')
            document.body.append(x);
        }   
    },[showModal]) 

    return(
        showModal && (
        <div id="exampleModalCenter" className="modal fade show"   style={{display: "block", paddingRight: "17px"}}>
            {children}
        </div>
        )
    )
}

export default ModalModel