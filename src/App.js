// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;






// // VERSION_1
// import React, { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';
// import { Html5QrcodeScanner } from "html5-qrcode";

// const socket = io('http://localhost:5000'); // Connect to backend

// function App() {
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [scanning, setScanning] = useState(false);

//   // Listen for the order details from the backend
//   useEffect(() => {
//     socket.on('order-details', (orderId) => {
//       // Example order details; you would replace this with a real database call
//       setOrderDetails({
//         orderId: orderId,
//         items: [{ name: 'Pizza', quantity: 1, price: '$10' }],
//         total: '$10'
//       });
//     });
    
//     return () => {
//       socket.off('order-details');
//     };
//   }, []);

//   const handleStartScan = () => {
//     setScanning(true);
//     const scanner = new Html5QrcodeScanner("qr-reader", {
//       fps: 10,
//       qrbox: 250
//     });
    
//     scanner.render((qrCodeMessage) => {
//       // Send the scanned QR code to the server
//       socket.emit('qr-scanned', qrCodeMessage);
//       scanner.clear();
//       setScanning(false);
//     });
//   };

//   return (
//     <div className="App">
//       <h1>Cashier Web App</h1>
      
//       <div>
//         <button onClick={handleStartScan} disabled={scanning}>
//           {scanning ? 'Scanning...' : 'Start QR Scan (Click Icon)'}
//         </button>
//       </div>
      
//       {orderDetails && (
//         <div>
//           <h2>Order Details</h2>
//           <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
//           <ul>
//             {orderDetails.items.map((item, index) => (
//               <li key={index}>{item.name} x{item.quantity} - {item.price}</li>
//             ))}
//           </ul>
//           <p><strong>Total:</strong> {orderDetails.total}</p>
//         </div>
//       )}
      
//       <div id="qr-reader" style={{ width: '100%' }}></div>
//     </div>
//   );
// }

// export default App;




// // VERSUIN_2
// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import QRCode from "qrcode.react"; // For generating QR codes

// const socket = io("http://localhost:5000"); // Connect to backend

// function App() {
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [scanning, setScanning] = useState(false);
//   const [orderInput, setOrderInput] = useState({
//     orderId: "",
//     items: [{ name: "", quantity: 1, price: "" }],
//     total: "",
//   });
//   const [generatedQR, setGeneratedQR] = useState("");

//   // Listen for the order details from the backend
//   useEffect(() => {
//     socket.on("order-details", (orderId) => {
//       // Example order details; you would replace this with a real database call
//       setOrderDetails({
//         orderId: orderId,
//         items: [{ name: "Pizza", quantity: 1, price: "$10" }],
//         total: "$10",
//       });
//     });

//     return () => {
//       socket.off("order-details");
//     };
//   }, []);

//   const handleStartScan = () => {
//     setScanning(true);
//     const scanner = new Html5QrcodeScanner("qr-reader", {
//       fps: 10,
//       qrbox: 250,
//     });

//     scanner.render((qrCodeMessage) => {
//       // Send the scanned QR code to the server
//       socket.emit("qr-scanned", qrCodeMessage);
//       scanner.clear();
//       setScanning(false);
//     });
//   };

//   const handleGenerateQRCode = () => {
//     // Convert the order input to a JSON string to embed in the QR code
//     const qrData = JSON.stringify(orderInput);
//     setGeneratedQR(qrData);
//   };

//   const handleInputChange = (field, value) => {
//     setOrderInput((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   return (
//     <div className="App">
//       <h1>Cashier Web App</h1>

//       {/* QR Code Generator */}
//       <div>
//         <h2>Generate Test QR Code</h2>
//         <label>
//           Order ID:
//           <input
//             type="text"
//             value={orderInput.orderId}
//             onChange={(e) => handleInputChange("orderId", e.target.value)}
//           />
//         </label>
//         <label>
//           Item Name:
//           <input
//             type="text"
//             value={orderInput.items[0].name}
//             onChange={(e) =>
//               handleInputChange("items", [{ ...orderInput.items[0], name: e.target.value }])
//             }
//           />
//         </label>
//         <label>
//           Quantity:
//           <input
//             type="number"
//             value={orderInput.items[0].quantity}
//             onChange={(e) =>
//               handleInputChange("items", [{ ...orderInput.items[0], quantity: e.target.value }])
//             }
//           />
//         </label>
//         <label>
//           Price:
//           <input
//             type="text"
//             value={orderInput.items[0].price}
//             onChange={(e) =>
//               handleInputChange("items", [{ ...orderInput.items[0], price: e.target.value }])
//             }
//           />
//         </label>
//         <label>
//           Total:
//           <input
//             type="text"
//             value={orderInput.total}
//             onChange={(e) => handleInputChange("total", e.target.value)}
//           />
//         </label>
//         <button onClick={handleGenerateQRCode}>Generate QR Code</button>

