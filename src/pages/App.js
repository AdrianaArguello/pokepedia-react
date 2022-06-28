import '../styles/App.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPokemons } from '../api/request';
import Header from '../components/header';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Row , Container } from 'react-bootstrap';
import IconLoad from '../assets/icon.gif';
import Load from '../components/load';
import Footer from '../components/footer';


function App() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, SetLoading] = useState(true);

  useEffect( () => {
    getPokemonData(offset);
  }, [offset]);

  const getPokemonData = async (offset) => {
    const res = await getPokemons(offset);
    if(offset === 0){
      setPokemons(res);
      SetLoading(false);
    }else if(offset > 9){
      setPokemons(prevPokemons => ([...prevPokemons, ...res]));
      SetLoading(false);
    }
  }

  const showMorePokemons = () => {
    setOffset(offset + 10);
    SetLoading(true);
  };

  var tempLoad = '';

  if(loading === true){
    tempLoad = <Load/>
  }


  return (
    <div className='app'>
      <Header/>
      <Container fluid="md">
        {tempLoad}
        <Row xs={1} md={3} lg={4} className="g-4">
          {pokemons.map((pokemon,index) =>
            <Col key={index}>
              <Card style={{ width: '15rem' }}>
                <Link to={`/about/${pokemon.newData.id}`}>
                  <Card.Img className="img-card" variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.newData.id}.png`} />
                  <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">#{pokemon.newData.order}</Card.Subtitle>
                    <Card.Title>{pokemon.name}</Card.Title>
                    { pokemon.newData.types.map((types, i) =>
                      <Badge key={i} style={{backgroundColor:'#009063'}}>{types.type.name}</Badge>
                    )}
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
      <button  className="button" onClick={() => showMorePokemons()}>Mostrar más <img src={IconLoad} alt="icon-load" className="pokeball-icon"></img></button>
      <Footer/>
    </div>
  );
}

export default App;
