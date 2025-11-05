import { useState } from "react";
import "./index.css";

function App() {
  // Initial book list
  const [books, setBooks] = useState([
    { id: 1, title: "1984", author: "George Orwell" },
    { id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee" },
  ]);

  const [search, setSearch] = useState(""); // for filtering books
  const [newTitle, setNewTitle] = useState(""); // input for new book title
  const [newAuthor, setNewAuthor] = useState(""); // input for new book author

  // Handle adding a book
  const addBook = () => {
    if (newTitle.trim() && newAuthor.trim()) {
      const newBook = {
        id: Date.now(),
        title: newTitle,
        author: newAuthor,
      };
      setBooks([...books, newBook]);
      setNewTitle("");
      setNewAuthor("");
    }
  };

  // Handle removing a book
  const removeBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  // Filtered list of books
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="library">
      <h2>Library Management</h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search by title or author"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add Book Form */}
      <div className="add-book">
        <input
          type="text"
          placeholder="New book title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="New book author"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />
        <button onClick={addBook}>Add Book</button>
      </div>

      {/* Book List */}
      <ul className="book-list">
        {filteredBooks.map((book) => (
          <li key={book.id}>
            <span>
              <strong>{book.title}</strong> by {book.author}
            </span>
            <button onClick={() => removeBook(book.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;