import React, { useState, useEffect } from "react";
import axios from "axios";

const Inventory = () => {
  const BASE_URL_MEDICATION = "http://localhost:3001/api/medication";
  const [medications, setMedications] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await axios.get(BASE_URL_MEDICATION);
        setMedications(response.data.data);
        calculateTotals(response.data.data);
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };

    fetchMedications();
  }, []);

  const calculateTotals = (medications) => {
    let quantity = 0;
    let price = 0;
    medications.forEach((med) => {
      quantity += parseInt(med.quantity, 10); // Ensure quantity is a number
      price += parseFloat(med.price) * parseInt(med.quantity, 10); // Total price = quantity * price
    });
    setTotalQuantity(quantity);
    setTotalPrice(price);
  };

  return (
    <div className="p-6">
     
     <h2 className="text-lg font-bold text-gray-700 mb-4">Inventory Report</h2>
      <h3 className="text-md font-semibold text-gray-700 mb-4">Medicine List</h3>
      <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 border bg-blue-600 text-white">#</th>
            <th className="px-4 py-2 border bg-blue-600 text-white">Name</th>
            {/* <th className="px-4 py-2 border bg-blue-600 text-white">Description</th> */}
            <th className="px-4 py-2 border bg-blue-600 text-white">Quantity</th>
            <th className="px-4 py-2 border bg-blue-600 text-white">Price</th>
            <th className="px-4 py-2 border bg-blue-600 text-white">Total Value</th>
          </tr>
        </thead>
        <tbody>
          {medications?.map((med, index) => (
            <tr key={med._id} className="border text-xs">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{med?.name}</td>
              {/* <td className="border px-4 py-2">{med?.description}</td> */}
              <td className="border px-4 py-2">{med?.quantity}</td>
              <td className="border px-4 py-2">&#8358;{med?.price}</td>
              <td className="border px-4 py-2">
                &#8358;{(parseInt(med.quantity, 10) * parseFloat(med.price)).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    
      
      <div className="mb-6 mt-6">
        <h3 className="text-md font-bold text-gray-700">Total Medicines in Stock</h3>
        <div className="flex justify-between mt-6">
          <p>Total Quantity: {totalQuantity}</p>
          <p>Total Price: &#8358;{totalPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
