import axios from 'axios';

export default{
    dEntityAPI(){
        return{
            fetchAll : (url) => axios.get(url),
            fetchAllById : (url,id) => axios.get(url+id),
            fetchById : (url,id)  => axios.get(url+id),
            create : (url,newRecord) => axios.post(url, newRecord),
            update: (url,id, updateRecord) => axios.put(url+id, updateRecord),
            delete: (url,id) => axios.delete(url+id)
        }
    }
}