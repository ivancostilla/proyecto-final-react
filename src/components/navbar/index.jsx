import "./style.css";
import CartWidget from "../CartWidget";

const NavBar = ()=> {
return (
    <nav className='navbar'>
        <ul className='ul'>
            <li><a className='a' href="#home">Tienda App</a></li>
            <li><a className='a' href="#contact">Contáctanos</a></li>
            <li className="products">
                <button className='a'>Productos</button>
                <ul className=' dropdown products-ul'>
                    <li><a className="a" href="#remera">Remeras</a></li>
                    <li><a className="a" href="#pantalon">Pantalones</a></li>
                    <li><a className="a" href="#zaptillas">Zapatillas</a></li>
                </ul>
            </li>
            <CartWidget/>
        </ul>
    </nav>
);
};
export default NavBar;