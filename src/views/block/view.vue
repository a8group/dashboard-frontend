<template>
  <block-detail :is-view="true" />
</template>

<script>
import BlockDetail from './components/BlockDetail'

export default {
  name: 'ViewBlock',
  components: { BlockDetail }
}
</script>
