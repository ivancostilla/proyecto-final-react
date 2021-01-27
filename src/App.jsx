import './App.css';
import ButtonComponent from './components/button/index';

const App = ()=>{
    return (
        <>
        <h1>Titulo</h1>
        <ButtonComponent text={`Hola desde el boton`} />
        </>
    )
}

export default App;