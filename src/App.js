import './App.css';
import NavBar from './components/navbar';
import ButtonComponent from './components/button';

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