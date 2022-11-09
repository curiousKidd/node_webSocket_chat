<template>
  <div class="tab_wrap d-flex align-center">
    <client-test></client-test>
  </div>
</template>

<script>
import clientTest from '@/components/socket/clientTest'

export default {
  components: {
    clientTest,
  },
}
</script>
