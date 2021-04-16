<template>
  <div class="px-2">
    <v-row >
      <v-col cols="7">
        <v-btn class="ma-2" color="primary" @click="$router.push(`/loans/actions`)">New</v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-col>
    </v-row>
    <v-data-table dense :footer-props="paginationList" :headers="headers" :items="[]" :items-per-page="25"  :search="search" class="elevation-1">
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      search: '',
      listofReports: [],
      listLoading: false,
      paginationList: { itemsPerPageOptions: [10, 25, 50, 100, -1] }
    }
  },
  computed: {
    ...mapGetters(['getUsers', 'getUserGroups']),
    headers () {
      return [{
        text: 'Customer Name',
        value: 'name'
      }, {
        text: 'Collection Agent',
        value: 'description'
      }, {
        text: 'Start Date',
        value: 'iscommon'
      }, {
        text: 'End Date',
        value: 'availabletousers'
      }, {
        text: 'Is Active',
        value: 'availabletogroups'
      }, {
        text: 'Actions',
        value: 'actions'
      }]
    }
  },
  methods: {
    getReportsList () {
      //
    }
  }
}
</script>
