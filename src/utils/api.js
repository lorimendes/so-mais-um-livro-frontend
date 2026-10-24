const baseUrl = "https://www.googleapis.com/books/v1/volumes";
const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

const getBooksBySearch = async (searchText, startIndex) => {
  const params = {
    q: searchText,
    printType: "books",
    maxResults: 3,
    startIndex: startIndex,
    project: "lite",
    orderBy: "relevance",
  };

  if (apiKey) {
    params.key = apiKey;
  }

  const query = new URLSearchParams(params).toString();

  try {
    const res = await fetch(`${baseUrl}?${query}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getBooksBySearch };
