<template>
  <div id="app">
    <BackgroundMain />
    <Toastr />
  </div>
</template>

<script>
import BackgroundMain from '@/components/main/BackgroundMain'
import Toastr from '@/components/common/Toastr'

export default {
  name: 'App',
  components: {
    BackgroundMain,
    Toastr
  }
}
</script>

