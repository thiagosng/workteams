import React from 'react'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeaderEditer'
import FormSegmentEdit from '@vb/widgets/Forms/formUserEdit'
import './styles.css'

const UsersEdit = () => {
  return (
    <div className="card">
      <div className="card-header">
        <HeadersCardHeader data={{ title: 'Editar Usuario' }} />
      </div>
      <div className="card-body">
        <FormSegmentEdit />
      </div>
    </div>
  )
}

export default UsersEdit
