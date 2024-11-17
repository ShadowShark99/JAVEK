// import React, { useEffect, useState } from 'react';
// import { db } from './firebase-config';

// const UserList = () => {
//   const [users, setUsers] = useState([]);

//   // Fetch user data from Firestore
//   useEffect(() => {
//     const unsubscribe = db
//       .collection('users')
//       .orderBy('timestamp', 'desc') // Order users by submission time
//       .onSnapshot((snapshot) => {
//         setUsers(snapshot.docs.map((doc) => doc.data()));
//       });

//     return () => unsubscribe(); // Cleanup on component unmount
//   }, []);

//   return (
//     <div>
//       <h2>User List</h2>
//       <ul>
//         {users.map((user, index) => (
//           <li key={index}>
//             {user.name} - {user.email}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;
