<template>
  <script nonce="nonce-3">

    <div class="topHeader gray-background" v-if="!accessToken">
      <form @submit="onSubmitLogin" class="form-access">
        <TextField
          label="Access token (login_id)"
          name="access_token"
        ></TextField>
        <v-btn type="submit" block class="mt-2">Submit</v-btn>
      </form>
    </div>
    <div class="topHeader gray-background" v-if="accessToken">
      <form @submit="signOut" class="form-access">
        <v-btn type="submit" block class="mt-2">Logout</v-btn>
      </form>
    </div>
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
      <div
        style="
          border-bottom: dotted 1px #1e5896;
          color: #1e5896;
          padding-left: 20px;
          padding-top: 10px;
          padding-bottom: 10px;
        "
      >
        <a href="/monthly-report"><b>省エネレポート詳細へ</b></a>
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
        <a href="/energy-graph"><b>エネルギーグラフ詳細へ</b></a>
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
        <a href="/tips"><b>省エネのコツ一覧へ</b></a>
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
        <form class="form-access">
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
  </script>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { object, string } from 'yup'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
const authorizationStore = useAuthorizationStore()
const { accessToken } = storeToRefs(authorizationStore)
const runtimeConfig = useRuntimeConfig()
const srcIframe = ref(runtimeConfig.public.homepageUrl)

const route = useRoute()
const answerId = route.query.answerId?.toString()

const monthlyReport = route.query.monthly_report
const energyGraph = route.query.energy_graph

const contractId = route.query.contract_id?.toString()
const selectedEnergyType = route.query.selected_energy_type?.toString()

const targetedMonth = route.query.targeted_month?.toString()

const dateType = route.query.date_type?.toString()
const chartType = route.query.chart_type?.toString()

const heightApp = ref()

onMounted(() => {
  const iframe = document.getElementById('webB') as HTMLIFrameElement

  if (answerId) {
    srcIframe.value = srcIframe.value + '?answerId=' + answerId
  }
  window.addEventListener('message', (event) => {
    if (event.data === 'first_token') {
      if (iframe && iframe.contentWindow && accessToken.value.length > 0) {
        if (monthlyReport == 'true') {
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
        } else if (energyGraph == 'true') {
          iframe.contentWindow.postMessage(
            {
              access_token: accessToken.value,
              energy_graph: true,
              contract_id: contractId,
              selected_energy_type: selectedEnergyType,
              date_type: dateType,
              chart_type: chartType,
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

const onSubmitLogin = handleSubmit((values) => {
  try {
  } catch (error) {}
  console.log(values)
  authorizationStore.setAccessToken(values.access_token)
  const iframe = document.getElementById('webB') as HTMLIFrameElement
  if (iframe && iframe.contentWindow) {
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

async function signOut() {
  try {
  } catch (error) {}
  authorizationStore.resetAccessToken()
  window.location.reload()
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
  padding-left: 200px;
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
