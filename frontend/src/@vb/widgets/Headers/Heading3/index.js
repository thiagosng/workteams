import React from 'react'

const Heading = ({ data }) => {
  return (
    <div className="vb__utils__heading">
      <strong className="mr-3">{data.title}</strong>
    </div>
  )
}

Heading.defaultProps = {
  data: {
    title: 'Header with button',
  },
}

export default Heading
