import {useState} from "react"
import styles from "./styles/update.module.css"
import { Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import axios from "axios"
export default function Update(){
    const {id} = useParams()
    console.log(id)
    const [state,setState] = useState({
        name:"",
        location:"",
        price:""
    })

    function handleChange(e){
        const {name,value} = e.target
        setState({...state,[name]:value})
    }

    async function handleAdd(){
        let resp = await axios.post("http://localhost:3000/restaurents",state)
        console.log(resp)
        if(resp.status!=201){
            alert(resp.data.reason)
        }
    }
    return(
        <div style={{"textAlign":"center","fontWeight":"100"}}>
        <div style={{display:"flex",flexDirection:"column",width:"60%",margin:"auto",marginTop:"50px"}}>
            <label style={{textAlign:"left",fontSize:"25px",fontWeight:"200"}}>Name</label>
            <input className={styles.input} value={state.name} name="name" placeholder="Name" onChange={handleChange}></input>
            <br/>
            <label style={{textAlign:"left",fontSize:"25px",fontWeight:"200"}}>Location</label>
            <input className={styles.input} value={state.location} name="location" placeholder="Location" onChange={handleChange}></input>
            <br/>
            <label style={{textAlign:"left",fontSize:"25px",fontWeight:"200"}}>Price Range</label>
            <input className={styles.input} value={state.price} name="price" placeholder="Price Range" onChange={handleChange}></input>
        </div>
        <br/>
        <Button className={styles.updateButton} onClick={handleAdd}>Submit</Button>
        </div>
    )
}