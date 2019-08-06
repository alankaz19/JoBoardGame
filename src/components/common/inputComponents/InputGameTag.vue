<template>
  <v-combobox
    :readonly="!isEditable"
    v-model="editGame"
    :items="items"
    :search-input.sync="search"
    hide-selected
    hint="最多可輸入五款遊戲"
    label="新增遊戲"
    multiple
    persistent-hint
    small-chips
    color="primary"
  >
    <template v-slot:no-data>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>輸入新的遊戲標籤</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-combobox>
</template>

<script>
export default {
  props: {
    myGame: Array,
    isEditable: { type: Boolean, default: true }
  },
  created() {
    // let fetchGame = this.myGame;
    // this.model = fetchGame;
  },
  data: () => ({
    items: ["狼人殺", "阿瓦隆", "矮人礦坑"],
    model: [],
    search: null
  }),
  computed: {
    editGame: {
      get: function() {
        this.model = this.myGame;
        return this.myGame;
      },
      set: function(newValue) {
        this.model = newValue;
      }
    }
  },
  watch: {
    model(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.model.pop());
      }
      this.$emit("updateGame", this.model);
    }
  }
};
</script>