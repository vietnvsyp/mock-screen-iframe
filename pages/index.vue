<template>
  <div class="topHeader gray-background">
    <form @submit="onSubmit" class="form-access">
      <TextField
        label="Access token"
        name="access_token"
        v-model="accessToken"
      ></TextField>
      <v-btn type="submit" block class="mt-2">Submit</v-btn>
    </form>
  </div>
  <div class="sidenav"><img src="/left-menu.png" /></div>
  <div
    style="
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 100%;
      font-family: 'Yu Gothic';
    "
    class="gray-background mainRight"
  >
    <div class="topHeader">
      <form @submit="onSubmit" class="form-access">
        <img
          src="/top-menu.png"
          style="height: 150px; width: 100%; object-fit: contain"
        />
      </form>
    </div>
    <div class="main gray-background">
      <iframe
        id="webB"
        class="responsive-iframe"
        :src="srcIframe"
        title="Create Member"
        scrolling="no"
        :height="heightApp"
        width="100%"
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

const accessToken = ref('')
const refreshToken = ref('')
const runtimeConfig = useRuntimeConfig()
const srcIframe = ref(runtimeConfig.public.iframeTargetUrl)

const route = useRoute()
const answerId = route.query.answerId?.toString()
const heightApp = ref()
onMounted(() => {
  const iframe = document.getElementById('webB') as HTMLIFrameElement

  if (answerId) {
    srcIframe.value = srcIframe.value + '?answerId=' + answerId
  }
  window.addEventListener('message', (event) => {
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
    } else if (event.data.type === 'iframe-height') {
      heightApp.value = event.data.height
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
.topHeader {
  width: 100%;
  background: white;
}
.form-access {
  margin: 0 auto;
  padding-bottom: 16px;
  height: 150px;
}
.main {
  flex: 1;
}
.sidenav {
  height: 100%;
  width: 180px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
}
.mainRight {
  margin-left: 180px;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .sidenav {
    display: none;
  }
  .mainRight {
    margin-left: 0;
  }
}
</style>
