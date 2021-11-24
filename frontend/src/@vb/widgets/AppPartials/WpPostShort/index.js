import React, { useState, useEffect } from 'react'
import { Menu, Dropdown, Pagination, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { getPostsData, deletePost } from 'services/posts'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

const WpPostShort = () => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(5)
  const [isDelete, setIsDelete] = useState(false)
  const history = useHistory()

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  console.log('Quantidade de posts', posts.length)

  const getAllPosts = async () => {
    const post = await getPostsData()
    setPosts(post)
  }

  const postagens = currentPosts.map((post) => {
    // const GoToEdit = () => {
    //   history.push(`/dashboard/update/${post.id}`)
    // }

    console.log('post', post.id)

    function showDeleteConfirm() {
      Modal.confirm({
        title: 'Você deseja mesmo deletar essa postagem?',
        icon: <ExclamationCircleOutlined />,
        content: 'A postagem será deletada de forma permanente',
        okText: 'Deletar',
        okType: 'danger',
        cancelText: 'Cancelar',
        onOk() {
          try {
            deletePost(post.id)
            setIsDelete(true)
          } catch (error) {
            console.log(error)
          }
        },
        onCancel() {
          console.log('Cancel')
        },
      })
    }
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <div className="text-right">
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>
                      <a
                        onClick={() => history.push(`/posts/update/${post.id}`)}
                        onKeyPress={() => history.push(`/posts/update/${post.id}`)}
                        role="button"
                        tabIndex={0}
                      >
                        Editar
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        onClick={showDeleteConfirm}
                        onKeyPress={showDeleteConfirm}
                        role="button"
                        tabIndex={0}
                      >
                        Deletar
                      </a>
                    </Menu.Item>
                  </Menu>
                }
                placement="bottomRight"
              >
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
              em {moment(post.createdAt).format('YYYY-MM-DD HH:mm:ss')}
            </div>
            <div>
              <p>{post.content}</p>
            </div>
          </div>
        </div>
      </div>
    )
  })

  useEffect(() => {
    getPostsData().then((res) => {
      setPosts(res)
    })
    getAllPosts()
    setIsDelete(false)
  }, [isDelete])

  return (
    <div className="wp-post-short">
      <div className="wp-post-short__list">{postagens}</div>
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
