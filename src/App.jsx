import { useState } from "react";
import BookCard from "./components/BookCard";
import NewButton from "./components/NewButton";
import Modal from "./components/Modal";
import booksData from "../data/books.json"; 
import "./App.css";

export default function App() {
  const [books, setBooks] = useState(booksData); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    year: "",
    language: "",
    pages: "",
  });

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new book
  const handleSubmit = (e) => {
    e.preventDefault();
    setBooks((prev) => [
      ...prev,
      {
        title: formData.title,
        price: "N/A",
        image: "", 
        link: "#",
      },
    ]);
    setIsModalOpen(false);
    setFormData({
      title: "",
      author: "",
      publisher: "",
      year: "",
      language: "",
      pages: "",
    });
  };

  // Remove book
  const handleRemoveBook = (index) => {
    setBooks((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <header>
        <h1>Book Catalog</h1>
      </header>

      <div className="catalog">
        <NewButton onClick={() => setIsModalOpen(true)} />

        <div className="books-grid">
          {books.map((book, i) => (
            <BookCard
              key={i}
              title={book.title}
              price={book.price}
              image={book.image}
              link={book.url || book.link}
              onRemove={() => handleRemoveBook(i)}
            />
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Add New Book</h2>
        <form onSubmit={handleSubmit} className="book-form">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="author">Author:</label>
          <input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />

          <label htmlFor="publisher">Publisher:</label>
          <input
            id="publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
          />

          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />

          <label htmlFor="language">Language:</label>
          <input
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
          />

          <label htmlFor="pages">Pages:</label>
          <input
            type="number"
            id="pages"
            name="pages"
            value={formData.pages}
            onChange={handleChange}
          />

          <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            <button type="submit">Save</button>
          </div>
        </form>
      </Modal>

      <footer>
        <p>&copy; Sharleen Wang 2025</p>
      </footer>
    </>
  );
}
