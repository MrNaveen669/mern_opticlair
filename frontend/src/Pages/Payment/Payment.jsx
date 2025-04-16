// import React, { useState } from "react";
// import Navbar from "../../Components/Navbar/Navbar";
// import Footer from "../../Components/Footer/Footer";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { cartReset } from "../../redux/CartPage/action";
// import { addToOrder } from "../../redux/order/order.actions";
// import { Box, Button, Flex, Image, Input, Grid } from "@chakra-ui/react";
// import "../../App.css";

// const Payment = () => {
//   const init = {
//     card: "",
//     date: "",
//     cvv: "",
//     cardname: ""
//   };

//   const navigate = useNavigate();
//   const { cart } = useSelector((state) => state.CartReducer);
//   const dispatch = useDispatch();
//   const [userData, setUserData] = useState(init);
//   const [cards, setCards] = useState();
//   const [dates, setDates] = useState();
//   const [cv, setCv] = useState();
//   const [names, setNames] = useState();

//   const Required = (props) => {
//     return (
//       <Box
//         fontSize={"14px"}
//         m="3px 0px 3px 0px"
//         color={"#ff1f1f"}
//         fontWeight="500"
//         letterSpacing={"-0.4px"}
//       >
//         {props.info}
//       </Box>
//     );
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });

//     switch (name) {
//       case "card":
//         setCards(
//           value === "" ? (
//             <Required info="This is a required feild" />
//           ) : (
//             <Required info="Card Number should be 16 digit (eg. XXXXXXXXXXXXXXXX)" />
//           )
//         );
//         break;

//       case "date":
//         setDates(
//           value === "" ? (
//             <Required info="This is a required feild" />
//           ) : (
//             <Required info="Please enter a valid month and year format (eg. MM/YY)" />
//           )
//         );
//         break;

//       case "cvv":
//         setCv(
//           value === "" ? (
//             <Required info="This is a required feild" />
//           ) : (
//             <Required info="CVV should be 3 digit (eg. XXX)" />
//           )
//         );
//         break;

//       case "cardname":
//         setNames(
//           value === "" ? <Required info="This is a required feild" /> : ""
//         );
//         break;

//       default:
//         break;
//     }
//   };

//   const handleClick = () => {
//     dispatch(addToOrder(cart));
//     navigate("/confirm");
//     dispatch(cartReset());
//   };

