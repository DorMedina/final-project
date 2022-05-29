import Badge from '@mui/material/Badge';
import { ShoppingCartOutlined, FavoriteBorder } from '@material-ui/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../store/userRedux';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: '50px' })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: '10px 0px' })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ display: 'none' })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: '24px' })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: 'center' })}
`;

const MenuItem = styled.div`
  align-items: center;
  color: black;
  font-size: 16px;
  cursor: pointer;
  padding: 10px 15px;
  ${mobile({ fontSize: '10px' })}
`;

const NavBar = () => {
  const dispatch = useDispatch();
  const isLoggedRedux = useSelector((state) => state.user.currentUser);
  const cartQuantityRedux = useSelector((state) => state.cart.quantity);

  const logout = () => {
    localStorage.clear();
    dispatch(userActions.logout());
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <NavLink style={{ textDecoration: 'none' }} to="/boots">
            <MenuItem>Boots</MenuItem>
          </NavLink>
          <NavLink style={{ textDecoration: 'none' }} to="/clothing">
            <MenuItem>Clothing</MenuItem>
          </NavLink>
          <NavLink style={{ textDecoration: 'none' }} to="/equipment">
            <MenuItem>Equipment</MenuItem>
          </NavLink>
          <NavLink style={{ textDecoration: 'none' }} to="/footballs">
            <MenuItem>Footballs</MenuItem>
          </NavLink>
        </Left>
        <Center>
          <NavLink style={{ textDecoration: 'none', color: 'black' }} to="/">
            <Logo>MEDINA</Logo>
          </NavLink>
        </Center>
        {!isLoggedRedux && (
          <Right>
            <NavLink style={{ textDecoration: 'none' }} to="/register">
              <MenuItem>REGISTER</MenuItem>
            </NavLink>
            <NavLink style={{ textDecoration: 'none' }} to="/login">
              <MenuItem>SIGN IN</MenuItem>
            </NavLink>
            <NavLink style={{ textDecoration: 'none' }} to="/cart">
              <MenuItem>
                <Badge badgeContent={cartQuantityRedux} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </NavLink>
            <MenuItem>
              <FavoriteBorder />
            </MenuItem>
          </Right>
        )}
        {isLoggedRedux && (
          <Right>
            <MenuItem>Hello, {isLoggedRedux.firstName}</MenuItem>

            <NavLink style={{ textDecoration: 'none' }} to="/cart">
              <MenuItem>
                <Badge badgeContent={cartQuantityRedux} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </NavLink>
            <MenuItem>
              <FavoriteBorder />
            </MenuItem>
            <NavLink
              style={{ textDecoration: 'none' }}
              to="/home"
              onClick={logout}
            >
              <MenuItem>LOGOUT</MenuItem>
            </NavLink>
          </Right>
        )}
      </Wrapper>
    </Container>
  );
};

export default NavBar;
