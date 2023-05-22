import { plainToClassFromExist } from 'class-transformer'
import { BaseResponse } from '~/models/class/common/base-response'
import { AnswerSurveyRequest } from '~/models/class/survey/answer-survey/answer-survey-request'
import { GetListSurveyForAnswerResponse } from '~/models/class/survey/get-list-survey-for-answer/get-list-survey-for-answer-response'
import { axiosClient } from '../axios-client'

const ApiPath = {
  GET_LIST_SURVEY_FOR_ANSWER: '/survey/get_list_survey_for_answer',
  CREATE_SURVEY: 'survey/create_survey',
}

export const getListSurveyForAnswer = async (): Promise<
  BaseResponse<GetListSurveyForAnswerResponse[]>
> => {
  try {
    const response = await axiosClient.get<
      BaseResponse<GetListSurveyForAnswerResponse[]>
    >(ApiPath.GET_LIST_SURVEY_FOR_ANSWER)
    const data = plainToClassFromExist(
      new BaseResponse<GetListSurveyForAnswerResponse[]>(
        GetListSurveyForAnswerResponse
      ),
      response.data
    )
    return data
  } catch (error) {
    throw error
  }
}

export const postAnswerSurvey = async (
  answerSurveyRequest: AnswerSurveyRequest
) => {
  try {
    const response = await axiosClient.post<BaseResponse<Object>>(
      ApiPath.CREATE_SURVEY,
      answerSurveyRequest
    )
    const data = plainToClassFromExist(
      new BaseResponse<Object>(Object),
      response.data
    )
    return data
  } catch (error) {
    throw error
  }
}
