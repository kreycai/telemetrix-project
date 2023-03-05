import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Categoria from "./pages/Categoria";
import Header from "./components/Header";
import CategoriaCreUpd from './pages/CategoriaCreUpd';
import Produto from "./pages/Produto";
import ProdutoCreUpd from './pages/ProdutoCreUpd';


function RoutesApp() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={ <Home/> } />

        <Route path="/categorias" element={ <Categoria/> } />
        <Route path="/categoria/create" element={ <CategoriaCreUpd info={'create'} /> } />
        <Route path="/categoria/update/:id" element={ <CategoriaCreUpd info={'update'} /> } />

        <Route path="/categoria/:id/produtos" element={ <Produto/> } />
        <Route path="/produto/create" element={ <ProdutoCreUpd info={'create'} /> } />
        <Route path="/produto/update/:id" element={ <ProdutoCreUpd info={'update'} /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
