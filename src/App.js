import './App.css';
import React, { useEffect, useState } from "react";
import { Auth } from "./components/auth";
import { db,auth,storage} from "./config/firebase";
import { getDocs, collection, addDoc, deleteDoc,updateDoc, doc } from "firebase/firestore";
import {ref, uploadBytes} from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);

  // NEW MOVIE STATES
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  //UPDATE TITLE STATE
  const [updatedTitle, setUpdatedTitle] =useState("");

  //File Upload state
  const [fileUpload, setFileUpload] = useState(null)

  const movieCollectionRef = collection(db, "movies");

  

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(movieCollectionRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setMovieList(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId:auth?.currentUser?.uid,
      });
      // Refresh the movie list after adding a new movie
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const  deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
   await deleteDoc(movieDoc);
   const data = await getDocs(movieCollectionRef);
   const filteredData = data.docs.map((doc) => ({...doc.data(),id:doc.id}));
   setMovieList(filteredData);
  };
  
  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc, {title:updatedTitle});
    const data = await getDocs(movieCollectionRef);
    const filteredData = data.docs.map((doc) => ({...doc.data(),id:doc.id}));
    setMovieList(filteredData);
  }
 const uploadFile = async() => {
  if(!fileUpload) return;
  const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
  try{
  await uploadBytes(filesFolderRef,fileUpload);
  }catch(err) {
    console.error(err);
  }
 }


  return (
    <div className="App">
      <Auth />
      <div className= "con1">
        <input
          type="text"
          placeholder="Movie title"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Date"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label> Received An Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>{movie.title}</h1>
            <p> Date: {movie.releaseDate}</p>
            <button onClick = {() =>deleteMovie(movie.id)}>Delete Movie</button>
            <input placeholder ="new title"
                onChange={(e) => setUpdatedTitle(e.target.value)}/>
            <button onClick = {() => updateMovieTitle(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>
      <div>
        <input type = "file" onChange ={(e) => setFileUpload(e.target.files[0])} />
        <button onClick ={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
