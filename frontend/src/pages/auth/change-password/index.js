import React from 'react'
import { Helmet } from 'react-helmet'
import ChangePassword from '@vb/components/Auth/ChangePassword'

const SystemChangePassword = () => {
  return (
    <div>
      <Helmet title="Alterar senha" />
      <ChangePassword />
    </div>
  )
}

export default SystemChangePassword
