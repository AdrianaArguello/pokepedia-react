import '../styles/App.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import icon from '../assets/gaming.png'

export default function Header(){
    return(
        <>
        <Navbar className="Navbar">
            <Container>
                <Navbar.Brand href="/">
                    <img src={icon} alt="icon" className="icon"/>
                </Navbar.Brand>
            </Container>
        </Navbar>
        </>
    );
}
