import React, { useState, useEffect } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { Input, Form, notification, Spin } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import { SmileOutlined, LoadingOutlined } from '@ant-design/icons'
import { createPost, updatePost, getPostsDataId } from 'services/posts'
import { connect } from 'react-redux'

const mapStateToProps = ({ user }) => ({ user })

const FormAddPost = ({ user }) => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    createdBy: user.name,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [updatePosts, setUpdatePost] = useState('')
  const { id } = useParams()
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  const history = useHistory()

  const getPostsId = async () => {
    try {
      const posts = await getPostsDataId(id)
      setUpdatePost(posts)
      if (posts) {
        setIsLoading(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const editPost = async () => {
    try {
      const response = await updatePost(id, updatePosts)
      if (!response.error) {
        openNotification()
        history.push('/dashboard')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const openNotification = () => {
    notification.open({
      message: 'Sucesso',
      description: id ? 'Post atualizado com sucesso!' : 'Post criado com sucesso',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    })
  }

  const newPost = async () => {
    try {
      const response = await createPost(post)
      console.log(response)
      if (!response.error) {
        openNotification()
        history.push('/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    if (id) {
      getPostsId()
    } else {
      setIsLoading(false)
    }
  }, [])

  console.log('posts', post)
  console.log('updatePosts', updatePosts)
  return !isLoading ? (
    <Form layout="vertical">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <Form.Item name="title" label="Titulo">
              <Input
                placeholder="Post title"
                defaultValue={post.title}
                onChange={
                  id
                    ? (e) => {
                        setUpdatePost({ ...updatePosts, title: e.target.value })
                      }
                    : (e) => {
                        setPost({ ...post, title: e.target.value })
                      }
                }
              />
            </Form.Item>
          </div>
        </div>
      </div>
      <div className="form-group">
        <Form.Item name="content" label="Conteúdo">
          <Editor
            editorClassName="px-3 border border-gray-2"
            editorStyle={{
              height: 250,
              overflow: 'auto',
            }}
            onChange={
              id
                ? (editorState) => {
                    setUpdatePost({
                      ...updatePosts,
                      content: editorState.blocks.map((block) => block.text).join('\n'),
                    })
                  }
                : (editorState) => {
                    setPost({
                      ...post,
                      content: editorState.blocks.map((block) => block.text).join('\n'),
                    })
                  }
            }
          />
        </Form.Item>
      </div>
      <Form.Item>
        <button
          type="submit"
          className="btn btn-success btn-with-addon text-nowrap"
          onClick={id ? editPost : newPost}
        >
          <span className="btn-addon">
            <i className="btn-addon-icon fe fe-plus-circle" />
          </span>
          Adicionar Post
        </button>
      </Form.Item>
    </Form>
  ) : (
    <Spin indicator={antIcon} />
  )
}

export default connect(mapStateToProps)(FormAddPost)
