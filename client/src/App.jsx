import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./pages/Navbar";
import Products from "./pages/products";
import Home from "./pages/Home";
import Pagination from "./pages/pagination";
import Gallery from "./pages/Gallery";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Form from "./practice/form";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      {/* <Products/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/pagination" element={<Pagination />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/signUp"   element={<Signup/>}/>
        <Route path="/login"  element={<Login/>}/>
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import ProductCard from './practice/card'
// import SampleTable from "./practice/table";
// import Btn from './practice/practice'

{
  /* <Btn/> */
}
{
  /* <ProductCard  title="Luxury Watch"
        imageUrl="https://images.pexels.com/photos/3766111/pexels-photo-3766111.jpeg?cs=srgb&dl=pexels-alex-azabache-3766111.jpg&fm=jpg"
        description="Watches are more than just timekeeping devices. They are symbols of history, culture, innovation, and art."
        price={25000}/> */
}
{
  /* 
        <SampleTable/> */
}
