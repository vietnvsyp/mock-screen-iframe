import { Expose, Type, instanceToPlain } from 'class-transformer'

export class GetCharacterResponse {
  @Type(() => CharacterInfo)
  info: CharacterInfo

  @Expose({ name: 'data' })
  @Type(() => CharacterData)
  characterData: CharacterData

  constructor(info: CharacterInfo, characterData: CharacterData) {
    this.info = info
    this.characterData = characterData
  }

  public get instance() {
    const instance = instanceToPlain(this) as this
    return instance
  }
}

class CharacterInfo {
  @Expose({ name: 'count' })
  characterCount: number

  totalPages: number

  constructor(characterCount: number, totalPages: number) {
    this.characterCount = characterCount
    this.totalPages = totalPages
  }
}

class CharacterData {
  @Expose({ name: '_id' })
  id: number

  @Expose({ name: 'name' })
  characterName: string

  constructor(id: number, characterName: string) {
    this.id = id
    this.characterName = characterName
  }
}
