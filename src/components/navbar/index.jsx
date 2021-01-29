import "./style.css";

const NavBar = ()=> {
return (
    <nav className='navbar'>
        <ul className='ul'>
            <li><a className='a' href="#">Tienda App</a></li>
            <li><a className='a' href="#">Contáctanos</a></li>
            <li className="products">
                <button className='a'>Productos</button>
                <ul className=' dropdown products-ul'>
                    <li><a className="a" href="#">Remeras</a></li>
                    <li><a className="a" href="#">Pantalones</a></li>
                    <li><a className="a" href="#">Zapatillas</a></li>
                </ul>
            </li>
            <li><a className='a' href="#">Sobre Nosotros</a></li>
        </ul>
    </nav>
);
};
export default NavBar;