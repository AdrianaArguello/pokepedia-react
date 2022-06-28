import error from '../assets/error.png';
import '../styles/about.css'

function NotFoundPage() {
    return (
        <div>
            <h1 className='notfound-text'>Opss... Pagina no encontrada!</h1>
            <img className='notfound' src={error} alt="page-not-found" />
        </div>
    );
}

export default NotFoundPage;