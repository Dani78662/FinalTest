import React, { useEffect, useState } from 'react';
import { List, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('https://dummyjson.com/posts')
      .then(response => {
        setArticles(response.data.posts);
      })
      .catch(() => {
        message.error('Fail to load article');
      });
  }, [navigate]);

  return (
    <List
      dataSource={articles}
      renderItem={article => (
        <List.Item onClick={() => navigate(`/articles/${article.id}`)}>
          <List.Item.Meta
            title={article.title}
            description={article.body}
          />
        </List.Item>
      )}
    />
  );
};

export default ArticleListPage;
