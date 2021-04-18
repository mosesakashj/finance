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
    <v-data-table dense :footer-props="paginationList" :headers="headers" :items="listofLoans" :items-per-page="25"  :search="search" class="elevation-1">
    </v-data-table>
  </div>
</template>
<script>
import * as fb from '@/firebase'

export default {
  data () {
    return {
      search: '',
      listofLoans: [],
      listLoading: false,
      paginationList: { itemsPerPageOptions: [10, 25, 50, 100, -1] }
    }
  },
  computed: {
    headers () {
      return [{
        text: 'Customer Name',
        value: 'customer'
      }, {
        text: 'Collection Agent',
        value: 'agent'
      }, {
        text: 'Start Date',
        value: 'date'
      }, {
        text: 'Collection Method',
        value: 'type'
      }, {
        text: 'Collection Count',
        value: 'collectionCount'
      }, {
        text: 'Loan Amount',
        value: 'loanAmount'
      }, {
        text: 'Actions',
        value: 'actions'
      }]
    }
  },
  mounted () {
    this.getLoansList()
  },
  methods: {
    async getLoansList () {
      await fb.loansCollection.get().then((querySnapshot) => {
        console.log(querySnapshot)
        querySnapshot.forEach((doc) => this.listofLoans.push(doc.data()))
      })
    }
  }
}
</script>
