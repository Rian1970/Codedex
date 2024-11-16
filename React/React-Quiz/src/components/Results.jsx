import React, { useContext } from 'react';
import { UserContext } from './UserContext';

export default function Results({ element, artwork, loading }) {
  // reference the context for the "name".
  const { name } = useContext(UserContext);

  return ( //Show the user name, the element and a random image from the dog api
    <div>
      <p>
        <strong>{name}</strong>, your element is: {element} 
      </p>
      {artwork ? (
        <div className="artwork">
          <img src={artwork.message} alt="image-dog-api" />
        </div>
      ) : (
        <p>{loading ? "Fetching..." : "No artwork found."}</p>
      )}
    </div>
  );
}