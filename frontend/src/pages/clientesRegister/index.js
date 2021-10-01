import React from 'react'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeaderRegister'
import Forms3 from '@vb/widgets/Forms/formClient'

const ClientesRegister = () => {
  return (
    <div className="card">
      <div className="card-header">
        <HeadersCardHeader data={{ title: 'Novo cliente', route: '/clients' }} />
      </div>
      <div className="card-body">
        <Forms3 />
      </div>
    </div>
  )
}

export default ClientesRegister
