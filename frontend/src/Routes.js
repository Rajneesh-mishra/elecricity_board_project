import {Route, Routes as AppRotes } from "react-router-dom";
import { Connections } from "./pages/connections";
import { Home } from "./pages/home";


const Routes = ()=>{
    return (
        <AppRotes>
        <Route  path="/connections" element={<Connections/>} />
        <Route  path="/" element={<Home/>} />
      </AppRotes>
    )
}

export default Routes