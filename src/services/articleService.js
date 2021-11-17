import httpService from './http.service'

const professionEndpoint = 'articles/'

const articleService = {
  get: async () => {
    const { data } = await httpService.get(professionEndpoint)
    console.log('__New: ', data)
    return data
  }
}

export default articleService