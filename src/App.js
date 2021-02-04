import './App.css';
import NavBar from './components/NavBar';
import ButtonComponent from './components/Button';
import ItemListContainer from "./layout/ItemListContainer";
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
        <>
                <header>
                <NavBar/>
                </header>
                <main>
                    <section>
                       <article>
                       <h1>Titulo</h1>
                       <ButtonComponent text={`Click aqui`}>
                       <div>Hola</div>
                       </ButtonComponent>
                       <ItemListContainer/>
                       </article>
                    </section>
                </main>
                <footer>
                </footer>
        </>
    )
}

export default App;