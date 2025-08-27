// ✅ Replace with your own valid Google API key + CSE ID
const apiKey = "AIzaSyBcCKVpTmxE-vqvahaCCwn1KHJ2SgmaSsg";
const cx = "d08e404dc304e4de6"; // Custom Search Engine ID

// Search button click event
document.getElementById("search-btn").addEventListener("click", searchGoogle);

// Press Enter key to search
document.getElementById("search-input").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    searchGoogle();
  }
});

// Clear button click event
document.getElementById("clear-btn").addEventListener("click", function() {
  document.getElementById("search-input").value = ""; // clear input
  document.getElementById("results").innerHTML = "";  // clear results
});

// Main search function
function searchGoogle() {
  const query = document.getElementById("search-input").value.trim();

  if (query === "") {
    alert("Please enter a search term");
    return;
  }

  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      let output = "";

      if (data.items) {
        data.items.forEach(item => {
          output += `
            <p>
              <a href="${item.link}" target="_blank">${item.title}</a><br>
              ${item.snippet}
            </p>`;
        });
      } else {
        output = "<p>No results found</p>";
      }

      document.getElementById("results").innerHTML = output;
    })
    .catch(error => {
      console.error(error);
      document.getElementById("results").innerHTML = "<p>Error fetching results</p>";
    });
}
