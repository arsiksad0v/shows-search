import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Show {
  id: number;
  name: string;
  summary: string;
  image: { medium: string; original: string };
}

const ShowDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<Show | null>(null);

  useEffect(() => {
    const fetchShow = async () => {
      const response = await axios.get(`http://api.tvmaze.com/shows/${id}`);
      setShow(response.data);
    };

    fetchShow();
  }, [id]);

  return (
    <div>
      {show ? (
        <>
          <h1>{show.name}</h1>
          <img src={show.image.medium} alt={show.name} />
          <div dangerouslySetInnerHTML={{ __html: show.summary }} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ShowDetail;