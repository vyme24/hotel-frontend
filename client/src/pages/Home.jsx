import { Link } from "react-router-dom"
import Header from "../components/Header";
import Video from "../pages/Video";
import Footer from "../components/Footer";
import Facilities from "./Facilities"
import Information from "../pages/Information";
import Room from "../pages/Room";
import Room2 from "../pages/Room2";



const Home =()=>{
    return(
        <>
        <Header />
       
   <Video/>
   
   <Room/>
    <Room2/>
    
<Information/>
< Facilities/>


        <Footer/>
        </>
    )
}
export default Home;