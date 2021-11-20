import React from 'react'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'

const List28 = () => {
  const history = useHistory()
  const goToCreatePost = () => {
    history.push('/dashboard/create-post')
  }

  return (
    <div>
      <Button className="btn-sucess" type="primary" onClick={goToCreatePost}>
        {' '}
        (+) Criar Post
      </Button>
      <br />
      {/* <div className="pb-4 mb-3 border-bottom">
        <label className="font-weight-bold d-block" htmlFor="search-input">
          <span className="mb-2 d-inline-block">Search Post</span>
          <input
            className="form-control width-100p"
            type="text"
            placeholder="Search post..."
            id="search-input"
          />
        </label>
      </div> */}
      {/* <div className="pb-4 border-bottom">
        <div className="font-weight-bold mb-2">Categories</div>
        <div>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="badge text-blue text-uppercase bg-light font-size-12 mr-2"
          >
            Umi
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="badge text-blue text-uppercase bg-light font-size-12 mr-2"
          >
            React-framework
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="badge text-blue text-uppercase bg-light font-size-12 mr-2"
          >
            Umijs
          </a>
        </div>
      </div> */}
    </div>
  )
}

export default List28
