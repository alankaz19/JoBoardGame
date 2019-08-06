<template>
  <div class="userInfo">
    <UserInfo />
  </div>
</template>

<script>
  export default {
    name: 'userInfo',

    components: {
        UserInfo: () => import('@/components/user/UserInfo'),
    }
  }
</script>