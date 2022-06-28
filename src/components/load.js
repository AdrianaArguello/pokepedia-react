import Spinner from 'react-bootstrap/Spinner';
import '../styles/about.css';

export default function Load() {
    return(
        <div className="load">
            <Spinner className="spinner" animation="grow" variant="danger"/>
        </div>
    );
}

