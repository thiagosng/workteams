import React, { useEffect, useState } from 'react'
import { Menu, Dropdown } from 'antd'
import { getProjectsData } from 'services/projects'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import style from './style.module.scss'

const dropdownMenu = (
  <Menu>
    <Menu.Item>
      <a>Action</a>
    </Menu.Item>
    <Menu.Item>
      <a>Another action</a>
    </Menu.Item>
    <Menu.Item>
      <a>Something else here</a>
    </Menu.Item>
    <div className="dropdown-divider" />
    <Menu.Item>
      <a>Separated link</a>
    </Menu.Item>
  </Menu>
)

const General13 = () => {
  const [projects, setProjects] = useState([])

  const getAllProjects = async () => {
    const AllProjects = await getProjectsData()
    setProjects(AllProjects)
  }

  const history = useHistory()

  const projetos = projects.map((project) => {
    const dateInit = new Date(moment(project.startDate).format('YYYY-MM-DD'))

    const dateNow = new Date()

    const diffNow = dateNow.getTime() - dateInit.getTime()

    const diffDays = Math.floor(diffNow / (1000 * 60 * 60 * 24))

    const dateEnd = new Date(moment(project.endDate).format('YYYY-MM-DD'))

    const diferenceTime = dateEnd.getTime() - dateInit.getTime()

    const diferenceDays = Math.round(diferenceTime / (1000 * 60 * 60 * 24))

    const percenteDate = 100 - (diferenceDays - diffDays) / (diferenceDays / 100)

    console.log('A', diferenceTime)
    console.log('B', diferenceDays)
    console.log('C', percenteDate)
    console.log('D', diffDays)
    return (
      <div className="col-lg-4 col-md-12">
        <div>
          <div className="card">
            <div
              className={`${style.card}`}
              onClick={() => history.push(`/projects/details/${project.id}`)}
              onKeyDown={() => alert('sad')}
              role="button"
              tabIndex={0}
            >
              <div
                className={`${style.head} height-200 d-flex flex-column`}
                style={{
                  backgroundImage: 'url(resources/images/content/stars.jpg)',
                }}
              >
                <div className="card-header card-header-flex border-bottom-0">
                  <div className="d-flex flex-column justify-content-center">
                    <h5 className="mb-0 text-white">{project.status}</h5>
                  </div>
                  <div className="ml-auto d-flex flex-column justify-content-center">
                    <div className="dropdown d-inline-block">
                      <Dropdown overlay={dropdownMenu} placement="bottomRight">
                        <button
                          type="button"
                          className="btn btn-light dropdown-toggle dropdown-toggle-noarrow"
                        >
                          <i className="fe fe-more-horizontal" />
                        </button>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="mt-auto mb-3">
                  <div className="text-white font-size-24 font-weight-bold pl-4">
                    {project.name}
                  </div>
                </div>
              </div>
              <div className="card border-0">
                <div className="card-header border-bottom-0">
                  <div className="d-flex mb-1">
                    <div className="text-dark text-uppercase font-weight-bold mr-auto">
                      Data de inicio
                    </div>
                    <div className="text-gray-6">Data de Encerramento</div>
                  </div>
                  <div className="d-flex mb-2">
                    <div className="text-success font-size-24 font-weight-bold mr-auto">
                      {moment(project.startDate).format('YYYY-MM-DD')}
                    </div>
                    <div className="text-gray-4 font-size-24">
                      {moment(project.endDate).format('YYYY-MM-DD')}
                    </div>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar bg-success"
                      style={{
                        width: `${percenteDate}%`,
                      }}
                      role="progressbar"
                      aria-valuenow={60}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                <div className="card-body pt-1">{project.description}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  })

  console.log('dataProjects', projects)

  useEffect(() => {
    getAllProjects()
  }, [])

  return <div className="row">{projetos}</div>
}

export default General13
