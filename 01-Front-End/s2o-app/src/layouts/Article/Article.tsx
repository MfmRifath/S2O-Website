import React, { useEffect, useState } from 'react';

import HeadofArticlePage from './HeadofArticlePage';
import Content from './content';
import ArticleModal from '../../Model/ArticleModal';

export const Article: React.FC = () => {
  const [articles, setArticles] = useState<ArticleModal[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/articles/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ArticleModal[] = await response.json();

        // Sort articles by date in descending order
        const sortedArticles = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setArticles(sortedArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <HeadofArticlePage />
      {articles.map((article, index) => (
        <Content
          key={index}
          articleId={article.articleId}
          title={article.title}
          author={article.author}
          authorQualification={article.authorQualification}
          date={article.date}
          content={article.content}
          img={article.img}
          img1={article.img1}
          img2={article.img2}
        />
      ))}
    </>
  );
};

export default Article;
