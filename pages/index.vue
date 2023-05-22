<template>
  <div class="d-flex iframe-item">
    <div class="d-flex justify-center align-center sidebar gray-background">
      <span>コンテンツ</span>
    </div>
    <div class="main">
      <div class="header gray-background">
        <form @submit="onSubmit" class="form-access">
          <TextField label="Access token" name="access_token"></TextField>
          <TextField label="Refresh token" name="refresh_token"></TextField>
          <v-btn type="submit" block class="mt-2">Submit</v-btn>
        </form>
      </div>
      <iframe
        id="webB"
        width="100%"
        height="1137px"
        class=""
        src="http://localhost:3000/"
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
      if (
        iframe &&
        iframe.contentWindow &&
        accessToken.value.length > 0 &&
        refreshToken.value.length > 0
      ) {
        iframe.contentWindow.postMessage(
          {
            access_token: accessToken.value,
            refresh_token: refreshToken.value,
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
  refresh_token: string().required(),
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
        refresh_token: values.refresh_token,
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

.field {
  width: 30px;
}
</style>
