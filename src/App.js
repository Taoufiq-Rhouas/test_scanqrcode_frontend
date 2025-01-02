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

const socket = io("http://localhost:5000");

// const socket = io("https://test-scanqrcode.onrender.com:10000");



function App() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [orderInput, setOrderInput] = useState({
    orderId: "",
    items: [{ name: "", quantity: 1, price: "" }],
    total: "",
  });
  const [generatedQR, setGeneratedQR] = useState("");

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

  return (
    <div className="App">
      <h1>Cashier Web App</h1>

      <div>
        <h2>Generate Test QR Code</h2>
        <label>
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
        <button onClick={handleGenerateQRCode}>Generate QR Code</button>

        {generatedQR && (
          <div>
            <h3>Generated QR Code:</h3>
            <QRCodeCanvas value={generatedQR} />
          </div>
        )}
      </div>

      <div>
        <button onClick={handleStartScan} disabled={scanning}>
          {scanning ? "Scanning..." : "Start QR Scan (Click Icon)"}
        </button>
      </div>

      {orderDetails && (
        <div>
          <h2>Order Details</h2>
          <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
          <ul>
            {orderDetails.items.map((item, index) => (
              <li key={index}>
                {item.name} x{item.quantity} - {item.price}
              </li>
            ))}
          </ul>
          <p><strong>Total:</strong> {orderDetails.total}</p>
        </div>
      )}

      <div id="qr-reader" style={{ width: "100%" }}></div>
    </div>
  );
}

export default App;


