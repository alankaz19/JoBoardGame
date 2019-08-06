<template>
  <v-radio-group v-model="editGender" row>
    <v-radio color="primary" type="numeber" label="男" value="0"></v-radio>
    <v-radio color="primary" type="numeber" label="女" value="1"></v-radio>
  </v-radio-group>
</template>

<script>
export default {
  props: {
    myGender: String
  },
  data: function() {
    return {
      gender: null
    };
  },
  computed: {
    editGender: {
      get: function() {
        return this.myGender;
      },
      set: function(newValue) {
        this.gender = newValue;
      }
    }
  },
  watch: {
    gender: function() {
      this.$emit("updateGender", this.gender);
    }
  }
};
</script>