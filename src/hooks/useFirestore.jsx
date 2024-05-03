import { useEffect, useState } from 'react';
import { firestoreApp } from '../config/firebase-config'; 

export const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);
  const [error, setError] = useState(null); // Add state for error handling

  useEffect(() => {
    const unsubscribe = firestoreApp.collection(collection).onSnapshot(
      (snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      },
      (err) => { // Error handling callback
        setError(err); // Set error state on error
      }
    );

    return () => unsubscribe();
  }, [collection]);

  return { docs, error };
};