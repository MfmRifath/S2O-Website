import React, { useState, useEffect } from 'react';

export const AddEditArticle: React.FC = () => {
    const [articleId, setArticleId] = useState<number | null>(null);
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [authorQualification, setAuthorQualification] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState<string>(''); // Use string for input compatibility
    const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);
    const [selectedImage1, setSelectedImage1] = useState<string | ArrayBuffer | null>(null);
    const [selectedImage2, setSelectedImage2] = useState<string | ArrayBuffer | null>(null);

    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    useEffect(() => {
        if (articleId) {
            // Fetch the article data and populate the fields (this is just a placeholder example)
            // You need to implement the logic to fetch the article details and set the state accordingly
        }
    }, [articleId]);

    const base64ConversionForImages = (e: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.onerror = (error) => {
                console.error('Error reading file:', error);
            };
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value); // Set date as string
    };

    const submitArticle = async (e: React.FormEvent) => {
        e.preventDefault();

        const url = articleId
            ? `http://localhost:8080/api/articles/edit/article/${articleId}`
            : `http://localhost:8080/api/articles/add/article`;

        if (author && authorQualification && title && content && date && selectedImage && selectedImage1 && selectedImage2) {
            const article = {
                author,
                title,
                authorQualification,
                content,
                date, // Keep date as string
                img: selectedImage,
                img1: selectedImage1,
                img2: selectedImage2
            };

            const requestOptions: RequestInit = {
                method: articleId ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(article)
            };

            console.log('URL:', url);
            console.log('Request Options:', requestOptions);
            console.log('Article Data:', article); // Added for debugging

            try {
                const response = await fetch(url, requestOptions);
                if (!response.ok) {
                    throw new Error('Failed to add/update article');
                }
                setAuthor('');
                setTitle('');
                setAuthorQualification('');
                setContent('');
                setDate('');
                setSelectedImage(null);
                setSelectedImage1(null);
                setSelectedImage2(null);

                setDisplayWarning(false);
                setDisplaySuccess(true);
            } catch (error) {
                console.error('Error submitting article:', error);
                setDisplaySuccess(false);
                setDisplayWarning(true);
            }
        } else {
            setDisplayWarning(true);
        }
    };

    const formatDateForInput = (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="container mt-5 mb-5">
            {displaySuccess &&
                <div className="alert alert-success" role="alert">
                    Article added/updated successfully.
                </div>
            }
            {displayWarning &&
                <div className="alert alert-danger" role="alert">
                    All fields must be filled out.
                </div>
            }
            <div className="card">
                <div className="card-header">
                    {articleId ? 'Edit Article' : 'Add Article'}
                </div>
                <div className="card-body">
                    <form onSubmit={submitArticle}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Title</label>
                                <input type="text" className="form-control" name="title" required
                                    onChange={e => setTitle(e.target.value)} value={title} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Author</label>
                                <input type="text" className="form-control" name="author" required
                                    onChange={e => setAuthor(e.target.value)} value={author} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Author Qualification</label>
                                <input type="text" className="form-control" name="authorQualification" required
                                    onChange={e => setAuthorQualification(e.target.value)} value={authorQualification} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Published Date:</label>
                                <input type="date" className="form-control" name="date" required
                                    onChange={handleDateChange} value={formatDateForInput(date)} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Content</label>
                                <textarea rows={10} className="form-control" name="content" required
                                    onChange={e => setContent(e.target.value)} value={content} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Upload Image</label>
                                <input type="file" className="form-control" onChange={e => base64ConversionForImages(e, setSelectedImage)} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Upload Image1</label>
                                <input type="file" className="form-control" onChange={e => base64ConversionForImages(e, setSelectedImage1)} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Upload Image2</label>
                                <input type="file" className="form-control" onChange={e => base64ConversionForImages(e, setSelectedImage2)} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">
                            {articleId ? 'Update Article' : 'Add Article'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Add this line to make it a module
export {};
