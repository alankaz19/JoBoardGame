<template>
  <div class="group">
    <GroupPage />
  </div>
</template>

<script>
  export default {
    name: 'Group',

    components: {
      GroupPage: () => import('@/components/group/GroupPage'),
      }
  }
</script>