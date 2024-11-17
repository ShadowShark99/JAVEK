// import React, { useState } from 'react';
// import { db } from './firebase-config';

// const UserInputForm = () => {
//   // State to store user input
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Add user data to Firestore
//     try {
//       await db.collection('users').add({
//         name,
//         email,
//         //timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//       });
//       alert('User data saved successfully!');
//       setName('');
//       setEmail('');
//     } catch (error) {
//       console.error('Error adding user data: ', error);
//       alert('Failed to save user data.');
//     }
//   };

//   return (
//     <div>
//       <h2>Enter User Information</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default UserInputForm;
