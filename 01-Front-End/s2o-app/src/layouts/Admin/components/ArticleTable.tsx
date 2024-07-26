import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ArticleModal from '../../../Model/ArticleModal';

const ArticleTable: React.FC = () => {
  const [articles, setArticles] = useState<ArticleModal[]>([]);
  const [editArticleId, setEditArticleId] = useState<number | null>(null);
  const [editedArticle, setEditedArticle] = useState<Partial<ArticleModal>>({});
  const [expandedContentIds, setExpandedContentIds] = useState<Set<number>>(new Set());

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articlesPerPage] = useState<number>(5); // Change this to the number of articles per page

  const API_URL = 'http://localhost:8080/api/articles';
 
  const getAllArticles = async (): Promise<ArticleModal[]> => {
    const response = await fetch(`${API_URL}/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    return response.json();
  };

  const deleteArticle = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/delete/article/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete article');
    }
  };

  const updateArticle = async (articleId: number, article: Partial<ArticleModal>): Promise<void> => {
    const response = await fetch(`${API_URL}/edit/article/${articleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    });
    if (!response.ok) {
      throw new Error('Failed to update article');
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const articles = await getAllArticles();
      setArticles(articles);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (articleId: number) => {
    try {
      await deleteArticle(articleId);
      setArticles(articles.filter(article => article.articleId !== articleId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (article: ArticleModal) => {
    setEditArticleId(article.articleId);
    setEditedArticle(article);
  };

  const handleUpdate = async () => {
    if (editArticleId !== null) {
      try {
        await updateArticle(editArticleId, editedArticle);
        setEditArticleId(null);
        fetchArticles();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedArticle({ ...editedArticle, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedArticle({ ...editedArticle, [name]: reader.result as string });
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const toggleContentExpansion = (articleId: number) => {
    const newExpandedContentIds = new Set(expandedContentIds);
    if (newExpandedContentIds.has(articleId)) {
      newExpandedContentIds.delete(articleId);
    } else {
      newExpandedContentIds.add(articleId);
    }
    setExpandedContentIds(newExpandedContentIds);
  };

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <h1>Article Table</h1>
      <StyledTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Author</th>
            <th>Title</th>
            <th>Content</th>
            <th>Date</th>
            <th>Author Qualification</th>
            <th>Img</th>
            <th>Img1</th>
            <th>Img2</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentArticles.map(article => (
            <tr key={article.articleId}>
              <td>{article.articleId}</td>
              <td>{editArticleId === article.articleId ? <input name="author" value={editedArticle.author || ''} onChange={handleChange} /> : article.author}</td>
              <td>{editArticleId === article.articleId ? <input name="title" value={editedArticle.title || ''} onChange={handleChange} /> : article.title}</td>
              <td>
                {editArticleId === article.articleId ? (
                  <textarea className='cont2' name="content" value={editedArticle.content || ''} onChange={handleChange} />
                ) : (
                  <>
                    {expandedContentIds.has(article.articleId) ? article.content : `${article.content.substring(0, 100)}...`}
                    {article.content.length > 100 && (
                      <ReadMoreButton onClick={() => toggleContentExpansion(article.articleId)}>
                        {expandedContentIds.has(article.articleId) ? 'Read Less' : 'Read More'}
                      </ReadMoreButton>
                    )}
                  </>
                )}
              </td>
              <td>{editArticleId === article.articleId ? <input name="date" value={editedArticle.date ? new Date(editedArticle.date).toISOString().substring(0, 10) : ''} onChange={handleChange} /> : new Date(article.date).toISOString().substring(0, 10)}</td>
              <td>{editArticleId === article.articleId ? <input name="authorQualification" value={editedArticle.authorQualification || ''} onChange={handleChange} /> : article.authorQualification}</td>
              <td>
                {editArticleId === article.articleId ? (
                  <>
                    <input type="file" name="img" accept="image/*" onChange={handleImageChange} />
                    {editedArticle.img && <img src={editedArticle.img} alt="Preview" width="50" />}
                  </>
                ) : (
                  <img src={article.img} alt="Article" width="50" />
                )}
              </td>
              <td>
                {editArticleId === article.articleId ? (
                  <>
                    <input type="file" name="img1" accept="image/*" onChange={handleImageChange} />
                    {editedArticle.img1 && <img src={editedArticle.img1} alt="Preview" width="50" />}
                  </>
                ) : (
                  <img src={article.img1} alt="Article" width="50" />
                )}
              </td>
              <td>
                {editArticleId === article.articleId ? (
                  <>
                    <input type="file" name="img2" accept="image/*" onChange={handleImageChange} />
                    {editedArticle.img2 && <img src={editedArticle.img2} alt="Preview" width="50" />}
                  </>
                ) : (
                  <img src={article.img2} alt="Article" width="50" />
                )}
              </td>
              <td>
                {editArticleId === article.articleId ? (
                  <ActionButton onClick={handleUpdate}>Save</ActionButton>
                ) : (
                  <>
                    <ActionButton onClick={() => handleEdit(article)}>Edit</ActionButton>
                    <ActionButton onClick={() => handleDelete(article.articleId)}>Delete</ActionButton>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            active={index + 1 === currentPage}
          >
            {index + 1}
          </PageButton>
        ))}
      </Pagination>
    </Container>
  );
};

export default ArticleTable;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
  text-align: left;

  th, td {
    padding: 12px 15px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }

  tbody tr:nth-of-type(even) {
    background-color: #f9f9f9;
  }

  tbody tr:hover {
    background-color: #f1f1f1;
  }

  input[type="file"] {
    display: none;
  }

  img {
    display: block;
    margin: 10px 0;
  }
`;

const ActionButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }

  &:first-of-type {
    background-color: #2196F3;

    &:hover {
      background-color: #0b7dda;
    }
  }

  &:last-of-type {
    background-color: #f44336;

    &:hover {
      background-color: #da190b;
    }
  }
`;

const ReadMoreButton = styled.button`
  background: none;
  border: none;
  color: #2196F3;
  cursor: pointer;
  font-size: 14px;
  margin-left: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button<{ active?: boolean }>`
  background-color: ${props => (props.active ? '#2196F3' : '#f4f4f4')};
  color: ${props => (props.active ? 'white' : '#2196F3')};
  border: 1px solid #ddd;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;

  &:hover {
    background-color: ${props => (props.active ? '#0b7dda' : '#e0e0e0')};
  }
`;
