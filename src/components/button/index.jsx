import './style.css';

const ButtonComponent = ({text,children}) =>{
    const Saludar = ()=>{
alert("hola desde el boton");
    }
    return (
        <div>
            {children}
            <button onClick={Saludar}>{text}</button>
        </div>

        )
}
export default ButtonComponent;