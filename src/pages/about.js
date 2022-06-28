import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { getPokemonDetail, gender } from '../api/request';
import genderMale from '../assets/male.png';
import genderFemale from '../assets/female.png';
import genderlessImg from '../assets/genderless.png'
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import '../styles/about.css'
import { Container } from "react-bootstrap";
import Footer from "../components/footer";
import Load from "../components/load";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function About() {
    const {id} = useParams();

    const [pokemonData, setPokemonData] = useState([]);
    const [male, setMale] = useState([]);
    const [female, setFemale] = useState([]);
    const [genderless, setGenderless] = useState([]);
    const [shinyMode, setShinyMode ] = useState(false);
    const [loading, SetLoading] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect( () => {
        getPokemonIndData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const getPokemonIndData = async () => {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
        const response = await getPokemonDetail(url);
        setPokemonData(response.data)
        SetLoading(false);
    };

    useEffect( () => {
        getPokemonFemale();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const getPokemonFemale = async () => {
        const idfemale = 1;
        const response = await gender(idfemale);
        setFemale(response.data.pokemon_species_details);
    };

    useEffect( () => {
        getPokemonMale();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const getPokemonMale = async () => {
        const idmale = 2;
        const response = await gender(idmale);
        setMale(response.data.pokemon_species_details);
    };

    useEffect( () => {
        getPokemonOther();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const getPokemonOther = async () => {
        const idOther = 3;
        const response = await gender(idOther);
        setGenderless(response.data.pokemon_species_details);
    };

    const weight = pokemonData.weight;
    const height = 0.3048;

    const lb = Math.round(( weight / 2.2046 ));
    const mt = Math.round((pokemonData.height * height));

    var tempLoad = '';

    if(loading === true){
        tempLoad = <Load/>
    }

    return (
        <div>
            <Header/>
            <Container>
            {tempLoad}
                <Card>
                    <div className="left">
                        <Card.Img variant="top" className="pokemon-img" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`} />
                        <Card.Title>{pokemonData.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">#{pokemonData.order}</Card.Subtitle>
                        <div>
                            {(pokemonData.types !== undefined) ? pokemonData.types.map((tipos, i) =>
                                <Badge key={i} bg="primary" >{tipos.type.name}</Badge>
                            ) : ""}
                        </div>
                        <div>
                            {(male.length !== 0) ? male.filter(maleTemp => maleTemp.pokemon_species.name === pokemonData.name).map( maleTemp => (
                                <img key={maleTemp} className="gender" src={genderMale} alt={maleTemp.pokemon_species.name}/>
                            )): ""}

                            {(female.length !== 0) ? female.filter(femaleTemp => femaleTemp.pokemon_species.name === pokemonData.name).map( femaleTemp => (
                                <img key={femaleTemp} className="gender" src={genderFemale} alt={femaleTemp.pokemon_species.name}/>
                            )): ""}

                            {(genderless.length !== 0) ? genderless.filter(genderlessTemp => genderlessTemp.pokemon_species.name === pokemonData.name).map( genderlessTemp => (
                                <img key={genderlessTemp} className="gender" src={genderlessImg} alt={genderlessTemp.pokemon_species.name}/>
                            )): ""}
                        </div>
                        <ul>
                            <li>Peso: {lb.toString()}Kg</li>
                            <li>Altura: {mt.toString()}M</li>
                        </ul>

                        <button className="button-custom" onClick={handleShow}>
                            Ver Movimientos
                        </button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Movimientos</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {(pokemonData.stats !== undefined) ? pokemonData.moves.map((moves, movesid) =>
                                    <ul key={movesid}><li>{moves.move.name}</li></ul>
                                ) : ' '}
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            </Modal.Footer>
                        </Modal>
                        <Link to={`/`}><button className="firts-button">Volver</button></Link>
                    </div>
                    <div className="right">
                        <div>
                            <h3>Estadística de poder</h3>
                            {(pokemonData.stats !== undefined) ? pokemonData.stats.map((base, index) =>
                            <div key={index}>
                                <h3 className="text">{base.stat.name}</h3>
                                <ProgressBar animated striped variant="primary" now={base.base_stat} />
                            </div>
                            ) : ""}
                        </div>

                        <Table responsive="sm">
                            <thead>
                                <tr>
                                    <th>Habilidades</th>
                                </tr>
                            </thead>
                            <tbody>{(pokemonData.stats !== undefined) ? pokemonData.abilities.map((nameAb,id) =>
                            <tr key={id}><td>{nameAb.ability.name}</td></tr>
                            ) : null}</tbody>
                        </Table>

                        {(pokemonData.sprites !== undefined && pokemonData.sprites.front_female !== null) ?
                            <Card.Img className="image-pokemon" src={shinyMode ? pokemonData.sprites.front_shiny : pokemonData.sprites.front_female} />
                        : ' '}

                        {(pokemonData.sprites !== undefined && pokemonData.sprites.front_default !== null) ?
                            <Card.Img className="image-pokemon" src={shinyMode ? pokemonData.sprites.front_shiny : pokemonData.sprites.front_default} />
                        : ' '}

                        <button className="firts-button" onClick={() => setShinyMode(prevMode => !prevMode)}>Ver Shiny</button>
                    </div>
                </Card>
            </Container>
            <Footer/>
        </div>
    );
}

export default About;