//         {generatedQR && (
//           <div>
//             <h3>Generated QR Code:</h3>
//             <QRCode value={generatedQR} />
//           </div>
//         )}
//       </div>

//       {/* QR Code Scanner */}
//       <div>
//         <button onClick={handleStartScan} disabled={scanning}>
//           {scanning ? "Scanning..." : "Start QR Scan (Click Icon)"}
//         </button>
//       </div>

//       {orderDetails && (
//         <div>
//           <h2>Order Details</h2>
//           <p>
//             <strong>Order ID:</strong> {orderDetails.orderId}
//           </p>
//           <ul>
//             {orderDetails.items.map((item, index) => (
//               <li key={index}>
//                 {item.name} x{item.quantity} - {item.price}
//               </li>
//             ))}
//           </ul>
//           <p>
//             <strong>Total:</strong> {orderDetails.total}
//           </p>
//         </div>
//       )}

//       <div id="qr-reader" style={{ width: "100%" }}></div>
//     </div>
//   );
// }

// export default App;





import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Html5QrcodeScanner } from "html5-qrcode";
import { QRCodeCanvas } from "qrcode.react"; // Correct import
import axios from 'axios';


// const socket = io("http://localhost:5000");

function App() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [orderInput, setOrderInput] = useState({
    orderId: "",
    items: [{ name: "", quantity: 1, price: "" }],
    total: "",
  });
  const [generatedQR, setGeneratedQR] = useState("");

  // S_Test_Comunication
  const [nameTest, setNameTest] = useState('');
  const [result, setResult] = useState('');
  const apiUrl = 'https://test-scanqrcode-backend.onrender.com';

  const socket = io("https://test-scanqrcode-backend.onrender.com");

  // S_UPDATE_V2
  useEffect(() => {
    // Listen for the 'order-details' event from the server
    socket.on("order-details", (data) => {
      console.log("Received order details:", data);
      setOrderDetails(data); // Update state with received data
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("order-details");
    };
  }, []);
  // E_UPDATE_V2






  

  const handleStartScan = () => {
    setScanning(true);
    const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });

    scanner.render((qrCodeMessage) => {
      socket.emit("qr-scanned", qrCodeMessage);
      scanner.clear();
      setScanning(false);
    });
  };

  const handleGenerateQRCode = () => {
    const qrData = JSON.stringify(orderInput);
    setGeneratedQR(qrData);
  };

  const handleInputChange = (field, value) => {
    setOrderInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };



  const handleChangeNameTest = (e) => {
    setNameTest(e.target.value);
  };

  // const apiUrl = 'http://localhost:5000/api';
  
  const handleTestConnectionBackend = async () => {
    try {
      // Make an API call to the backend
      // const response = await axios.post('https://test-scanqrcode-backend.onrender.com/api/test', { name: nameTest });
      // const response = await axios.post('http://localhost:5000/api/test', { name: nameTest });
      // const response = await axios.post('https://test-scanqrcode-backend.onrender.com/api/test', { name: nameTest });
      const response = await axios.post(`${apiUrl}/api/test`, { name: nameTest });

      
      setResult(response.data.message); // Assuming the backend sends { message: "Welcome..." }
    } catch (error) {
      console.error('Error connecting to backend:', error);
      setResult('Failed to connect to backend');
    }
  };

  return (
    <div className="App">
      <hr/>
      {/* <h1>Testing Back End Is Starting</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">Name</label>
          <input type="text" className="form-control" id="Name" value={nameTest} onChange={handleChangeNameTest} />
        </div>
        <button type="button" onClick={handleTestConectionBackend()} className="btn btn-primary">Submit</button>
      </form>
      <h2> Local value Name : {nameTest}</h2>
      <h1>----</h1>
      <h1>Result Connection : </h1> */}

      <div>
        <center><h1>Test Live Scan Fro Taoufiq</h1></center>
      </div>
      <hr />
      <div className="container" >

      
        <div className="border m-2 p-2     shadow p-3 mb-5 bg-body-tertiary rounded" >
          <h1>Testing Back End Is Starting V2</h1>
          

          <form className="row g-3">

            <div className="input-group mb-3">
              <span className="input-group-text" htmlFor="Name" >Name</span>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Name" 
                id="Name"
                value={nameTest} 
                onChange={handleChangeNameTest}  
              />
              <button 
                className="btn btn-success" 
                type="button" 
                id="button-addon2"
                onClick={handleTestConnectionBackend} 
              >Submit</button>
            </div>


            {/* <div  className="col-auto">
              <label htmlFor="Name" className="form-label">Name</label>
            </div>
            <div  className="col-auto">
              <input 
                type="text" 
                className="form-control" 
                id="Name" 
                value={nameTest} 
                onChange={handleChangeNameTest} 
              />
            </div>
            <div className="col-auto">
              <button 
                type="button" 
                onClick={handleTestConnectionBackend} 
                className="btn btn-primary"
              >
                Submit
              </button>
            </div> */}


          </form>
          <h2>Local Value Name: {nameTest}</h2>
          {/* <h1>----</h1> */}
          {
            result ? (

              <center>
              <div 
                className={`alert ${result === 'Failed to connect to backend' ? 'alert-danger' : 'alert-success'}`}
                // className="alert alert-secondary"
              >
                <h1>Result Connection:</h1>
                <h3>{result}</h3>
              </div>
              </center>
            )
            :
            (
              <div><center><p>No result</p></center></div>
            )
          }
          
          
        </div>

      </div>
      <hr/>


      <div className="container " >
        <h1>Cashier Web App</h1>
        

        {/* ------ */}
        <form className="row g-3 border m-2 p-2     shadow p-3 mb-5 bg-body-tertiary rounded">
          <h2>Generate Test QR Code</h2>
          <div className="col-md-4">
            <label 
              htmlFor="OrderID" 
              className="form-label"
            >Order ID :</label>
            <input 
              type="text" 
              className="form-control" 
              id="inputEmail4" 
              value={orderInput.orderId}
              onChange={(e) => handleInputChange("orderId", e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Item Name :</label>
            <input 
              type="text" 
              className="form-control" 
              value={orderInput.items[0].name}
              onChange={(e) => handleInputChange("items", [{ ...orderInput.items[0], name: e.target.value }])}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Quantity :</label>
            <input 
              type="number" 
              className="form-control" 
              value={orderInput.items[0].quantity}
              onChange={(e) =>handleInputChange("items", [{ ...orderInput.items[0], quantity: e.target.value }])}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Price :</label>
            <input 
              type="number" 
              className="form-control" 
              value={orderInput.items[0].price}
              onChange={(e) => handleInputChange("items", [{ ...orderInput.items[0], price: e.target.value }])}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Total :</label>
            <input 
              type="number" 
              className="form-control" 
              value={orderInput.total}
              onChange={(e) => handleInputChange("total", e.target.value)}
            />
          </div>



          <div className="col-12">
            {/* <button type="submit" className="btn btn-primary">Sign in</button> */}
            <div className="d-grid gap-2 col-6 mx-auto">
              {/* <button className="btn btn-primary" type="button">Button</button> */}
              <button className="btn btn-secondary" type="button" onClick={handleGenerateQRCode}>Generate QR Code</button>
            </div>
          </div>
        </form>
        {/* ------ */}
      </div>
      
      

      <div className="container">
        
        {/* <label>
          Order ID:
          <input
            type="text"
            value={orderInput.orderId}
            onChange={(e) => handleInputChange("orderId", e.target.value)}
          />
        </label>
        <label>
          Item Name:
          <input
            type="text"
            value={orderInput.items[0].name}
            onChange={(e) =>
              handleInputChange("items", [{ ...orderInput.items[0], name: e.target.value }])
            }
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={orderInput.items[0].quantity}
            onChange={(e) =>
              handleInputChange("items", [{ ...orderInput.items[0], quantity: e.target.value }])
            }
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            value={orderInput.items[0].price}
            onChange={(e) =>
              handleInputChange("items", [{ ...orderInput.items[0], price: e.target.value }])
            }
          />
        </label>
        <label>
          Total:
          <input
            type="text"
            value={orderInput.total}
            onChange={(e) => handleInputChange("total", e.target.value)}
          />
        </label>
        <button onClick={handleGenerateQRCode}>Generate QR Code</button> */}



        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            {/* -- */}
            {generatedQR && (
              <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                <center>
                
                  <div>
                    <h3>Generated QR Code:</h3>
                    <QRCodeCanvas value={generatedQR} />
                  </div>
                
                </center>
              </div>
            )}
            {/* -- */}
          </div>
          <div className="col-sm-2"></div>
        </div>


        {/* <div className="row">
          <div className="col-4">col-8</div>
          <div className="col-4">
            
          </div>
          <div className="col-4">col-4</div>
        </div> */}


        
      </div>

      <hr/>
      <div className="container">
        <div className="row" >
          <div className="col-sm-2"></div>


        
          <div className="col-sm-8">



          










            {orderDetails && (
              




              <div>
                {typeof orderDetails === "string" ? (
                  (() => {
                    const parsedDetails = JSON.parse(orderDetails); // Parse the string to an object
                    return (
                      <div>
                        <div className="card text-center">
                          <div className="card-header">
                            <h4>Order Details</h4>
                          </div>
                          <div className="card-body">
                            {parsedDetails.items && Array.isArray(parsedDetails.items) ? (
                              <ul>
                                {parsedDetails.items.map((item, index) => (
                                  <li key={index}>
                                    <p><strong>Order ID:</strong> {parsedDetails.orderId}</p>
                                    <p><strong>Name:</strong> {item.name}</p>
                                    <p><strong>Quantity:</strong> {item.quantity}</p>
                                    <p><strong>Price:</strong> {item.price}</p>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p>No items found in the order.</p>
                            )}
                          </div>
                          <div className="card-footer text-body-secondary">
                            <p><strong>Total:</strong> {parsedDetails.total}</p>
                          </div>
                        </div>



                        {/* <p><strong>Order ID:</strong> {parsedDetails.orderId}</p>
                        {parsedDetails.items && Array.isArray(parsedDetails.items) ? (
                          <ul>
                            {parsedDetails.items.map((item, index) => (
                              <li key={index}>
                                <p><strong>Name:</strong> {item.name}</p>
                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                <p><strong>Price:</strong> {item.price}</p>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No items found in the order.</p>
                        )}
                        <p><strong>Total:</strong> {parsedDetails.total}</p> */}
                      </div>
                    );
                  })()
                ) : (
                  <p>Invalid order details format.</p>
                )}
              </div>
            )}
          </div>
        
          <div className="col-sm-2"></div>
        </div>
      </div>
      <hr/>

      <div className="container mb-5">
        <div className="row">
          <div className="col-12">
            <div className="d-grid gap-2 col-6 mx-auto">
              <button 
                className="btn btn-success" 
                type="button" 
                onClick={handleStartScan} 
                disabled={scanning}
              >{scanning ? "Scanning..." : "Start QR Scan"}</button>
            </div>
          </div>
        </div>
      </div>


      {/* <div>
        <button onClick={handleStartScan} disabled={scanning}>
          {scanning ? "Scanning..." : "Start QR Scan (Click Icon)"}
        </button>
      </div> */}

      {/* {orderDetails && (
        <div>
          <h2>Order Details V2</h2>
          <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
          <ul>
            {orderDetails.items.map((item, index) => (
              <li key={index}>
                {item.name} x{item.quantity} - {item.price}
              </li>
            ))}
          </ul>
          <p><strong>Total:</strong> {orderDetails.total}</p>
          <br/>
          <h2>Order Details</h2>
          <p><strong>Scanned QR Code Data:</strong> {orderDetails}</p>
        </div>
      )} */}

      {/* {orderDetails && (
        <div>
          <h2>Order Details V2</h2>
          <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
          {orderDetails.items && Array.isArray(orderDetails.items) ? (
            <ul>
              {orderDetails.items.map((item, index) => (
                <li key={index}>
                  {item.name} x{item.quantity} - {item.price}
                </li>
              ))}
            </ul>
          ) : (
            <p>No items found in the order.</p>
          )}
          <p><strong>Total:</strong> {orderDetails.total}</p>
          <br />
          <h2>Scanned QR Code Dataa</h2>
          <p><strong>Raw Data:</strong> {JSON.stringify(orderDetails)}</p>
        </div>
      )} */}


      {/* {orderDetails && (
        <div>
          <h2>Order Details</h2>
          {typeof orderDetails === "string" ? (
            (() => {
              const parsedDetails = JSON.parse(orderDetails); // Parse the string to an object
              return (
                <div>
                  <p><strong>Order ID:</strong> {parsedDetails.orderId}</p>
                  {parsedDetails.items && Array.isArray(parsedDetails.items) ? (
                    <ul>
                      {parsedDetails.items.map((item, index) => (
                        <li key={index}>
                          <p><strong>Name:</strong> {item.name}</p>
                          <p><strong>Quantity:</strong> {item.quantity}</p>
                          <p><strong>Price:</strong> {item.price}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No items found in the order.</p>
                  )}
                  <p><strong>Total:</strong> {parsedDetails.total}</p>
                </div>
              );
            })()
          ) : (
            <p>Invalid order details format.</p>
          )}
        </div>
      )} */}



      <div id="qr-reader" style={{ width: "100%" }}></div>
    </div>
  );
}

export default App;


