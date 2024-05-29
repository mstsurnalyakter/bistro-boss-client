import  { useEffect, useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCart from '../../../hooks/useCart';
import useAuth from '../../../hooks/useAuth';

const CheckoutForm = () => {

  const [error,setError] = useState('');
  const [clientSecret,setClientSecret] = useState('')
  const [transactionId,setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cart] = useCart();
    const {user} = useAuth();
    const totalPrice = cart.reduce((total,item)=>total+item?.price,0)



     useEffect(() => {
       if (totalPrice > 0) {
         axiosSecure
           .post("/create-payment-intent", { price: totalPrice })
           .then((res) => {
             console.log(res.data.clientSecret);
             setClientSecret(res.data.clientSecret);
           });
       }
     }, [axiosSecure, totalPrice]);






    const handleSubmit = async e =>{
        e.preventDefault();

        if (!stripe || !elements) {
          return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
          return;
        }

        const {error,paymentMethod} = await stripe.createPaymentMethod({
          type:'card',
          card
        })

        if (error) {
          console.log("payment error",error);
          setError(error.message)
        }else{
          console.log("payment method",paymentMethod);
          setError('')
        }

        //confirm payment
        const {paymentIntent,error:confirmError} = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || "anonymous",
              name: user?.displayName || "anonymous",
            },
          },
        });

        if (confirmError) {
          console.log("confirmError", confirmError);
        }else{
          console.log("paymentIntent", paymentIntent);
          if (paymentIntent.status === 'succeeded') {
            console.log('transaction id',paymentIntent.id);
            setTransactionId(paymentIntent?.id)
          }
        }


    }
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button className='btn btn-sm my-5 btn-primary' type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className='text-red-500'>{error}</p>
      {transactionId && <p className='text-green-600'>Your transaction id:{transactionId}</p>}
    </form>
  );
}

CheckoutForm.propTypes = {}

export default CheckoutForm