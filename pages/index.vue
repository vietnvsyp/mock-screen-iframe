<template>
  <div class="d-flex iframe-item">
    <div class="d-flex justify-center align-center sidebar gray-background">
      <span>コンテンツ</span>
    </div>
    <div class="main">
      <div class="header gray-background">
        <form @submit="onSubmit" class="form-access">
          <TextField
            label="Access token"
            name="access_token"
            v-model="accessToken"
          ></TextField>
          <v-btn type="submit" block class="mt-2">Submit</v-btn>
        </form>
      </div>
      <iframe
        id="webB"
        width="100%"
        height="2000px"
        class=""
        src="https://syp-dev.d1ki13c332hn49.amplifyapp.com/"
        title="Create Member"
        scrolling="no"
      >
      </iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { object, string } from 'yup'

const accessToken = ref('')
const refreshToken = ref('')

onMounted(() => {
  window.addEventListener('message', (event) => {
    const iframe = document.getElementById('webB') as HTMLIFrameElement
    if (event.data == 'token-request') {
      if (iframe && iframe.contentWindow && accessToken.value.length > 0) {
        iframe.contentWindow.postMessage(
          {
            access_token: accessToken.value,
          },
          '*'
        )
        console.log('Send message successfully')
      } else {
        console.error(
          'Unable to send message to iframe: iframe or iframe.contentWindow is null.'
        )
      }
    }
  })
})

const schema = object().shape({
  access_token: string().required(),
})

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const onSubmit = handleSubmit((values) => {
  const iframe = document.getElementById('webB') as HTMLIFrameElement
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage(
      {
        access_token: values.access_token,
      },
      '*'
    )
    console.log('Send message successfully')
  } else {
    console.error(
      'Unable to send message to iframe: iframe or iframe.contentWindow is null.'
    )
  }
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
</style>
