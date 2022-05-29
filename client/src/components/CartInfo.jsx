import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { Add, Remove } from '@material-ui/icons';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: '5px 15px' })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: '20px' })}
`;

const CartInfo = ({ item }) => {
  // const [quantity, setQuantity] = useState(item.quantity);

  return (
    <Container>
      <ProductDetail>
        <Image src={item.img} />
        <Details>
          <ProductName>
            <b>Product:</b> {item.title}
          </ProductName>
          <ProductId>
            <b>ID:</b> {item._id}
          </ProductId>
          <ProductColor color={item.color} />
          <ProductSize>
            <b>Size:</b> {item.size}
          </ProductSize>
        </Details>
      </ProductDetail>
      <PriceDetail>
        <ProductAmountContainer>
          <Add />
          <ProductAmount>{item.amount}</ProductAmount>
          <Remove />
        </ProductAmountContainer>
        <ProductPrice>${item.price}</ProductPrice>
      </PriceDetail>
    </Container>
  );
};

export default CartInfo;
