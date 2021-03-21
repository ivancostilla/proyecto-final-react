import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProductNav from "./components/ProductNav";
import Checkout from "./components/Checkout";
import CartContainer from "./layout/CartContainer";
import ItemListContainer from "./layout/ItemListContainer";
import ItemDetailContainer from "./layout/ItemDetailContainer";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import NotFound from "./components/NotFound";
import Admin from "./components/Admin";
import AddItemsAdmin from "./components/AddItemsAdmin";
import AdminOrders from "./components/AdminOrders";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import SignUp from "./components/SignUp";
import PerfilUsuario from "./components/PerfilUsuario";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
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
    <AuthProvider>
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
                <PrivateRoute exact path="/administrador" component={Admin}/>
                <Route exact path="/agregarProductoNuevo">
                  <AddItemsAdmin/>
                </Route>
                <Route exact path="/ordenesDeCompras">
                  <AdminOrders/>
                </Route>
                <Route exact path="/registrarse">
                  <SignUp/>
                </Route>
                <Route exact path="/ingresar">
                  <Login/>
                </Route>
                <PrivateRoute exact path="/PerfilUsuario" component={PerfilUsuario}/>
                <Route exact path="/ReestablecerContraseña" component={ForgotPassword}/>
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
    </AuthProvider>
  );
};

export default App;
