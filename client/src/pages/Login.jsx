import { useState } from 'react';
import Joi from 'joi-browser';
import loginSchema from '../validation/login.validation';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/userRedux';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    url('https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: '75%' })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const PasswordInput = styled.input`
  font-family: Verdana;
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;

  ::placeholder,
  ::-webkit-input-placeholder {
    font-family: Urbanist;
  }
  :-ms-input-placeholder {
    font-family: Urbanist;
  }
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const NewLink = styled.div`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: black;
`;

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };
  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const validateValues = Joi.validate({ email, password }, loginSchema, {
      abortEarly: false,
    });

    const { error } = validateValues;

    if (error) {
      console.log('err', error.detail.message);
    } else {
      axios
        .post('users/login', { email, password })
        .then((res) => {
          dispatch(userActions.loginSuccess(res.data));
          history.push('/home');
          localStorage.setItem('token', res.data.token);
        })
        .catch((err) => {
          localStorage.clear();
        });
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="email"
            value={email}
            onChange={handleEmailChange}
          />
          <PasswordInput
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button>LOGIN</Button>
          <NewLink>
            <Link style={{ color: 'black' }} to="/register">
              CREATE A NEW ACCOUNT
            </Link>
          </NewLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
