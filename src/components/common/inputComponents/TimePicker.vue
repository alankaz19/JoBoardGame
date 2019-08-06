<template>
  <v-layout wrap>
    <v-flex xs11 sm3>
      <v-menu
        ref="menu1"
        :disabled="!isEditable"
        v-model="menu1"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="start"
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="start"
            label="開始時間"
            prepend-icon="access_time"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu1"
          v-model="editStart"
          full-width
          @click:minute="$refs.menu1.save(start);"
        ></v-time-picker>
      </v-menu>
    </v-flex>

    <v-flex xs11 sm3>
      <v-menu
        ref="menu2"
        :disabled="!isEditable"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="end"
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="end"
            label="結束時間"
            prepend-icon="access_time"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker v-if="menu2" v-model="editEnd" full-width @click:minute="$refs.menu2.save(end);"></v-time-picker>
      </v-menu>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    myStart: String,
    myEnd: String,
    isEditable: { type: Boolean, default: true }
  },
  data() {
    return {
      start: '',
      end: '',
      menu1: false,
      menu2: false
    };
  },
  created(){
    
    
  },
  computed: {
    editStart: {
      get: function() {
        this.start = this.myStart;
        return this.myStart;
      },
      set: function(newValue) {
        this.start = newValue;
      }
    },
    editEnd: {
      get: function() {
        this.end = this.myEnd;
        return this.myEnd;
      },
      set: function(newValue) {
        this.end = newValue;
      }
    }
  },
  watch: {
    start: function() {
      this.$emit("updateStartTime", this.start);
    },
    end: function() {
      this.$emit("updateEndTime", this.end);
    }
  }
};
</script>