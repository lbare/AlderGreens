// Import the functions you need from the SDKs you need
import { getApps, initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Hole } from "../contexts/ScoreContext";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5-W7XbnP3caClm31mKtudIV-5-pAATe8",
  authDomain: "golfscores-649d4.firebaseapp.com",
  projectId: "golfscores-649d4",
  storageBucket: "golfscores-649d4.appspot.com",
  messagingSenderId: "24728706255",
  appId: "1:24728706255:web:ab2f4c89038db499db6bba",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export const addGame = async (
  players: {
    totalScore: number;
    name: string;
    holes: Hole[];
  }[]
) => {
  try {
    const game: {
      date: string;
      [key: string]:
        | {
            score?: number;
            holes?: number[]; // Changed this to be an array of numbers
            shotHistory?: string[];
          }
        | string; // date is of type string, the player data is an object
    } = {
      date: new Date().toISOString(),
    };

    players.forEach((player) => {
      const scores = player.holes.map((hole) => hole.score); // Extract the scores from each hole

      const playerData: {
        score: number;
        holes?: number[]; // Make this an array of numbers
      } = {
        score: player.totalScore,
        holes: scores, // Set the scores array here
      };

      game[player.name] = playerData;
    });
    console.log(game);

    const docRef = await addDoc(collection(db, "games"), game);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export { auth, db };
