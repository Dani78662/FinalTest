import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, message } from 'antd';
import axios from 'axios';

const ArticleDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/posts/${id}`)
      .then(response => {
        setArticle(response.data);
      })
      .catch(() => {
        message.error('Failed to load article');
      });
  }, [id]);

  if (!article) {
    return <Spin />;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
    </div>
  );
};

export default ArticleDetailPage;
