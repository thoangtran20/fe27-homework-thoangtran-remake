import { useCallback } from 'react'
import './style.scss'

function Pagination(props) {
  const { currentPage, maxPage, jumpPage } = props

  const renderPageNumber = useCallback(() => {
    return (
      <>
        {Array.apply(null, { length: maxPage }).map((item, index) => {
          const page = index + 1
          console.log(index)
          console.log('ádasdfsdf')
          return (
            <div
              onClick={() => jumpPage(page)}
              className={`pagination-item ${
                currentPage === page ? 'active' : ''
              }`}
            >
              {page}
            </div>
          )
        })}
      </>
    )
  }, [maxPage, currentPage])

  const handlePreviousPage = () => {
    if (currentPage === 1) return

    jumpPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage === maxPage) return
    jumpPage(currentPage + 1)
  }

  return (
    <div className="pagination">
      <div onClick={handlePreviousPage} className="pagination-item">
        {'<'}
      </div>
      <>{renderPageNumber()}</>
      <div onClick={handleNextPage} className="pagination-item">
        {'>'}
      </div>
    </div>
  )
}

export default Pagination
