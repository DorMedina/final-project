import NavBar from '../components/NavBar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import FavProducts from '../components/FavProducts';
import styled from 'styled-components';

const Container = styled.div``;

const Title = styled.h1`
  text-align: center;
`;

const Favorites = () => {
  return (
    <Container>
      <NavBar />
      <Announcement />
      <Title>Favorites</Title>
      <FavProducts />
      <Footer />
    </Container>
  );
};

export default Favorites;