//   return (
//     <>
//       <Navbar />
//       <Box>
//         <br />
//         <br />
//         <Box>
//           <Box
//             w={{ xl: "75%", lg: "80%", md: "90%", sm: "90%", base: "95%" }}
//             m="auto"
//           >
//             <Box
//               m="auto"
//               boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
//               borderRadius="lg"
//             >
//               <Box
//                 bg="#00bac6"
//                 color={"white"}
//                 fontWeight="700"
//                 p="4px 0px 6px 6px "
//                 fontSize="xl"
//                 textAlign="left"
//               >
//                 PAYMENT OPTION
//               </Box>
//               <br />
//               <Box display={"flex"} fontSize="lg" gap="9">
//                 <Flex
//                   w="200px"
//                   flexDirection="column"
//                   borderRight="2px solid gray"
//                   borderBottom="2px solid gray"
//                   borderRadius="2xl"
//                   display={{ md: "inherit", base: "none" }}
//                 >
//                   <Box
//                     p="16px 0px 16px 16px"
//                     fontWeight={"500"}
//                     _hover={{ bg: "blackAlpha.200" }}
//                     bg="blackAlpha.200"
//                   >
//                     Credit/Debit Card
//                   </Box>
//                   <Box
//                     p="16px 0px 16px 16px"
//                     fontWeight={"500"}
//                     _hover={{ bg: "blackAlpha.200" }}
//                   >
//                     BHIM/UPI Phone Pe
//                   </Box>
//                   <Box
//                     p="16px 0px 16px 16px"
//                     fontWeight={"500"}
//                     _hover={{ bg: "blackAlpha.200" }}
//                   >
//                     Net Banking
//                   </Box>
//                   <Box
//                     p="16px 0px 16px 16px"
//                     fontWeight={"500"}
//                     _hover={{ bg: "blackAlpha.200" }}
//                   >
//                     UPI QR Code
//                   </Box>
//                   <Box
//                     p="16px 0px 16px 16px"
//                     fontWeight={"500"}
//                     _hover={{ bg: "blackAlpha.200" }}
//                   >
//                     Paytm
//                   </Box>
//                 </Flex>
//                 <Box m="10px 10px 10px 10px ">
//                   <Grid
//                     templateColumns={{
//                       base: "repeat(1,1fr)",
//                       sm: "repeat(1,1fr)",
//                       md: "20% 75%",
//                       lg: "20% 75%",
//                       xl: "20% 80%"
//                     }}
//                     fontSize="lg"
//                     justifyContent={{
//                       md: "left",
//                       sm: "center",
//                       base: "center"
//                     }}
//                   >
//                     <Box
//                       fontWeight="bold"
//                       color="gray.600"
//                       display={{ md: "inherit", base: "none" }}
//                     >
//                       100% Secure
//                     </Box>
//                     <Image
//                       ml={{ md: "80px", sm: "0px", base: "0px" }}
//                       h={{ xl: "40px", lg: "40px", base: "40px" }}
//                       src="https://static5.lenskart.com/images/cust_mailer/Mar-03/CheckoutStrip.png"
//                       w={{
//                         xl: "100%",
//                         lg: "80%",
//                         md: "80%",
//                         sm: "100%",
//                         base: "100%"
//                       }}
//                     />
//                   </Grid>
//                   <br />
//                   <Box>
//                     <Input
//                       placeholder="Enter Card Number"
//                       name="card"
//                       type="Number"
//                       onChange={handleChange}
//                       m="20px 10px 10px 10px "
//                       fontSize="lg"
//                       h="40px"
//                       borderRadius="lg"
//                       p="2%"
//                       w="70%"
//                     />
//                     <Box pl="4" mt="-2">
//                       {userData.card.length === 16 ? "" : cards}
//                     </Box>
//                   </Box>

//                   <Flex m="20px 0px " w="50%">
//                     <Input
//                       placeholder="MM/YY"
//                       name="date"
//                       type="text"
//                       onChange={handleChange}
//                       mr="10px"
//                       ml="10px"
//                       fontSize="lg"
//                       h="40px"
//                       w="40%"
//                       borderRadius="lg"
//                       p="2%"
//                     />

//                     <Input
//                       placeholder="CVV"
//                       type="Number"
//                       name="cvv"
//                       onChange={handleChange}
//                       fontSize="lg"
//                       h="40px"
//                       borderRadius="lg"
//                       p="2%"
//                       w="30%"
//                       maxLength="3"
//                     />
//                   </Flex>

//                   <Box mt="-2" ml="2%">
//                     {userData.date.includes("/") ? "" : dates}
//                   </Box>
//                   <Box ml="2%">{userData.cvv.length === 3 ? "" : cv}</Box>

//                   <Box>
//                     <Input
//                       placeholder="Cardholder Name"
//                       type="text"
//                       name="cardname"
//                       onChange={handleChange}
//                       fontSize="lg"
//                       h="40px"
//                       borderRadius="lg"
//                       p="2%"
//                       m="20px 10px 20px 10px"
//                       w="70%"
//                     />
//                     <Box mt="-4" ml="2%">
//                       {names}
//                     </Box>
//                   </Box>

//                   <br />
//                   <br />
//                   {userData.cardname.length >= 1 &&
//                   userData.card.length === 16 &&
//                   userData.cvv.length === 3 &&
//                   userData.date.includes("/") ? (
//                     <Button
//                       fontSize={"16px"}
//                       bg="#3bb3a9"
//                       color={"white"}
//                       p="25px 22px"
//                       _hover={{ backgroundColor: "teal" }}
//                       onClick={handleClick}
//                       borderRadius="lg"
//                     >
//                       PLACE ORDER
//                     </Button>
//                   ) : (
//                     <Button
//                       fontSize={"16px"}
//                       bg="#cccccc"
//                       color={"white"}
//                       p="25px 22px"
//                       borderRadius="lg"
//                     >
//                       PLACE ORDER
//                     </Button>
//                   )}
//                 </Box>
//               </Box>
//               <Box p="10px" fontSize="lg" fontWeight="medium" color="gray.500">
//                 GlassCart Assurance
//               </Box>
//               <Image
//                 p="10px"
//                 w="90%"
//                 m="auto"
//                 src="https://static1.lenskart.com/media/desktop/img/all-assurance-offering.png"
//                 _hover={{ transform: "scale(1.1)" }}
//               />
//               <br />
//             </Box>
//             <br />
//             <br />
//           </Box>
//         </Box>
//       </Box>
//       <br />
//       <br />
//       <br />
//       <Footer />
//     </>
//   );
// };

