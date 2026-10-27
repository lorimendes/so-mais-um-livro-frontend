const baseUrl = "https://www.googleapis.com/books/v1/volumes";
const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

const getBooksBySearch = async (searchText, startIndex) => {
  const params = {
    q: "intitle:" + searchText,
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

  const res = await fetch(`${baseUrl}?${query}`);

  if (!res.ok) {
    console.log(res);
    const error = new Error("Falha ao pesquisar livros na API");
    error.status = res.status;
    throw error;
  }

  const data = await res.json();

  return data;
};

export { getBooksBySearch };
