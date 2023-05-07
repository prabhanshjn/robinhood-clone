import {configureStore} from '@reduxjs/toolkit'
import stockReducer from './Reducer/stockReducer'

export default configureStore({
    reducer: {
        "stock": stockReducer
    }
  })