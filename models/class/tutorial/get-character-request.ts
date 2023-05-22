import { Expose, instanceToPlain } from 'class-transformer'

export class GetCharacterRequest {
  @Expose({ name: 'name' })
  charName: string

  constructor(charName: string) {
    this.charName = charName
  }

  public get instance() {
    const instance = instanceToPlain(this) as this
    return instance
  }
}
