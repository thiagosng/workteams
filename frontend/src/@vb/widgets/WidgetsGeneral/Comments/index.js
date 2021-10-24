import React, { useState } from 'react'
import { Comment, Avatar, Form, Button, List, Input } from 'antd'
import moment from 'moment'

const { TextArea } = Input

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
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
        Add Comment
      </Button>
    </Form.Item>
  </>
)

const CommentProject = () => {
  const [comments, setComments] = useState([{}])
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState('')

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
          author: 'Han Solo',
          avatar: 'https://joeschmoe.io/api/v1/random',
          content: <p>{value}</p>,
          datetime: moment().fromNow(),
        },
      ])
    }, 1000)

    setSubmitting(false)
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
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

export default CommentProject
// class CommentProject extends React.Component {
//   state = {
//     comments: [],
//     submitting: false,
//     value: '',
//   };

//   handleSubmit = () => {
//     if (!this.state.value) {
//       return;
//     }

//     this.setState({
//       submitting: true,
//     });

//     setTimeout(() => {
//       this.setState({
//         submitting: false,
//         value: '',
//         comments: [
//           ...this.state.comments,
//           {
//             author: 'Han Solo',
//             avatar: 'https://joeschmoe.io/api/v1/random',
//             content: <p>{this.state.value}</p>,
//             datetime: moment().fromNow(),
//           },
//         ],
//       });
//     }, 1000);
//   };

//   handleChange = e => {
//     this.setState({
//       value: e.target.value,
//     });
//   };

//   render() {
//     const { comments, submitting, value } = this.state;

//     return (
//       <>
//         {comments.length > 0 && <CommentList comments={comments} />}
//         <Comment
//           avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
//           content={
//             <Editor
//               onChange={this.handleChange}
//               onSubmit={this.handleSubmit}
//               submitting={submitting}
//               value={value}
//             />
//           }
//         />
//       </>
//     );
//   }
// }

// export default CommentProject
