<template>
  <div class="tab_wrap d-flex align-center">
    <ws-client></ws-client>
  </div>
</template>

<script>
import wsClient from '@/components/socket/wsClient'

export default {
  components: {
    wsClient,
  },
}
</script>
