document.addEventListener("DOMContentLoaded", function() {
  const addButton = document.querySelector(".btn-add");
  const popup = document.getElementById("popup");
  const cancelButton = document.querySelector(".btn-cancel");
  const form = document.querySelector("form");
  const libraryContainer = document.createElement("div");
  
  libraryContainer.className = "library-container";
  popup.after(libraryContainer); // Insert library container after the popup

  function Book(name, author, pages, status) {
      this.name = name;
      this.author = author;
      this.pages = pages;
      this.status = status;
  }

  function addBookToLibrary(book) {
      const bookEntry = document.createElement("div");
      bookEntry.className = "book-entry";

      bookEntry.innerHTML = `
          <p><strong>Title:</strong> ${book.name}</p>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Pages:</strong> ${book.pages}</p>
          <p><strong>Status:</strong> <span class="book-status">${book.status}</span></p>
          <button class="btn-update">Update Status</button>
          <button class="btn-remove">Remove Book</button>
      `;

      libraryContainer.appendChild(bookEntry);

      // Update Status functionality
      const updateButton = bookEntry.querySelector(".btn-update");
      const statusSpan = bookEntry.querySelector(".book-status");

      updateButton.addEventListener("click", function() {
          book.status = (book.status === "Read") ? "Not Read" : "Read";
          statusSpan.textContent = book.status;
      });

      // Remove Book functionality
      const removeButton = bookEntry.querySelector(".btn-remove");
      removeButton.addEventListener("click", function() {
          libraryContainer.removeChild(bookEntry);
      });
  }

  // Initially hide the popup
  popup.style.display = "none";

  // Show the popup when "Add Book" button is clicked
  addButton.addEventListener("click", function() {
      popup.style.display = "block";
  });

  // Hide the popup when "Cancel" button is clicked
  cancelButton.addEventListener("click", function() {
      popup.style.display = "none";
  });

  // Form validation and submission
  form.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent form submission by default
      
      const bookName = document.getElementById("book-name").value.trim();
      const authorName = document.getElementById("author").value.trim();
      const pages = document.getElementById("Pages").value.trim();
      const radioButtons = document.querySelectorAll("input[name='value-radio']");
      let status = "";

      // Check if any radio button is selected
      for (const radio of radioButtons) {
          if (radio.checked) {
              status = radio.nextElementSibling.textContent;
              break;
          }
      }

      // Validate form fields
      if (bookName === "" || authorName === "" || pages === "" || status === "") {
          alert("Please fill out all fields correctly.");
      } else {
          const newBook = new Book(bookName, authorName, pages, status);
          addBookToLibrary(newBook);
          popup.style.display = "none";
          form.reset(); // Reset form fields
      }
  });
});
