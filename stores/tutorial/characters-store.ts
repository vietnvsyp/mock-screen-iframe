import { StatusCodes } from 'http-status-codes'
import { Character } from '~/models/interface/tutorial/character'
import { getCharacters } from '~/services/tutorial/characters-service'

// tutorial for pinia using
// defineStore is auto-imported by configuration in nuxt.config
export const useCharacterListStore = defineStore('characterList', () => {
  // similar to the Vue Composition API's setup function,
  // we can pass in a function that defines reactive properties and methods

  // ref()s become state properties
  const isLoading = ref(false)
  const isError = ref(false)
  const characterList = ref<Character[]>([])
  const filteredCharacterList = ref<Character[]>([])
  const selectedPage = ref(1)
  const totalPage = ref(1)

  // computed()s become getters
  const nextPage = computed(() => selectedPage.value + 1)

  // function()s become actions
  function setCharacterList(list: Character[]) {
    characterList.value = list
  }

  function setFilteredCharacterList(list: Character[]) {
    filteredCharacterList.value = list
  }

  function setSelectedPage(page: number) {
    selectedPage.value = page
  }

  async function getCharacterList(page: number) {
    isLoading.value = true
    isError.value = false
    try {
      const response = await getCharacters(page)
      if (response.status === StatusCodes.OK) {
        characterList.value = response.data.data
        filteredCharacterList.value = response.data.data
        totalPage.value = response.data.info.totalPages
      } else {
        isError.value = true
      }
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  // returns an object with the properties and methods we want to expose.
  return {
    isLoading,
    isError,
    characterList,
    filteredCharacterList,
    selectedPage,
    totalPage,
    nextPage,
    setCharacterList,
    setFilteredCharacterList,
    setSelectedPage,
    getCharacterList,
  }
})
