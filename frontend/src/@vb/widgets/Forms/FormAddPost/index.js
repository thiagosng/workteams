import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { Input, Form, notification } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import { SmileOutlined } from '@ant-design/icons'
import { createPost } from 'services/posts'
import { connect } from 'react-redux'

const mapStateToProps = ({ user }) => ({ user })

const FormAddPost = ({ user }) => {
  const [post, setPost] = useState({
    title: '',
    content: 'teste',
    createdBy: user.name,
  })

  const { id } = useParams()

  const history = useHistory()

  const onEditorStateChange = (editorState) => {
    setPost({
      ...post,
      content: editorState.blocks.map((block) => block.text).join('\n'),
    })
  }

  const onChange = (e) => {
    setPost({
      ...post,
      title: e.target.value,
    })
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

  console.log('posts', post)
  return (
    <Form layout="vertical">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <Form.Item name="title" label="Titulo">
              <Input placeholder="Post title" defaultValue={post.title} onChange={onChange} />
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
            onChange={onEditorStateChange}
          />
        </Form.Item>
      </div>
      <Form.Item>
        <button
          type="submit"
          className="btn btn-success btn-with-addon text-nowrap"
          onClick={newPost}
        >
          <span className="btn-addon">
            <i className="btn-addon-icon fe fe-plus-circle" />
          </span>
          Adicionar Post
        </button>
      </Form.Item>
    </Form>
  )
}

export default connect(mapStateToProps)(FormAddPost)
