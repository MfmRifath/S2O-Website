import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

interface Image {
  url: string;
  keyName: string;
}

interface ArticleModal {
  articleId: number;
  author: string;
  title: string;
  content: string;
  date: string;
  images: Image[]; // Add the images property here
}

const Spinner = () => <StyledSpinner>Loading...</StyledSpinner>;

const ArticleTable: React.FC = () => {
  const [articles, setArticles] = useState<ArticleModal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articlesPerPage] = useState<number>(5);

  const API_URL = "http://localhost:8080/api/articles";

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get<ArticleModal[]>(`${API_URL}/all`, {
        timeout: 5000,
      });
      setArticles(response.data);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
      alert("Unable to load articles. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <Container>
      <Title>Article Table</Title>
      {loading ? (
        <Spinner />
      ) : (
        <StyledTable>
          <thead>
            <tr>
              <th>ID</th>
              <th>Author</th>
              <th>Title</th>
              <th>Content</th>
              <th>Images</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentArticles.map((article) => (
              <StyledRow key={article.articleId}>
                <td>{article.articleId}</td>
                <td>{article.author}</td>
                <td>{article.title}</td>
                <td>{article.content.substring(0, 100)}...</td>
                <td>
                  <ImageContainer>
                    {article.images && article.images.length > 0 ? (
                      article.images.map((image: Image, index: number) => (
                        <img
                          key={index}
                          src={image.url}
                          alt={`Article ${article.articleId} - Image ${
                            index + 1
                          }`}
                          width="50"
                          height="50"
                          onError={(e) =>
                            (e.currentTarget.src =
                              "/path/to/fallback-image.jpg")
                          }
                        />
                      ))
                    ) : (
                      <span>No Images</span>
                    )}
                  </ImageContainer>
                </td>
                <td>{new Date(article.date).toLocaleDateString()}</td>
              </StyledRow>
            ))}
          </tbody>
        </StyledTable>
      )}
      <Pagination>
        <PageButton
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </PageButton>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageButton
            key={i}
            $active={i + 1 === currentPage}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </PageButton>
        ))}
        <PageButton
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Next
        </PageButton>
      </Pagination>
    </Container>
  );
};

export default ArticleTable;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  color: #4caf50;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
  text-align: left;
  th,
  td {
    padding: 12px 15px;
    border: 1px solid #ddd;
  }
  th {
    background-color: #e8f5e9;
    color: #388e3c;
  }
  tbody tr:nth-of-type(even) {
    background-color: #f9f9f9;
  }
  tbody tr:hover {
    background-color: #f1f1f1;
  }
`;

const StyledRow = styled.tr``;

const ImageContainer = styled.div`
  display: flex;
  gap: 5px;
  overflow-x: auto;
  max-width: 150px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    object-fit: cover;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  background-color: ${({ $active }) => ($active ? "#2196F3" : "#f4f4f4")};
  color: ${({ $active }) => ($active ? "white" : "#2196F3")};
  border: 1px solid #ddd;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: ${({ $active }) => ($active ? "#0b7dda" : "#e0e0e0")};
  }
`;

const StyledSpinner = styled.div`
  margin: 20px auto;
  text-align: center;
  font-size: 18px;
  color: #4caf50;
`;
