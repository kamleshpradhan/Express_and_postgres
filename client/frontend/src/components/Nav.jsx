import {Link} from "react-router-dom"
export default function Nav(){
    return(
            <div style={{"width":"100%","display":"flex","flexDirection":"row","height":"40px","backgroundColor":"skyblue"}}>
            <div style={{width:"60%"}}>
                <p style={{marginLeft:"10%",marginTop:"0.5%",fontSize:"20px",fontWeight:"700"}}>Logo Space</p>
            </div>
            <div style={{width:"40%","height":"100%",float:"right",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
            <Link style={{textDecoration:"none", color:"white", fontWeight:"100"}} to="/">Home</Link>
            <Link style={{textDecoration:"none", color:"white", fontWeight:"100"}} to="/update">Update</Link>
            <Link style={{textDecoration:"none", color:"white", fontWeight:"100"}} to="/details">Details</Link>
            </div>
            </div>
    )
}