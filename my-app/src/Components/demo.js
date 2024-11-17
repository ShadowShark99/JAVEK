import { db } from "./firebase-config.js"; // Import Firestore
import { collection, addDoc } from "firebase/firestore";


await addDoc(collection(db, "sambanovaData"), {
    sampleString: "test"
    //add another sample data here
  });

//add another sample data here
await addDoc(collection(db, "sambanovaData"), {
    sampleString: "poop"
  });