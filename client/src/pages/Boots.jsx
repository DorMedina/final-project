import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Products from '../components/Products';
// import { mobile } from '../responsive';
import styled from 'styled-components';

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

// const FilterContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;
// const Filter = styled.div`
//   margin: 20px;
//   ${mobile({ width: '0px 20px', display: 'flex', flexDirection: 'column' })}
// `;

// const FilterText = styled.span`
//   font-size: 20px;
//   font-weight: 600;
//   margin-right: 20px;
//   ${mobile({ marginRight: '0px' })}
// `;

// const Select = styled.select`
//   padding: 10px;
//   margin-right: 20px;
//   ${mobile({ margin: '10px 0px' })}
// `;
// const Option = styled.option``;

const Category = () => {
  const location = useLocation();
  // const [colour, setColour] = useState('Colour');

  // const handleColourChange = (event) => {
  //   setColour(event.target.value);
  // };

  return (
    <Container>
      <NavBar />
      <Announcement />
      <Title>{location.state.category.toUpperCase()}</Title>
      {/* <FilterContainer>
        <Filter>
          <FilterText>Colour:</FilterText>
          <Select value={colour} onChange={handleColourChange}>
            <Option value="all">All</Option>
            <Option value="black">Black</Option>
            <Option value="white">White</Option>
            <Option value="red">Red</Option>
            <Option value="multi">Multi</Option>
          </Select>
          <FilterText>Size:</FilterText>
          <Select>
            <Option disabled>Size</Option>
            <Option>40</Option>
            <Option>41</Option>
            <Option>42</Option>
            <Option>43</Option>
            <Option>44</Option>
            <Option>45</Option>
            <Option>46</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select>
            <Option value>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer> */}
      <Products category={location.state.category} />
      <Footer />
    </Container>
  );
};

export default Category;
