import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
// import ButtonComponent from './components/Button';
import ProductNav from "./components/ProductNav";
import Checkout from "./components/Checkout";
import CartContainer from "./layout/CartContainer";
import ItemListContainer from "./layout/ItemListContainer";
import ItemDetailContainer from "./layout/ItemDetailContainer";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import NotFound from "./components/NotFound";
import Admin from "./components/Admin";

//parametro es un valor que se le pasa a una funcion
//un callback es una funcion que se ejecuta cuando algo pasó,
//es un evento que ejecuta el componente y le evuelve el valor al padre

//componentes de presentacion: generalmente son elementos como botones o inputs
//que no tienen una funcionalidad logca, no matan componentes, etc, por ej: ButtonComponent

/* componentes contenedores: son contrarios a los depresentacion, contienen la logica de la web
y contienen a muchos contenedores hijos, que son de presentacion */

//consultas a base de datos siempre van adentro de useEffect, con async await y promesas

//las keys se usan solo cuando usamos .map en los componentes

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <main>
          <section>
            <article>
              <Switch>
                <Route exact path="/">
                  <ItemListContainer />
                </Route>
                <Route exact path="/category">
                  <ProductNav />
                  <ItemListContainer />
                </Route>
                <Route exact path="/category/:id">
                  <ProductNav />
                  <ItemListContainer />
                </Route>
                <Route exact path="/item/:id">
                  <ItemDetailContainer />
                </Route>
                <Route exact path="/cart">
                  <CartContainer />
                </Route>
                <Route exact path="/checkout">
                  <Checkout/>
                </Route>
                <Route exact path="/administrador">
                  <Admin/>
                </Route>
                {/*
                        {/* <Route exact path='/boton'>
                            <h1>Titulo</h1>
                            <ButtonComponent text={`Click aqui`}>
                            <div>Hola</div>
                            </ButtonComponent>
                        </Route> */}
                {/* para error 404: */}
                <Route path="*">
                    <NotFound/>
                </Route>
              </Switch>
            </article>
          </section>
        </main>
        <footer>
          <Footer/>
        </footer>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
