<template>
  <v-layout row wrap>
    <v-flex xs12 lg6>
      <v-menu
        :disabled="!isEditable"
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            
            v-model="dateFormatted"
            label="揪團日期"
            persistent-hint
            prepend-icon="event"
            readonly
            color="primary"
            v-on="on"
            v-validate="'required'"
          ></v-text-field>
        </template>
        <v-date-picker
          ref="picker"
          v-model="date"
          no-title
          color="primary"
          @input="menu = false"
          :min="new Date().toISOString().substr(0, 10)"
        ></v-date-picker>
      </v-menu>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    myDate: String,
    isEditable: { type: Boolean, default: true }
  },
  data: vm => ({
    date: null,
    dateFormatted: null,
    menu: false
  }),
  computed: {
    computedDateFormatted() {
      if(this.myDate){
        return this.myDate
      }
      return this.formatDate(this.date);
    },
    editDate: {
    get: function() {
      this.date = this.myDate;
      return this.myDate;
    },
    set: function(newValue) {
      this.date = this.formatDate(this.date);;
    }
  },
  
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${year}/${month}/${day}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  
  },
  watch: {
    myDate(val) {
      this.$data.dateFormatted = this.myDate;
    },
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
    dateFormatted: function() {
      this.$emit("updateDate", this.dateFormatted);
    }
  }
};
</script>