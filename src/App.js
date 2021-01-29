import './App.css';
import NavBar from './components/NavBar';
import ButtonComponent from './components/Button';

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
                        <ButtonComponent text={`Hola desde el boton`} />
                       </article>
                    </section>
                </main>
                <footer>

                </footer>
        </>
    )
}

export default App;