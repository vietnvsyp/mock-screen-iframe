<template>
  <v-main style="min-height: 300px">
    <v-container>
      <div>
        <span v-if="characterListStore.isLoading">Loading...</span>
        <span v-else-if="characterListStore.isError">Error...</span>
        <div v-else class="bg-white">
          <div class="py-10 px-12">
            <div class="table">
              <v-data-table
                :headers="headers"
                :items="characterListStore.filteredCharacterList"
                :items-per-page="50"
                hide-default-footer
                class="custom-table"
                @click:row="selectCharacter"
              >
                <template v-slot:item.films="{ item }">
                  <div class="custom-chip-container">
                    <v-chip
                      color="#E0E0E0"
                      v-for="film in item.raw.films"
                      dark
                      class="custom-chip"
                    >
                      {{ film }}
                    </v-chip>
                  </div>
                </template>
                <template v-slot:bottom>
                  <div class="text-center pt-2">
                    <v-pagination
                      v-model="characterListStore.selectedPage"
                      :length="characterListStore.totalPage"
                      @update:model-value="changePage"
                      @next="changePage"
                      @prev="changePage"
                    ></v-pagination>
                  </div>
                </template>
              </v-data-table>
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { sprintf } from 'sprintf-js'
import { ADMIN_DETAIL_ROUTE } from '~/constants'
import { useCharacterListStore } from '~/stores/tutorial/characters-store'

const headers = [
  {
    title: 'Id',
    key: '_id',
    align: 'start',
    sortable: false,
  },
  { title: 'Name', key: 'name', sortable: false },
  { title: 'Films', key: 'films', sortable: false },
]

// access the store in component
const characterListStore = useCharacterListStore()

// a local state of component
const searchedName = ref('')

onMounted(() => {
  characterListStore.getCharacterList(1)
})

function onChangeSearchedName(text: string) {
  console.log('onChangeSearchedName', text)
  if (text && text != '') {
    const filteredList = characterListStore.characterList.filter((item) =>
      item.name?.includes(text)
    )
    characterListStore.setFilteredCharacterList(filteredList)
  } else {
    const filteredList = characterListStore.characterList
    characterListStore.setFilteredCharacterList(filteredList)
  }
}

async function changePage(page: number) {
  characterListStore.getCharacterList(page)
}

async function selectCharacter(event: any, data: any) {
  await navigateTo({
    path: sprintf(ADMIN_DETAIL_ROUTE, data.item.raw._id),
  })
}
</script>

<style lang="scss" scoped>
.filter {
  gap: 20px;
  color: $common-pink;
}

.table {
  .custom-table {
    box-shadow: none !important;

    .custom-chip-container {
      display: flex;
      gap: 8px;

      .custom-chip {
        color: #1d1d1d !important;
        padding: $padding;
      }
    }

    .custom-action-container {
      color: #1d1d1d !important;

      button {
        color: #1d1d1d !important;
      }
    }
  }
}
</style>

<style lang="scss">
.custom-table {
  .v-select__selections .v-select__selection {
    position: relative;
  }
}
</style>
