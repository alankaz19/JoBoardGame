<template>
  <div class="user">
    <Profile />
  </div>
</template>

<script>
  export default {
    name: 'User',

    components: {
        Profile: () => import('@/components/user/Profile'),
    }
  }
</script>