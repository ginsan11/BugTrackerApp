import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div className="ms-auto">
        <span className="me-1">Made by</span>
        <a href="https://portfolio-website-ginsan11.vercel.app/" target="_blank" rel="noopener noreferrer">
          Hervé
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
