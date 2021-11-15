import React from 'react'
import { Helmet } from 'react-helmet'
import FormsAddPost from '@vb/widgets/Forms/FormAddPost'

const CreatePost = () => {
  return (
    <div>
      <Helmet title="Novo post" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <FormsAddPost />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
