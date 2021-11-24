import React, { lazy, Suspense } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import Layout from 'layouts'

const routes = [
  // VB:REPLACE-START:ROUTER-CONFIG
  {
    path: '/dashboard',
    Component: lazy(() => import('pages/dashboard')),
    exact: true,
  },
  {
    path: '/dashboard/create-post',
    Component: lazy(() => import('pages/postsCreate')),
    exact: true,
  },
  {
    path: '/posts/update/:id',
    Component: lazy(() => import('pages/postsCreate')),
    exact: true,
  },
  // ROTAS DE USUÁRIOS
  {
    path: '/users',
    Component: lazy(() => import('pages/usuarios')),
    exact: true,
  },
  {
    path: '/users/register',
    Component: lazy(() => import('pages/usuariosRegister')),
    exact: true,
  },
  {
    path: '/users/update/:id',
    Component: lazy(() => import('pages/usuariosRegister')),
    exact: true,
  },
  // ROTAS DE SEGMENTOS
  {
    path: '/department',
    Component: lazy(() => import('pages/departments')),
    exact: true,
  },
  {
    path: '/department/register',
    Component: lazy(() => import('pages/departmentsRegister')),
    exact: true,
  },
  {
    path: '/department/update/:id',
    Component: lazy(() => import('pages/departmentsRegister')),
    exact: true,
  },
  {
    path: '/userProfile',
    Component: lazy(() => import('pages/userProfile')),
    exact: true,
  },
  {
    path: '/projects',
    Component: lazy(() => import('pages/projects')),
    exact: true,
  },
  {
    path: '/projects/details/:id',
    Component: lazy(() => import('pages/projectsDetails')),
    exact: true,
  },
  {
    path: '/projects/register/',
    Component: lazy(() => import('pages/projectsRegister')),
    exact: true,
  },
  {
    path: '/projects/update/:id',
    Component: lazy(() => import('pages/projectsRegister')),
    exact: true,
  },

  // VB:REPLACE-END:ROUTER-CONFIG
  {
    path: '/auth/login',
    Component: lazy(() => import('pages/auth/login')),
    exact: true,
  },
  {
    path: '/auth/forgot-password',
    Component: lazy(() => import('pages/auth/forgot-password')),
    exact: true,
  },
  {
    path: '/auth/change-password',
    Component: lazy(() => import('pages/auth/change-password')),
    exact: true,
  },
  {
    path: '/auth/register',
    Component: lazy(() => import('pages/auth/register')),
    exact: true,
  },
  {
    path: '/auth/lockscreen',
    Component: lazy(() => import('pages/auth/lockscreen')),
    exact: true,
  },
  {
    path: '/auth/404',
    Component: lazy(() => import('pages/auth/404')),
    exact: true,
  },
  {
    path: '/auth/500',
    Component: lazy(() => import('pages/auth/500')),
    exact: true,
  },
]

const mapStateToProps = ({ settings }) => ({
  routerAnimation: settings.routerAnimation,
})

const Router = ({ history, routerAnimation }) => {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Route
          render={(state) => {
            const { location } = state
            return (
              <SwitchTransition>
                <CSSTransition
                  key={location.pathname}
                  appear
                  classNames={routerAnimation}
                  timeout={routerAnimation === 'none' ? 0 : 300}
                >
                  <Switch location={location}>
                    {/* VB:REPLACE-NEXT-LINE:ROUTER-REDIRECT */}
                    <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
                    {routes.map(({ path, Component, exact }) => (
                      <Route
                        path={path}
                        key={path}
                        exact={exact}
                        render={() => {
                          return (
                            <div className={routerAnimation}>
                              <Suspense fallback={null}>
                                <Component />
                              </Suspense>
                            </div>
                          )
                        }}
                      />
                    ))}
                    <Redirect to="/auth/404" />
                  </Switch>
                </CSSTransition>
              </SwitchTransition>
            )
          }}
        />
      </Layout>
    </ConnectedRouter>
  )
}

export default connect(mapStateToProps)(Router)
