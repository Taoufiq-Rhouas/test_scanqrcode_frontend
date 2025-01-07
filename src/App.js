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

  const [nameValid, setNameValid] = useState(null);
  
  // const apiUrl = 'https://test-scanqrcode-backend.onrender.com';
  // const socket = io("https://test-scanqrcode-backend.onrender.com");


  const apiUrl = 'http://localhost:5000';
  const socket = io("http://localhost:5000");

  // S_UPDATE_V2
  useEffect(() => {
    // Listen for the 'order-details' event from the server
    socket.on("order-details", (data) => {
      console.log("Received order details:", data);
      
      console.log('data.codecanal : ==');
      const parsedData = typeof data === "string" ? JSON.parse(data) : data;
      console.log("Parsed data.codecanal:", parsedData.codecanal);
      console.log("----");
      console.log("nameValid _:", nameValid);
      
      
      if(parsedData.codecanal == nameValid){
        setOrderDetails(data); // Update state with received data
      }

      console.log('====================');
      // setOrderDetails(data); // Update state with received data
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("order-details");
    };
  }, [nameValid]);
  // E_UPDATE_V2



  const handleStartScan = () => {
    setScanning(true);
    const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });

    scanner.render((qrCodeMessage) => {

      console.log('S__qrCodeMessage : ==');
      console.log(qrCodeMessage);
      console.log('E__qrCodeMessage=========');

      socket.emit("qr-scanned", qrCodeMessage);
      scanner.clear();
      setScanning(false);
    });
  };

  const handleGenerateQRCode = () => {
    if(nameValid == null){
      alert('Submit Name Canal')
    }else{
      const qrData = JSON.stringify(orderInput);
      console.log('qrData =:');
      console.log(qrData);
      console.log('==========');
      setGeneratedQR(qrData);
    }
    
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

      // setResult(response.data.message); // Assuming the backend sends { message: "Welcome..." }

      const message = response.data.message;
      setResult(message);
      // Show an alert with the backend response message
      if (message) {
        alert(`Backend Response: ${message}`);
        console.log('response.data.NameValid __:',response.data.NameValid);
                  
        setNameValid(response.data.NameValid)
        console.log('== :nameValid: ==');
        console.log(response.data.NameValid);
        console.log(nameValid);
        console.log('=:===============:=');
        handleInputChange('codecanal',response.data.NameValid)
      }
    } catch (error) {
      console.error('Error connecting to backend:', error);
      setResult('Failed to connect to backend');
    }
  };

  return (
    <div className="App">
      <hr/>
      <div>
        <center><h1>Test Live Scan From Taoufiq</h1></center>
      </div>
      <hr />
      <div className="container" >
        <div className="border m-2 p-2     shadow p-3 mb-5 bg-body-tertiary rounded" >
          <center><h1>Connect with Online Channel</h1></center>
          <form className="row g-3">
            <div className="input-group mb-3">
              <span className="input-group-text" htmlFor="Name" >Channel Name : </span>
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
          </form>
          <h2>Local Value channelName: {nameTest}</h2>
          {
            result ? (
              <center>
                <div 
                  className={`alert ${result === 'Failed to connect to backend' ? 'alert-danger' : 'alert-success'}`}
                >
                  <h1>Connection Result:</h1>
                  <h3>{result}</h3>
                  <h4>Name online Channel : {nameValid}</h4>
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

      {/* **** */}
      <div>
        {nameValid != null ? (
          <div>
            <div className="container" >
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
                  <div className="d-grid gap-2 col-6 mx-auto">
                    <button className="btn btn-secondary" type="button" onClick={handleGenerateQRCode}>Generate QR Code</button>
                  </div>
                </div>
              </form>
              {/* ------ */}
            </div>

            {/* -------- */}
            <div className="container">
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
            </div>
            {/* -------- */}


            {/* _________ */}
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
                                          <p><strong>Channel:</strong> {parsedDetails.codecanal}</p>
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
            {/* _________ */}


            {/* **** */}
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
            <div id="qr-reader" style={{ width: "100%" }}></div>
            {/* **** */}
          </div>
        ) : (
          <div className="container">
            <center><p>The ferst you need to create Canal Name</p></center>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;