import { Expose, Type } from 'class-transformer'

export class GetListSurveyForAnswerResponse {
  @Expose({ name: 'survey_id' })
  surveyId?: string

  @Expose({ name: 'answer_type' })
  answerType?: number

  @Expose({ name: 'question' })
  question?: string

  @Expose({ name: 'answer_list' })
  @Type(() => Answer)
  answerList?: Answer[]

  @Expose({ name: 'choice_answer_id' })
  choiceAnswerId?: string

  @Expose({ name: 'total_answer_user' })
  totalAnswer?: number

  @Expose({ name: 'point_quantity' })
  pointQuantity?: number

  constructor(
    surveyId: string,
    answerType: number,
    question: string,
    answerList: Answer[],
    choiceAnswerId: string,
    pointQuantity: number
  ) {
    this.surveyId = surveyId
    this.answerType = answerType
    this.question = question
    this.answerList = answerList
    this.choiceAnswerId = choiceAnswerId
    this.pointQuantity = pointQuantity
  }
}

class Answer {
  @Expose({ name: 'answer_id' })
  answerId?: string

  @Expose({ name: 'answer_content' })
  answerContent?: string

  @Expose({ name: 'total_choice' })
  totalChoice?: number

  constructor(answerId: string, answerContent: string, totalChoice: number) {
    this.answerId = answerId
    this.answerContent = answerContent
    this.totalChoice = totalChoice
  }
}
