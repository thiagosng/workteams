import React, { useState, useEffect } from 'react'
import { Menu, Dropdown, Pagination } from 'antd'
import { getPostsData } from 'services/posts'
import moment from 'moment'

const WpPostShort = () => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(5)

  useEffect(() => {
    getPostsData().then((res) => {
      setPosts(res)
    })
  }, [])

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  console.log('Quantidade de posts', posts.length)

  const getAllPosts = async () => {
    const post = await getPostsData()
    setPosts(post)
  }

  const dropdownMenu = (
    <Menu>
      <Menu.Item>
        <a>Editar</a>
      </Menu.Item>
      <Menu.Item>
        <a>Deletar</a>
      </Menu.Item>
    </Menu>
  )

  useEffect(() => {
    getAllPosts()
  }, [])

  return (
    <div className="wp-post-short">
      <div className="wp-post-short__list">
        {currentPosts.map((post) => (
          <div>
            <div className="card">
              <div className="card-body">
                <div className="text-right">
                  <Dropdown overlay={dropdownMenu} placement="bottomRight">
                    <button type="button" className="btn btn-light">
                      <i className="fe fe-more-vertical" />
                    </button>
                  </Dropdown>
                </div>
                <div className="mb-2">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-dark font-size-24 font-weight-bold"
                  >
                    {post.title}
                  </a>
                </div>
                <div className="mb-3">
                  <a className="font-weight-bold" href="#" onClick={(e) => e.preventDefault()}>
                    {post.createdBy}
                  </a>{' '}
                  Post publicado em {moment(post.createdAt).format('YYYY-MM-DD 00:00:00')}
                </div>
                <div>
                  <p>{post.content}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="wp-post-short__pagination">
        <Pagination
          defaultCurrent={1}
          total={posts.length}
          onChange={paginate}
          pageSize={postsPerPage}
        />
      </div>
    </div>
  )
}
export default WpPostShort
