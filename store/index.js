import createLogger from 'vuex/dist/logger'
import {FETCH_USER} from './auth'

export const plugins = [
  createLogger()
]

export const state = () => ({})

export const getters = {

}

export const actions = {
  nuxtClientInit ({dispatch}, context) {
    return Promise.all([
      dispatch('auth/' + FETCH_USER).catch((e) => {
        // ignore 403 errors for when not connected
        // TODO handle better
      })
    ])
  }
}

export const mutations = {}
