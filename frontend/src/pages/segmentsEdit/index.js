import React from 'react'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeaderEditer'
import FormSegmentEdit from '@vb/widgets/Forms/formSegmentEdit'
import './styles.css'

const ClientesEditer = () => {
  return (
    <div className="card">
      <div className="card-header">
        <HeadersCardHeader data={{ title: 'Editar Segmento' }} />
      </div>
      <div className="card-body">
        <FormSegmentEdit />
      </div>
    </div>
  )
}

export default ClientesEditer
