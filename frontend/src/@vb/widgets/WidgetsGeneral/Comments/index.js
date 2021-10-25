import React, { useState } from 'react'
import { Comment, Avatar, Form, Button, List, Input, Tooltip } from 'antd'
import { connect } from 'react-redux'
import moment from 'moment'

const { TextArea } = Input

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'respostas' : 'resposta'}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
)

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Enviar
      </Button>
    </Form.Item>
  </>
)

const mapStateToProps = ({ user }) => ({ user })

const CommentProject = ({ user }) => {
  const [comments, setComments] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState('')

  console.log('Comentarios', comments)

  const handleSubmit = () => {
    if (!value) {
      return
    }

    setSubmitting(true)

    setTimeout(() => {
      setSubmitting(false)
      setValue('')
      setComments([
        ...comments,
        {
          author: user.name,
          avatar: user.avatar,
          content: <p>{value}</p>,
          datetime: (
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment().fromNow()}</span>
            </Tooltip>
          ),
        },
      ])
    }, 100)

    setSubmitting(false)
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={<Avatar src={user.avatar} alt="Foto do Avatar" />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
            datetime={moment().fromNow()}
          />
        }
      />
    </div>
  )
}

export default connect(mapStateToProps)(CommentProject)
