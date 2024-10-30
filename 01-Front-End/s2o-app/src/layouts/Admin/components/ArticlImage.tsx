import React, { useEffect, useState } from "react";

interface ImageData {
  url: string;
}

const ArticleImages: React.FC<{ articleId: number }> = ({ articleId }) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/images/article/${articleId}`
        );
        if (!response.ok) throw new Error("Failed to fetch images");

        const data: string[] = await response.json();
        const imageObjects = data.map((url) => ({ url })); // Create objects with `url` property for each URL
        setImages(imageObjects);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [articleId]);

  return (
    <div>
      {loading ? (
        <p>Loading images...</p>
      ) : (
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {images.length > 0 ? (
            images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Article ${articleId} Image ${index + 1}`}
                width="100"
                height="100"
                style={{ borderRadius: "8px", objectFit: "cover" }}
              />
            ))
          ) : (
            <p>No images available for this article.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleImages;
