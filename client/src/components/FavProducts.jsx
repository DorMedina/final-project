import styled from 'styled-components';
import { useState, useEffect } from 'react';
import FavProduct from './FavProduct';
import axios from 'axios';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FavProducts = () => {
  const [productsArr, setProductsArr] = useState([]);

  useEffect(() => {
    axios
      .get('/favorites/userfav')
      .then((res) => {
        setProductsArr(res.data);
      })
      .catch((err) => {
        console.error('error from server', err.response.data);
      });
  }, []);

  const handleDeleteFav = (id) => {
    let newProductsArr = productsArr.filter((item) => item._id !== id);
    setProductsArr(newProductsArr);
  };
  return (
    <Container>
      {productsArr.map((item) => (
        <FavProduct item={item} key={item._id} onDeleteFav={handleDeleteFav} />
      ))}
    </Container>
  );
};

export default FavProducts;
