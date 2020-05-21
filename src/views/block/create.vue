<template>
  <block-detail :is-create="true" />
</template>

<script>
import BlockDetail from "./components/BlockDetail";

export default {
  name: "CreateBlock",
  components: { BlockDetail }
};
</script>
