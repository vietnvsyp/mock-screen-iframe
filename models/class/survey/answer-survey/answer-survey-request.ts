import { Expose, instanceToPlain } from 'class-transformer'

export class AnswerSurveyRequest {
  @Expose({ name: 'survey_id' })
  surveyId?: string

  @Expose({ name: 'answer_id' })
  answerId?: string

  constructor(surveyId: string, answerId: string) {
    this.surveyId = surveyId
    this.answerId = answerId
  }

  public get instance() {
    const instance = instanceToPlain(this) as this
    return instance
  }
}
