import { all, put, call } from 'redux-saga/effects'
import getClientsData from 'services/clientes'

export function* GET_DATA() {
  const clientsData = yield call(getClientsData)
  yield put({
    type: 'clients/SET_STATE',
    payload: {
      clientsData,
    },
  })
}

export default function* rootSaga() {
  yield all([
    GET_DATA(), // run once on app load to fetch menu data
  ])
}
