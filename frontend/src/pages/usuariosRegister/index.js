import React from 'react'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeaderRegister'
import Forms3 from '@vb/widgets/Forms/formUser'
import './styles.css'

const UsersRegister = () => {
  return (
    <div className="card">
      <div className="card-header">
        <HeadersCardHeader data={{ title: 'Novo Usuário', route: '/users' }} />
      </div>
      <div className="card-body">
        <Forms3 />
      </div>
    </div>
  )
}

export default UsersRegister
