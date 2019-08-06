<template>
  <div class="group">
    <GroupList />
  </div>
</template>

<script>
  export default {
    name: 'Group',

    components: {
      GroupList: () => import('@/components/group/GroupList'),
      }
  }
</script>