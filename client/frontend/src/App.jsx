// import { Button } from 'react-bootstrap';
import {Routes,Route} from "react-router-dom"
import Home from "./components/Home"
import Details from "./components/Details"
import Update from "./components/Update"
import Nav from "./components/Nav"
export default function App(){
  return(
    <>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/detail/:id" element={<Details />}></Route>
        <Route path="/update/:id" element={<Update />}></Route>
      </Routes>
    </>
  )
}