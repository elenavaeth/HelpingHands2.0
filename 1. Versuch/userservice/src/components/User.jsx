import db from './firebase.config';
import './User.css';

import React,{useState,useEffect} from 'react';

const User = () => {
    const [users, setUsers] = useState([])

  
      const fetchUsers=async()=>{
          const response=db.collection('user');
          const data=await response.get();
          data.docs.forEach(item=>{
              setUsers([...users,item.data()])
          })
      }

      useEffect(() => {
        fetchUsers();
    }, [])


    return (

        <div className="App">
            {
                users && users.map(user=>{
                    return(
                        
                        <div>
                 
                            <h5>Name: {user.name} {user.lastname}</h5>
                            <h5>Adresse: {user.street} {user.number}, {user.plz} {user.city}</h5>
                            <h5>E-Mail: {user.email}</h5>                   
                            <h5>Username: {user.username}</h5>
                            
                        </div>
                    )
                })
            
            }
        </div>
    )
}


    
export default User;