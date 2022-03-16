import { useEffect,useState } from "react"
import {Button} from "react-bootstrap"
import axios from "axios"
import {Link} from "react-router-dom"
import { AppContext } from "../Appcontextprovider/Appcontext"
import { useContext } from "react"
export default function Home(){
    const {name,setnamel} = useContext(AppContext)
    const [rest,setRest] = useState([]);
    useEffect(()=>{
        getRest()
        return;
    },[])


    async function getRest(){
        let data = await axios.get("http://localhost:3000/restaurents")
        setRest(data.data)
    }


    async function handleChange(e){
        console.log(e.target.value)
    }
    return(
        <div style={{"textAlign":"center"}}>
            <p style={{"fontWeight":"100",fontSize:"60px"}}>Restaurents</p>
            <div style={{display:"flex",flexDirection:"row",width:"80%",margin:"auto",alignItems:"center",justifyContent:"space-evenly",marginTop:"50px"}}>
                <div style={{width:"25%"}}>
                    <input  style={{width:"100%",border:"2px solid black",borderRadius:"1px",color:"black"}} placeholder="Name" onChange={handleChange}></input>
                </div>
                <div style={{width:"25%"}}>
                    <input style={{width:"100%",border:"2px solid black",borderRadius:"1px"}} placeholder="location" onChange={handleChange}></input>
                </div>
                <div style={{width:"25%"}}>
                <select style={{height:"30px",width:"100%", border:"2px solid black",borderRadius:"1px"}} onChange={handleChange}>
                <option value="0">Zero</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="2">⭐⭐</option>
                <option value="1">⭐</option>
          </select>
                </div>
                <Button>Add</Button>
            </div>
            <div>
                {rest?<div style={{margin:"auto",width:"100%",display:"flex",flexDirection:"column", marginTop:"60px"}}>
                <div style={{display:"flex",flexDirection:"row",margin:"auto",width:"80%",height:"40px",backgroundColor:"green",paddingTop:"0.5%"}}>
                    <div style={{fontWeight:"500", color:"white", fontSize:"16px",marginLeft:"11%"}}>Name</div>
                    <div style={{fontWeight:"500", color:"white", fontSize:"16px",marginLeft:"20%"}}>Location</div>
                    <div style={{fontWeight:"500", color:"white", fontSize:"16px",marginLeft:"15%"}}>Price Range</div>
                    <div style={{fontWeight:"500", color:"white", fontSize:"16px",marginLeft:"10%"}}>Ratings</div>
                    <div style={{fontWeight:"500", color:"white", fontSize:"16px",marginLeft:"10%"}}>Update</div>
                    <div style={{fontWeight:"500", color:"white", fontSize:"16px",marginLeft:"4%"}}>Delete</div>
                    
                </div>
                    {rest.map((e)=>{
                        return(
                            <div style={{display:"flex",flexDirection:"row", margin:"auto",width:"80%",justifyContent:"space-evenly",alignItems:"center",backgroundColor:"lightblue",paddingTop:"1%",marginTop:"10px"}}>
                            <div style={{width:"23%",textAlign:"left",paddingLeft:"10%"}}>
                            <p style={{fontSize:"20px"}}>{e.name}</p>
                            </div>
                            <div style={{width:"23%", textAlign:"left",paddingLeft:"10%"}}>
                            <p style={{fontSize:"20px"}}>{e.locations}</p>
                            </div>
                            <div style={{width:"13%",textAlign:"left",paddingLeft:"10%"}}>
                            <p style={{fontSize:"20px"}}>{e.price_range}</p>
                            </div>
                            <div style={{width:"23%",textAlign:"left",paddingLeft:"10%"}}>
                            <p style={{fontSize:"20px"}}>Ratings</p>
                            </div>
                            <Button style={{width:"7%",marginTop:"-1%"}}><Link style={{color:"white",textDecoration:"none"}} to={`/update/${e.id}`}>Update</Link></Button>
                            <Button style={{width:"7%",marginTop:"-1%"}} variant="danger" id={e.id} onClick={()=>{alert(e.id)}}>Delete</Button>
                            </div>
                        )
                    })}
                </div>:<h1>No Details</h1>}
            </div>
        </div>
    )
}