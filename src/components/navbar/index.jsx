import "./style.css";

const NavBar = ()=> {
return (
    <nav className={'navbar'}>
        <ul className={'ul'}>
            <li><a className={'a'} href="#">Tienda App</a></li>
            <li><a className={'a'} href="#">Contact Us</a></li>
            <li><a className={'a'} href="#">Services</a></li>
            <li><a className={'a'} href="#">About Us</a></li>
        </ul>
    </nav>
);
};
export default NavBar;