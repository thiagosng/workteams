import React from 'react'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeaderEditer'
import FormClientEditer from '@vb/widgets/Forms/formClientEditer'
import './styles.css'

const ClientesEditer = () => {
  return (
    <div className="card">
      <div className="card-header">
        <HeadersCardHeader data={{ title: 'Editar cliente' }} />
      </div>
      <div className="card-body">
        <FormClientEditer />
      </div>
    </div>
  )
}

export default ClientesEditer
