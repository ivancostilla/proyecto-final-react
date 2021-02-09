import './App.css';
import  {BrowserRouter, Switch, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
// import ButtonComponent from './components/Button';
import ItemListContainer from "./layout/ItemListContainer";
import ItemDetailContainer from "./layout/ItemDetailContainer";

//parametro es un valor que se le pasa a una funcion
//un callback es una funcion que se ejecuta cuando algo pasó,
//es un evento que ejecuta el componente y le evuelve el valor al padre

//componentes de presentacion: generalmente son elementos como botones o inputs
//que no tienen una funcionalidad ligca, no matan componentes, etc, por ej: ButtonComponent

/* componentes contenedores: son contrarios a los depresentacion, contienen la logica de la web
y contienen a muchos contenedores hijos, que son de presentacion */


//consultas a base dde datos siempre van adentro de useEffect, con async await y promesas

//las kys s usan solo uanousamos .mapn los componentes

const App = ()=>{
    return (
        <BrowserRouter>
        <header>
                <NavBar/>
        </header>
        <main>
            <section>
                <article>
                    <Switch>
                        <Route exact path='/'>
                            <ItemListContainer/>
                        </Route>
                        <Route exact path='/itemdetail'>
                            <ItemDetailContainer/>
                        </Route>
                        {/* <Route exact path='/boton'>
                            <h1>Titulo</h1>
                            <ButtonComponent text={`Click aqui`}>
                            <div>Hola</div>
                            </ButtonComponent>
                        </Route> */}
                    {/* para error 404: */}
                        <Route path="*" children={<div>Not found</div>}>
                            </Route>
                    </Switch>
                        <ItemDetailContainer/>
                </article>
            </section>
        </main>
        <footer>
        </footer>
        </BrowserRouter>
    )
}

export default App;