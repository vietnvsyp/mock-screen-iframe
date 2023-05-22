import { AnswerSurveyRequest } from '~/models/class/survey/answer-survey/answer-survey-request'
import { GetListSurveyForAnswerResponse } from '~/models/class/survey/get-list-survey-for-answer/get-list-survey-for-answer-response'
import { useSnackbarStore } from '../common/snackbar-store'

export const useSurveyStore = defineStore('survey', () => {
  const snackbarStore = useSnackbarStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')
  const surveyList = ref<GetListSurveyForAnswerResponse[]>([])

  const response1 = {
    contents: [
      {
        surveyId: '1',
        answerType: 1,
        question: '省エネを意識している家電は？',
        answerList: [
          {
            answerId: '1',
            answerContent: '照明',
            totalChoice: 1,
          },
          {
            answerId: '2',
            answerContent: '冷蔵庫',
            totalChoice: 2,
          },
          {
            answerId: '3',
            answerContent: 'エアコン',
            totalChoice: 3,
          },
          {
            answerId: '4',
            answerContent: 'キッチン家電',
            totalChoice: 4,
          },
        ],
        totalAnswer: 10,
        choiceAnswerId: '1',
        pointQuantity: 10,
      },
    ],
  }

  const response2 = {
    contents: [
      {
        surveyId: '1',
        answerType: 1,
        question: '省エネを意識している家電は？',
        answerList: [
          {
            answerId: '1',
            answerContent: '照明',
            totalChoice: 0,
          },
          {
            answerId: '2',
            answerContent: '冷蔵庫',
            totalChoice: 3,
          },
          {
            answerId: '3',
            answerContent: 'エアコン',
            totalChoice: 3,
          },
          {
            answerId: '4',
            answerContent: 'キッチン家電',
            totalChoice: 4,
          },
        ],
        totalAnswer: 10,
        choiceAnswerId: '2',
        pointQuantity: 10,
      },
    ],
  }

  const response = ref(response1)

  async function getListSurvey() {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      // const response = await getListSurveyForAnswer()
      surveyList.value = response.value.contents ?? []
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function answerSurvey(
    surveyId: string,
    answerId: string
  ): Promise<Boolean> {
    if (isLoading.value) {
      return false
    }
    isLoading.value = true
    isError.value = false
    try {
      const answerSurveyRequest = new AnswerSurveyRequest(surveyId, answerId)
      // const response = await postAnswerSurvey(answerSurveyRequest.instance)
      const response = {
        message: 'Answer successfully!',
      }
      snackbarStore.setSnackbarContent(response.message, false, true)
      return true
    } catch (error) {
      isError.value = true
      return false
    } finally {
      isLoading.value = false
    }
  }

  function setDummyData() {
    response.value = response2
  }

  return {
    isLoading,
    isError,
    error,
    surveyList,
    getListSurvey,
    answerSurvey,
    setDummyData,
  }
})
