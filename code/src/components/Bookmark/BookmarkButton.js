import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookmarkButton = ({ pageTitle }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get('http://localhost:1338/api/users');
        // Assuming you want to use the first user in the list
        const firstUser = response.data[0];
        setUserId(firstUser.id);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  const handleBookmark = async () => {
    if (!userId) {
      console.error('User ID not available');
      return;
    }

    try {
      const response = await axios.post('http://localhost:1338/api/bookmarks', {
        data: {
          title: pageTitle,
          user: userId, // Update this to match your Strapi model field for user relation
        },
      });
      console.log('Bookmark saved:', response.data);
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
  };

  return (
    <button onClick={handleBookmark} disabled={!userId}>
      Bookmark this page
    </button>
  );
};

export default BookmarkButton;
