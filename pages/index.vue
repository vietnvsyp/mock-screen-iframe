<template>
  <div class="d-flex iframe-item">
    <div class="d-flex justify-center align-center sidebar gray-background">
      <span>コンテンツ</span>
    </div>
    <div class="main">
      <div class="header gray-background">
        <form @submit="onSubmit" class="form-access">
          <TextField label="Token" name="token"></TextField>
          <TextField label="Url" name="url"></TextField>
          <v-btn type="submit" block class="mt-2">Submit</v-btn>
        </form>
      </div>
      <iframe
        id="webB"
        width="100%"
        height="1137px"
        class=""
        src="http://localhost:3000/top"
        title="Create Member"
      >
      </iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { object, string } from 'yup'

const token = ref('')
const url = ref('')

if (process.client) {
  const parentWindow = window.parent
  const iframe = document.getElementById('webB') as HTMLIFrameElement

  // Function to send a message to the iframe
  const sendMessageToIframe = () => {
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage('123123145', '*')
      console.log('Send message successfully')
    } else {
      console.error(
        'Unable to send message to iframe: iframe or iframe.contentWindow is null.'
      )
    }
  }

  // sendMessageToIframe()
  window.addEventListener('load', sendMessageToIframe)
}

const schema = object().shape({
  token: string().required(),
  url: string().required(),
})

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    token: token.value,
    url: url.value,
  },
})

const onSubmit = handleSubmit(async (values) => {
  const iframe = document.getElementById('webB') as HTMLIFrameElement

  iframe.src = values.url
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
</script>

<style lang="scss" scoped>
.gray-background {
  background: $gray-background;
}

.form-access {
  width: 50%;
  margin: 0 auto;
  padding-bottom: 16px;
}
.sidebar {
  width: 13%;
  height: 742px;
}

.main {
  width: 87%;
}

.field {
  width: 30px;
}
</style>
