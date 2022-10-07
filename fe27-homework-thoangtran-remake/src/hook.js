import { useState } from "react"

export const usePagination = (data, itemsPerPage) => {
  // const [dataPerPage, setDataPerPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = Math.ceil(data.length / itemsPerPage);

  const jumpPage = (nextPage) => {
    if(nextPage === currentPage) return;
    setCurrentPage(nextPage);
  }

  const currentData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataPerPage = data.slice(startIndex, endIndex);
    return dataPerPage;
  }

  return {
    jumpPage,
    dataPerPage: currentData(),
    currentPage,
    maxPage
  }
}