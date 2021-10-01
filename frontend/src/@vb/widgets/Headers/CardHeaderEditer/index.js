import React from 'react'

const Header = ({ data }) => {
  return (
    <div className="card-header-flex">
      <div className="d-flex flex-column justify-content-center mr-auto">
        <h5 className="mb-0">
          <strong>{data.title}</strong>
        </h5>
      </div>
    </div>
  )
}

Header.defaultProps = {
  data: {
    title: 'With dropdown',
  },
}

export default Header
