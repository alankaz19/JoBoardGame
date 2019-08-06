<template>
  <v-layout row wrap>
    <v-flex xs12 lg6>
      <v-menu
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
            label="生日"
            persistent-hint
            prepend-icon="event"
            readonly
            color="primary"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          ref="picker"
          v-model="date"
          no-title
          color="primary"
          @input="menu = false"
          :max="new Date().toISOString().substr(0, 10)"
          min="1920-01-01"
        ></v-date-picker>
      </v-menu>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    myBirthday: String
  },
  data: vm => ({
    date: null,
    dateFormatted: null,
    menu: false
  }),

  watch: {
    myBirthday(val){
      this.$data.dateFormatted = this.myBirthday;
    },
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    dateFormatted: function() {
      this.$emit("updateBirthday", this.dateFormatted);
    }
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
    }
  }
};
</script>