<template>
  <v-main style="min-height: 300px">
    <breadcrumbs />
    <v-container>
      <div>
        <Tab
          :items="tabItems"
          :default-value="2"
          @change="handleTabChanged"
        ></Tab>
        <form @submit="onSubmit">
          <TextField label="ID" name="id"></TextField>
          <TextField label="Email" name="email"></TextField>
          <Dropdown
            label="Select"
            name="select"
            :items="items"
            itemLabel="state"
          ></Dropdown>
          <Radio
            label="Radio"
            name="radio"
            :items="items"
            itemLabel="state"
          ></Radio>
          <Toggle name="switch"></Toggle>
          <Checkbox name="checkbox" :items="items" itemLabel="state"></Checkbox>
          <DatePicker name="datePicker"></DatePicker>
          <ButtonSubmit type="submit">Submit</ButtonSubmit>
        </form>
        <PopupDialog
          v-model="isOpenDialog"
          title="Dialog"
          positive-text="Save"
          negative-text="Cancel"
        ></PopupDialog>
      </div>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { date, object, string } from 'yup'

const items = [
  { state: 'Florida', abbr: 'FL' },
  { state: 'Georgia', abbr: 'GA' },
  { state: 'Nebraska', abbr: 'NE' },
  { state: 'California', abbr: 'CA' },
  { state: 'New York', abbr: 'NY' },
]

const tabItems = [
  { title: 'Tab 1', value: 1 },
  { title: 'Tab 2', value: 2 },
  { title: 'Tab 3', value: 3 },
  { title: 'Tab 4', value: 4 },
]

const isOpenDialog = ref(false)

watch(isOpenDialog, (_) => {
  console.log('isOpenDialog', isOpenDialog.value)
})

// returns the current route
const route = useRoute()

// a validation schema using yup
// this object lists all the fields in the form and how they'll be validated
// details about yup are in https://github.com/jquense/yup
const schema = object().shape({
  id: string().required(),
  email: string().required(),
  select: object().required(),
  datePicker: date().required(),
})

// useForm is used to create a form components
// it uses the yup schema above for validation and can define the initial values of the form
// details about vee-validate are in https://vee-validate.logaretm.com/v4/guide/overview/
const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    id: route.params.id,
    select: items[1],
    radio: items[0],
    checkbox: [items[2]],
  },
})

const onSubmit = handleSubmit(async (values) => {
  console.log('values', values)
  isOpenDialog.value = !isOpenDialog.value
}, onInvalidSubmit)

function onInvalidSubmit({
  values,
  errors,
  results,
}: {
  values: any
  errors: any
  results: any
}) {
  console.log(values) // current form values
  console.log(errors) // a map of field names and their first error message
  console.log(results) // a detailed map of field names and their validation results
}

function handleTabChanged(value: number) {
  console.log('tab', value)
}
</script>
