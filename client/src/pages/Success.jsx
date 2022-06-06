import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router';
import axios from 'axios';
import { userActions } from '../store/userRedux';
import { cartActions } from '../store/cartRedux';

const Success = () => {
  const location = useLocation();
  const history = useHistory();
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState(null);

  //   useEffect(() => {
  //     const createOrder = async () => {
  //       try {
  //         console.log(data);

  //         await axios
  //           .post('/orders', {
  //             userId: currentUser._id,
  //             products: cart.products.map((item) => ({
  //               productId: item._id,
  //               quantity: item._quantity,
  //             })),
  //             amount: cart.total,
  //             address: data.billing_details.address,
  //           })
  //         setOrderId(res.data._id));

  //       }
  //     } catch (error)
  //       {console.log('error');}
  //     data && createOrder();
  //   }, []);

  useEffect(() => {
    const createOrder = async () => {
      try {
        console.log(currentUser);
        const res = await axios.post('/orders', {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch (error) {
        console.log(error);
      }
    };
    data && createOrder();
  }, []);

  const handleClick = () => {
    dispatch(cartActions.resetCart());
    history.push('/');
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button onClick={handleClick} style={{ padding: 10, marginTop: 20 }}>
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;
