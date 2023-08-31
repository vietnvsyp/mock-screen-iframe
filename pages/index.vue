<template>
  <!-- <div class="topHeader gray-background">
    <form @submit="onSubmit" class="form-access">
      <TextField
        label="Access token"
        name="access_token"
        v-model="accessToken"
      ></TextField>
      <v-btn type="submit" block class="mt-2">Submit</v-btn>
    </form>
  </div> -->
  <div class="sidenav">
    <img src="/left-menu.png" />
    <div
      style="
        border-bottom: dotted 1px #1e5896;
        color: #1e5896;
        padding-left: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
      "
    >
      <a href="/"><b>トップページ</b></a>
    </div>
    <div
      style="
        border-bottom: dotted 1px #1e5896;
        color: #1e5896;
        padding-left: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
      "
    >
      <a href="/user"><b>あなたの属性情報</b></a>
    </div>
    <div
      style="
        border-bottom: dotted 1px #1e5896;
        color: #1e5896;
        padding-left: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
      "
    >
      <a href="/mail-receive-setting"><b>レポート配信設定</b></a>
    </div>
  </div>
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
        style="border: none"
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

const accessToken = ref(
  'eyJraWQiOiJGSzFJdzRrQ1dXZk4zRFhGYnlybnkrbzAxUWs2RFhRMEx0aW1JVlM0aUI0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxNzk0M2EyOC0yMDYxLTcwMzUtMTNjNi1hOWZjMGE5OGViZmQiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtbm9ydGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtbm9ydGhlYXN0LTFfM1BEQlI2YldNIiwiY2xpZW50X2lkIjoiM25mNjN2M3MyNGxjcDgwY2FndmkwMTAycSIsIm9yaWdpbl9qdGkiOiI0ODU5OTViZS0xMzdmLTQ5MjktOTQ3NC0xNTZmMzFkZGJiN2MiLCJldmVudF9pZCI6ImQ5OWFmZWM4LWE4ZTMtNGYxMi1iZTgzLTZmNGNkYzQzNzRhZSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTM0NzgzNTMsImV4cCI6MTY5MzU2NDc1MywiaWF0IjoxNjkzNDc4MzUzLCJqdGkiOiI4M2JkYTI4NC05M2RhLTQzYzctYWQ5NC0zNDUyMjVhN2Y0OWUiLCJ1c2VybmFtZSI6InRhZ3RhZ3VzZXIwMDEifQ.jh-_kGYULBwgfc6SzOuuxeoA2qFB2Jd0fq3WjXVNrHpQzGySpvV529KuQkdcbIM1zI_KxGd_cyBHI_nbKS6KZsoBJihJrAFGVRSHulYT-LYX1HbcRed896iWcu0ZVVx3RJA4knSkBoQjD5mTq708vQOuF4YYXqMBsc-8opfh6aOaYBBJpckVXM6hZ20mFnGR-nssWCOCuK1Mn9vCRjRDrZkFM__6FmHkpWhlPwRlARHeSQDMtSqdvJYQNaskhBd_rfnDdlW30PZ5xuO53Kb84VSpzYHOaNmCBmxEpGitzsJTqyphpOjB1V3qkiPSd1waHmWgqY_KXuYMW4mU7YjrOw'
)
const runtimeConfig = useRuntimeConfig()
const srcIframe = ref(runtimeConfig.public.iframeTargetUrl)

const route = useRoute()
const answerId = route.query.answerId?.toString()
const contractId = route.query.contract_id?.toString()
const monthlyReport = route.query.monthly_report
const targetedMonth = route.query.targeted_month?.toString()
const selectedEnergyType = route.query.selected_energy_type?.toString()
const heightApp = ref()

onMounted(() => {
  const iframe = document.getElementById('webB') as HTMLIFrameElement

  if (answerId) {
    srcIframe.value = srcIframe.value + '?answerId=' + answerId
  }
  window.addEventListener('message', (event) => {
    if (event.data === 'first_token') {
      if (iframe && iframe.contentWindow && accessToken.value.length > 0) {
        if (monthlyReport) {
          iframe.contentWindow.postMessage(
            {
              access_token: accessToken.value,
              monthly_report: true,
              contract_id: contractId,
              targeted_month: targetedMonth,
              selected_energy_type: selectedEnergyType,
            },
            '*'
          )
        } else {
          iframe.contentWindow.postMessage(
            {
              access_token: accessToken.value,
            },
            '*'
          )
        }
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
    if (monthlyReport) {
      console.log('monthly_report', monthlyReport)
      console.log('contractId', contractId)
      console.log('targetedMonth', targetedMonth)
      console.log('selectedEnergyType', selectedEnergyType)
      iframe.contentWindow.postMessage(
        {
          access_token: accessToken.value,
          monthly_report: true,
          contract_id: contractId,
          targeted_month: targetedMonth,
          selected_energy_type: selectedEnergyType,
        },
        '*'
      )
    } else {
      iframe.contentWindow.postMessage(
        {
          access_token: accessToken.value,
        },
        '*'
      )
    }
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
