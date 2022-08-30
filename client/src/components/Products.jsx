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

const Products = (props) => {
  const [productsArr, setProductsArr] = useState([]);
  const cat = props.category;
  console.log(cat);

  useEffect(() => {
    axios
      .get('/products', { params: { category: cat } })
      .then((res) => {
        setProductsArr(res.data);
      })
      .catch((err) => {
        console.error('error from server', err);
        alert(err);
      });
  }, [cat]);

  return (
    <Container>
      {productsArr.map((item) => (
        <Product item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default Products;
