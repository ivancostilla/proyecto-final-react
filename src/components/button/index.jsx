import './style.css';

const ButtonComponent = ({text}) =>{
    const Saludar = ()=>{
alert("hola desde el boton");
    }
    return (
        <div>
            <button onClick={Saludar}>{text}</button>
        </div>

        )
}
export default ButtonComponent;