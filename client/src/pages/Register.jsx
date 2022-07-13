import { useState } from 'react';
import axios from 'axios';
import registerSchema from '../validation/register.validation';
import { useHistory } from 'react-router-dom';
import Joi from 'joi-browser';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    url('https://images.pexels.com/photos/61143/pexels-photo-61143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
  ${mobile({ 'flex-wrap': 'nowrap', 'flex-direction': 'column' })}
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
`;

const Input = styled.input`
  flex: 0;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const PasswordInput = styled.input`
  font-family: Verdana;
  flex: 0;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;

  ::placeholder,
  ::-webkit-input-placeholder {
    font-family: Urbanist;
  }
  :-ms-input-placeholder {
    font-family: Urbanist;
  }
`;

const InputError = styled.span`
  font-size: 12px;
  padding-top: 5px;
  color: black;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const history = useHistory();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focused, setFocused] = useState(false);

  const handleFocus = (ev) => {
    setFocused(true);
  };

  const handleFirstNameChange = (ev) => {
    setFirstName(ev.target.value);
  };
  const handleLastNameChange = (ev) => {
    setLastName(ev.target.value);
  };
  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };
  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };
  const handleConfirmPasswordChange = (ev) => {
    setConfirmPassword(ev.target.value);
  };

  const handleRegister = (ev) => {
    ev.preventDefault();
    if (password !== confirmPassword) {
      console.log('password doesnt match');
    } else {
      const validateValues = Joi.validate(
        { firstName, lastName, email, password, confirmPassword },
        registerSchema,
        { abortEarly: false }
      );

      const { error } = validateValues;

      if (error) {
        error.details.forEach((detail) => {
          console.log('error', detail.message);
        });
      } else {
        axios
          .post('/users/register', {
            firstName,
            lastName,
            email,
            password,
            isAdmin: false,
          })
          .then((res) => {
            console.log(res);
            history.push('/login');
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleRegister}>
          <FormInput>
            <Input
              type="text"
              placeholder="first name"
              onChange={handleFirstNameChange}
              value={firstName}
              onBlur={handleFocus}
              focused={focused.toString()}
            />
          </FormInput>
          <FormInput>
            <Input
              type="text"
              placeholder="last name"
              onChange={handleLastNameChange}
              value={lastName}
            />
          </FormInput>
          <FormInput>
            <Input
              type="email"
              placeholder="email"
              onChange={handleEmailChange}
              value={email}
            />
          </FormInput>
          <FormInput>
            <PasswordInput
              type="password"
              placeholder="password"
              onChange={handlePasswordChange}
              value={password}
            />
          </FormInput>
          <FormInput>
            <PasswordInput
              type="password"
              placeholder="confirm password"
              onChange={handleConfirmPasswordChange}
              value={confirmPassword}
            />
          </FormInput>

          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
