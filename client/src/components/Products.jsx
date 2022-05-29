import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Product from './Product';
import axios from 'axios';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = () => {
  const [productsArr, setProductsArr] = useState([]);

  useEffect(() => {
    axios
      .get('/products')
      .then((res) => {
        setProductsArr(res.data);
      })
      .catch((err) => {
        console.error('error from server', err);
        alert(err);
        localStorage.clear();
      });
  }, []);

  return (
    <Container>
      {productsArr.map((item) => (
        <Product item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default Products;
