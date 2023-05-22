import { axiosClient } from '../axios-client'
import { plainToInstance } from 'class-transformer'
import { GetCharacterRequest } from '~/models/class/tutorial/get-character-request'
import { GetCharacterResponse } from '~/models/class/tutorial/get-character-response'

// tutorial of using axios client for requesting api
// all apis of one service are defined in here
export const getCharacters = (page: number) => {
  return axiosClient.get('/character', {
    params: {
      page: page,
    },
  })
}

export const getCharacter = async (
  getCharacterRequest: GetCharacterRequest
): Promise<GetCharacterResponse> => {
  const response = await axiosClient.get<GetCharacterResponse>(`/character`, {
    params: getCharacterRequest,
  })
  const data = plainToInstance(GetCharacterResponse, response.data)
  return data
}
