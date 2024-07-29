import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKNifw0gPpu3fYnBIxqZ7x48LRovL27sc",
  authDomain: "helloworld-ab678.firebaseapp.com",
  projectId: "helloworld-ab678",
  storageBucket: "helloworld-ab678.appspot.com",
  messagingSenderId: "411206770245",
  appId: "1:411206770245:web:f450b5a0deb0d232ef4d2c",
  measurementId: "G-V67H6KS29R",
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

//SignUp
const signUpForm = document.querySelector(".signup");
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signUpForm["email"].value;
  const password = signUpForm["password"].value;
 
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User created", userCredential.user);
      signUpForm.reset();
    }).catch((error) => {
      console.log(error.message);
    })

});

//Logout
const signOutBtn = document.querySelector(".logout");
signOutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      console.log(error.message);
    });
});

//Login
const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm["email"].value;
  const password = loginForm["password"].value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
       console.log("User signed in..", userCredential.user);
      loginForm.reset();
    }).catch((error) => {
      console.log(error.message);
    })
});

const unSubAuth = onAuthStateChanged (auth, (user) => {
  console.log('User status changed:', user);
});

const unSubButton = document.querySelector('.unsub');
unSubButton.addEventListener('click', () => {
  console.log('Unsubscribing from Everything');
  unSubAuth();
  unSubCol();
  unSubDoc();
});

const colRef = collection(db, "Movies");

/* Get all documents in a collection
getDocs(colRef)
  .then((snapshot) => {
    let movies = [];
    snapshot.docs.forEach((doc) => {
      movies.push({ ...doc.data(), id: doc.id });
    });
    console.log(movies);
  })
  .catch((error) => {
    console.error("Error getting documents: ", error);
  });
*/

//querys the collection
const q = query(
  colRef,
  //where("director", "==", "idk"),
  orderBy("created")
);

//realtime collection
const unSubCol = onSnapshot(q, (snapshot) => {
  let movies = [];
  snapshot.docs.forEach((doc) => {
    movies.push({ ...doc.data(), id: doc.id });
  });
  console.log(movies);
});

//get a single document
const docRef = doc(db, "Movies", "YPvXuGW5ZUmA2J6131bu");

const unSubDoc = onSnapshot(docRef, (doc) => {
  console.log(doc.data());
});

// updateDoc(docRef, {
//   title: "TheTest",
// })

// addDoc(colRef, {
//   title: "LaPrueba",
//   director: "idk",
//   created: serverTimestamp(),
// });

// deleteDoc(docRef)
//   .then(() => {
//     console.log("Document successfully deleted!");
//   })
//   .catch((error) => {
//     console.error("Error removing document: ", error);
//   });
