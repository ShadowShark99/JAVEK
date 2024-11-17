import React, { useState } from "react";
import axios from "axios";
import { db } from "./firebase"; // Import Firestore
import { collection, addDoc } from "firebase/firestore";

const SambaNovaComponent = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Send Request to SambaNova API
      const apiResponse = await axios.post(
        "https://api.sambanova.com/v1/", // Replace with actual endpoint
        { input: input }, // Payload
        {
          headers: {
            Authorization: `Bearer YOUR_SAMBANOVA_API_KEY`,
            "Content-Type": "application/json",
          },
        }
      );

      // Step 2: Process Response
      const result = apiResponse.data;
      setResponse(result);

      // Step 3: Store Data in Firebase
      await addDoc(collection(db, "sambanovaData"), {
        input: input,
        response: result,
        timestamp: new Date(),
      });
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong.");
    }
  };

  return (
    <div>
      <h2>SambaNova Integration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your input"
        />
        <button type="submit">Send to SambaNova</button>
      </form>
      {response && <p>Response: {JSON.stringify(response)}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default SambaNovaComponent;
