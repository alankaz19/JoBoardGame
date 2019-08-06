<template>
  <div class="create">
    <CreateGroup />

  </div>
</template>

<script>
  export default {
    name: 'Create',

    components: {
      CreateGroup: () => import('@/components/group/CreateGroup'),
      }
  }
</script>