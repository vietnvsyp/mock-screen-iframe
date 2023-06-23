<template>
  <!-- <div class="d-flex iframe-item">
    <div class="d-flex justify-center align-center sidebar gray-background">
      <span>コンテンツ</span>
    </div>
    <div class="header gray-background">
      <form @submit="onSubmit" class="form-access">
        <TextField
          label="Access token"
          name="access_token"
          v-model="accessToken"
        ></TextField>
        <v-btn type="submit" block class="mt-2">Submit</v-btn>
      </form>
    </div> -->
  <div class="sidenav"><img src="/left-menu.png" /></div>
  <div
    style="
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 100%;
      font-family: 'Yu Gothic';
    "
    class="gray-background"
  >
    <div class="header">
      <form @submit="onSubmit" class="form-access">
        <img src="/top-menu.png" style="height: 150px" />
      </form>
    </div>
    <div class="main gray-background">
      <iframe
        id="webB"
        class="responsive-iframe"
        src="https://syp-dev.dydulkk5p8dko.amplifyapp.com/"
        title="Create Member"
        scrolling="no"
        onload="this.style.height=(this.contentWindow.document.body.scrollHeight+20)+'px';"
      >
      </iframe>
    </div>
  </div>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { object, string } from 'yup'

const accessToken = ref('aaaaaa')
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
function resizeIframe(obj: any) {
  obj.style.height =
    obj.contentWindow.document.documentElement.scrollHeight + 'px'
}
</script>

<style lang="scss" scoped>
.gray-background {
  //background: $gray-background;
  background: white;
}
.header {
  width: 100%;
  background: white;
  margin-left: auto;
  margin-right: auto;
}
.form-access {
  width: 40%;
  margin: 0 auto;
  padding-bottom: 16px;
  height: 150px;
}
.main {
  margin-left: 180px;
  flex: 1;
  width: 80%;
}
.responsive-iframe {
  top: 0;
  left: 10%;
  bottom: 0;
  right: 10%;
  width: 100%;
  height: 4500px;
  //border: solid 1px black;
  border: none;
}
.sidenav {
  height: 100%;
  width: 180px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
}
</style>
