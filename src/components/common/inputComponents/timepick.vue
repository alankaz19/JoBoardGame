<template>
  <v-layout row wrap>
    <v-flex v-flex xs11 sm3 v-model="upDateTime">
      <v-menu
        ref="menu1"
        v-model="menu1"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="startTime"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="startTime"
            label="開始時間"
            prepend-icon="access_time"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu1"
          v-model="startTime"
          full-width
          @click:minute="$refs.menu1.save(startTime)"
        ></v-time-picker>
      </v-menu>
    </v-flex>

    <v-flex v-flex xs11 sm3>
      <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="endTime"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="endTime"
            label="結束時間"
            prepend-icon="access_time"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu2"
          full-width
          @click:minute="$refs.menu2.save(endTime)"
        ></v-time-picker>
      </v-menu>
    </v-flex>
  </v-layout>
</template>


<script>
export default {
  props: {
    myStartTime: String,
    myEndTime: String
  },
  data() {
    return {
      startTime: '',
      endTime: '',
      menu1: false,
      menu2: false
    };
  },
  computed: {
    //給揪團資訊使用
    propsTime() {
      if(myStartTime && myEndTime){
        this.$data.startTime = myStartTime;
        this.$data.endTime = myEndTime;
      }
    },
    upDateTime() {
      this.$emit("updatTime", this.$data.time);
    }
  }
};
</script>