// export default Payment;
import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartReset } from "../../redux/CartPage/action";
import { addToOrder } from "../../redux/order/order.actions";
import { Box, Button, Flex, Image, Input, Grid, Text, useToast } from "@chakra-ui/react";
import "../../App.css";

const Payment = () => {
  const init = {
    card: "",
    date: "",
    cvv: "",
    cardname: ""
  };

  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.CartReducer);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(init);
  const [cards, setCards] = useState();
  const [dates, setDates] = useState();
  const [cv, setCv] = useState();
  const [names, setNames] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Load Razorpay script when component mounts
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const Required = (props) => {
    return (
      <Box
        fontSize={"14px"}
        m="3px 0px 3px 0px"
        color={"#ff1f1f"}
        fontWeight="500"
        letterSpacing={"-0.4px"}
      >
        {props.info}
      </Box>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    switch (name) {
      case "card":
        setCards(
          value === "" ? (
            <Required info="This is a required field" />
          ) : (
            <Required info="Card Number should be 16 digit (eg. XXXXXXXXXXXXXXXX)" />
          )
        );
        break;

      case "date":
        setDates(
          value === "" ? (
            <Required info="This is a required field" />
          ) : (
            <Required info="Please enter a valid month and year format (eg. MM/YY)" />
          )
        );
        break;

      case "cvv":
        setCv(
          value === "" ? (
            <Required info="This is a required field" />
          ) : (
            <Required info="CVV should be 3 digit (eg. XXX)" />
          )
        );
        break;

      case "cardname":
        setNames(
          value === "" ? <Required info="This is a required field" /> : ""
        );
        break;

      default:
        break;
    }
  };

  // Calculate total price
  const getTotalPrice = () => {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return Math.round(totalPrice + totalPrice * 0.18);
  };

  // Handle Razorpay Payment
  const handleRazorpayPayment = async () => {
    setLoading(true);
    
    try {
      // In a real application, you would make an API call to your backend to create an order
      // For this example, I'm creating the options directly
      
      const options = {
        key: "https://api.razorpay.com/v2/", // Replace with your actual Razorpay test key
        amount: getTotalPrice() * 100, // Amount in paisa
        currency: "INR",
        name: "GlassCart",
        description: "Payment for your order",
        image: "https://your-company-logo.png", // Replace with your logo
        handler: function(response) {
          // Payment successful
          const paymentId = response.razorpay_payment_id;
          handlePaymentSuccess(paymentId);
        },
        prefill: {
          name: userData.cardname,
          email: "customer@example.com", // You can get this from user profile
          contact: "9999999999" // You can get this from user profile
        },
        notes: {
          address: "GlassCart Corporate Office"
        },
        theme: {
          color: "#00bac6"
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            toast({
              title: "Payment cancelled",
              description: "You closed the payment window",
              status: "warning",
              duration: 5000,
              isClosable: true,
            });
          }
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
      
    } catch (error) {
      console.error("Payment error:", error);
      setLoading(false);
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handlePaymentSuccess = (paymentId) => {
    // Save order details with payment info
    const orderWithPayment = {
      cart: cart,
      paymentId: paymentId,
      paymentMethod: "Razorpay",
      paymentStatus: "Completed",
      amount: getTotalPrice(),
      timestamp: new Date().toISOString()
    };
    
    // Dispatch to redux store
    dispatch(addToOrder(cart));
    
    // In a real app, you would also send this to your backend
    // api.post('/orders', orderWithPayment)
    
    toast({
      title: "Payment successful!",
      description: `Payment ID: ${paymentId}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    
    // Navigate to confirmation page
    navigate("/confirm");
    
    // Clear cart
    dispatch(cartReset());
  };

  // Direct card payment (without Razorpay)
  const handleDirectCardPayment = () => {
    // Validation checks
    if (userData.card.length !== 16) {
      toast({
        title: "Invalid card number",
        description: "Please enter a valid 16-digit card number",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!userData.date.includes("/") || userData.date.length !== 5) {
      toast({
        title: "Invalid expiry date",
        description: "Please enter date in MM/YY format",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (userData.cvv.length !== 3) {
      toast({
        title: "Invalid CVV",
        description: "Please enter a valid 3-digit CVV",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // In a real application, you would send card details to your payment processor
    // For demo, we'll just simulate a successful payment
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockPaymentId = "pay_" + Math.random().toString(36).substring(2, 15);
      handlePaymentSuccess(mockPaymentId);
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <Box>
        <br />
        <br />
        <Box>
          <Box
            w={{ xl: "75%", lg: "80%", md: "90%", sm: "90%", base: "95%" }}
            m="auto"
          >
            <Box
              m="auto"
              boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
              borderRadius="lg"
            >
              <Box
                bg="#00bac6"
                color={"white"}
                fontWeight="700"
                p="4px 0px 6px 6px "
                fontSize="xl"
                textAlign="left"
              >
                PAYMENT OPTIONS
              </Box>
              <br />
              <Box display={"flex"} fontSize="lg" gap="9">
                <Flex
                  w="200px"
                  flexDirection="column"
                  borderRight="2px solid gray"
                  borderBottom="2px solid gray"
                  borderRadius="2xl"
                  display={{ md: "inherit", base: "none" }}
                >
                  <Box
                    p="16px 0px 16px 16px"
                    fontWeight={"500"}
                    _hover={{ bg: "blackAlpha.200" }}
                    bg="blackAlpha.200"
                    cursor="pointer"
                  >
                    Credit/Debit Card
                  </Box>
                  <Box
                    p="16px 0px 16px 16px"
                    fontWeight={"500"}
                    _hover={{ bg: "blackAlpha.200" }}
                    cursor="pointer"
                    onClick={handleRazorpayPayment}
                  >
                    Razorpay
                  </Box>
                  <Box
                    p="16px 0px 16px 16px"
                    fontWeight={"500"}
                    _hover={{ bg: "blackAlpha.200" }}
                    cursor="pointer"
                  >
                    BHIM/UPI Phone Pe
                  </Box>
                  <Box
                    p="16px 0px 16px 16px"
                    fontWeight={"500"}
                    _hover={{ bg: "blackAlpha.200" }}
                    cursor="pointer"
                  >
                    Net Banking
                  </Box>
                  <Box
                    p="16px 0px 16px 16px"
                    fontWeight={"500"}
                    _hover={{ bg: "blackAlpha.200" }}
                    cursor="pointer"
                  >
                    UPI QR Code
                  </Box>
                  <Box
                    p="16px 0px 16px 16px"
                    fontWeight={"500"}
                    _hover={{ bg: "blackAlpha.200" }}
                    cursor="pointer"
                  >
                    Paytm
                  </Box>
                </Flex>
                <Box m="10px 10px 10px 10px ">
                  <Grid
                    templateColumns={{
                      base: "repeat(1,1fr)",
                      sm: "repeat(1,1fr)",
                      md: "20% 75%",
                      lg: "20% 75%",
                      xl: "20% 80%"
                    }}
                    fontSize="lg"
                    justifyContent={{
                      md: "left",
                      sm: "center",
                      base: "center"
                    }}
                  >
                    <Box
                      fontWeight="bold"
                      color="gray.600"
                      display={{ md: "inherit", base: "none" }}
                    >
                      100% Secure
                    </Box>
                    <Image
                      ml={{ md: "80px", sm: "0px", base: "0px" }}
                      h={{ xl: "40px", lg: "40px", base: "40px" }}
                      src="https://static5.lenskart.com/images/cust_mailer/Mar-03/CheckoutStrip.png"
                      w={{
                        xl: "100%",
                        lg: "80%",
                        md: "80%",
                        sm: "100%",
                        base: "100%"
                      }}
                    />
                  </Grid>
                  
                  {/* Razorpay option prominent button */}
                  <Box 
                    mt="4" 
                    p="4" 
                    borderRadius="md" 
                    bg="gray.50" 
                    border="1px dashed" 
                    borderColor="teal.300"
                  >
                    <Text fontWeight="bold" color="gray.700" mb="2">
                      Quick Checkout with Razorpay
                    </Text>
                    <Text fontSize="sm" color="gray.600" mb="3">
                      Pay securely with Cards, UPI, Wallets & more
                    </Text>
                    <Button
                      w="full"
                      bg="#3395FF"
                      color="white"
                      _hover={{ bg: "#2980b9" }}
                      onClick={handleRazorpayPayment}
                      isLoading={loading}
                      loadingText="Processing"
                    >
                      Pay with Razorpay
                    </Button>
                  </Box>
                  
                  <Text fontWeight="medium" mt="4" mb="2" color="gray.600">
                    OR Pay with Card
                  </Text>
                  
                  <Box>
                    <Input
                      placeholder="Enter Card Number"
                      name="card"
                      type="Number"
                      onChange={handleChange}
                      m="20px 10px 10px 10px "
                      fontSize="lg"
                      h="40px"
                      borderRadius="lg"
                      p="2%"
                      w="70%"
                    />
                    <Box pl="4" mt="-2">
                      {userData.card.length === 16 ? "" : cards}
                    </Box>
                  </Box>

                  <Flex m="20px 0px " w="50%">
                    <Input
                      placeholder="MM/YY"
                      name="date"
                      type="text"
                      onChange={handleChange}
                      mr="10px"
                      ml="10px"
                      fontSize="lg"
                      h="40px"
                      w="40%"
                      borderRadius="lg"
                      p="2%"
                    />

                    <Input
                      placeholder="CVV"
                      type="Number"
                      name="cvv"
                      onChange={handleChange}
                      fontSize="lg"
                      h="40px"
                      borderRadius="lg"
                      p="2%"
                      w="30%"
                      maxLength="3"
                    />
                  </Flex>

                  <Box mt="-2" ml="2%">
                    {userData.date.includes("/") ? "" : dates}
                  </Box>
                  <Box ml="2%">{userData.cvv.length === 3 ? "" : cv}</Box>

                  <Box>
                    <Input
                      placeholder="Cardholder Name"
                      type="text"
                      name="cardname"
                      onChange={handleChange}
                      fontSize="lg"
                      h="40px"
                      borderRadius="lg"
                      p="2%"
                      m="20px 10px 20px 10px"
                      w="70%"
                    />
                    <Box mt="-4" ml="2%">
                      {names}
                    </Box>
                  </Box>

                  <br />
                  <br />
                  {userData.cardname.length >= 1 &&
                  userData.card.length === 16 &&
                  userData.cvv.length === 3 &&
                  userData.date.includes("/") ? (
                    <Button
                      fontSize={"16px"}
                      bg="#3bb3a9"
                      color={"white"}
                      p="25px 22px"
                      _hover={{ backgroundColor: "teal" }}
                      onClick={handleDirectCardPayment}
                      isLoading={loading}
                      loadingText="Processing"
                      borderRadius="lg"
                    >
                      PLACE ORDER
                    </Button>
                  ) : (
                    <Button
                      fontSize={"16px"}
                      bg="#cccccc"
                      color={"white"}
                      p="25px 22px"
                      borderRadius="lg"
                      disabled
                    >
                      PLACE ORDER
                    </Button>
                  )}
                </Box>
              </Box>
              <Box p="10px" fontSize="lg" fontWeight="medium" color="gray.500">
                GlassCart Assurance
              </Box>
              <Image
                p="10px"
                w="90%"
                m="auto"
                src="https://static1.lenskart.com/media/desktop/img/all-assurance-offering.png"
                _hover={{ transform: "scale(1.1)" }}
              />
              <br />
            </Box>
            <br />
            <br />
          </Box>
        </Box>
      </Box>
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Payment;