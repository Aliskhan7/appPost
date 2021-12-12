import React from 'react'
import { getPagesArray } from '../../../utils/pages'

function Pagination ({totalPages, page, changePage}) {
  const pagesArray = getPagesArray(totalPages)
  return (
    <div className='page_count'>
      {pagesArray.map(p => {
    return(
      <span
        onClick={() => changePage(p)}
        key={p}
        className={page === p ? 'page page_active' : 'page'}
      >
            {p}
          </span>
      )

      })}
    </div>
  )
}

export default Pagination