<template>
  <div>
    <v-row class="px-2">
      <v-col cols="4" class="py-1">
        <v-btn text class="ma-2" color="primary" @click="$router.push('/loans')"><v-icon>mdi-arrow-left</v-icon></v-btn>
      </v-col>
    </v-row>
        <v-form ref="userdefineDialog">
          <v-card>
            <v-card-text class="mt-2">
            <v-row>
              <v-col cols="4">
                <v-autocomplete outlined :items="listOfCustomers" item-text="name" item-value="_id" label="Select Customer" v-model="userdefinedObj.customer" :rules="defaultRules" dense hide-details :class="$vuetify.breakpoint.smAndDown ? 'caption': ''"></v-autocomplete>
              </v-col>
              <v-col cols="4">
                <v-autocomplete outlined :items="listOfAgents" item-text="name" item-value="_id" label="Select Agent" v-model="userdefinedObj.agent" :rules="defaultRules" dense hide-details :class="$vuetify.breakpoint.smAndDown ? 'caption': ''"></v-autocomplete>
              </v-col>
              <v-col cols="4">
                <v-select outlined :items="['week', 'day']" label="Select Collection Type" v-model="userdefinedObj.type" dense hide-details :rules="defaultRules" :class="$vuetify.breakpoint.smAndDown ? 'caption': ''"></v-select>
              </v-col>
              <v-col cols="4">
                <v-text-field outlined dense hide-details label="Collection Count" type="number" :class="$vuetify.breakpoint.smAndDown ? 'caption': ''" :rules="defaultRules"></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field outlined dense hide-details label="Enter Amount" type="number" :class="$vuetify.breakpoint.smAndDown ? 'caption': ''" :rules="defaultRules"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-textarea outlined dense hide-details label="Note" v-model="userdefinedObj.description" :class="$vuetify.breakpoint.smAndDown ? 'caption': ''"></v-textarea>
              </v-col>
            </v-row>
            <v-row v-if="userdefinedObj._id">
              <v-col>
                <v-data-table dense :headers="headers" :items="[]" :items-per-page="25"  :search="search" class="elevation-1"></v-data-table>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-layout justify-center class="text-center">
              <v-flex>
                <v-btn color="success" class="mr-2">{{ userdefinedObj._id ? 'update' : 'save' }}</v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
          </v-card>
        </v-form>
  </div>
</template>
<script>
import * as fb from '@/firebase'

export default {
  data () {
    return {
      userdefinedObj: { },
      listOfCustomers: [],
      listOfAgents: []
    }
  },
  mounted () {
    if (this.$route.params.id) this.getSingleRecord(this.$route.params.id)
    this.getAllRecords()
  },
  computed: {
    headers () {
      return [{
        text: 'Loan No',
        value: 'name'
      }, {
        text: 'Date',
        value: 'description'
      }, {
        text: 'Amount',
        value: 'iscommon'
      }, {
        text: 'Agent',
        value: 'availabletousers'
      },
      {
        text: 'Actions',
        value: 'actions'
      }]
    }
  },
  methods: {
    getSingleRecord () {
      //
    },
    async getAllRecords () {
      const customers = []
      const agents = []
      await fb.usersCollection.where('role', '==', 'customer').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => customers.push(doc.data()))
      })
      this.listOfCustomers = customers.slice()
      await fb.usersCollection.where('role', '==', 'agent').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => agents.push(doc.data()))
      })
      this.listOfAgents = agents.slice()
    }
  }
}
</script>

<style>
#table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#table td, #table th {
  border: 1px solid #ddd;
  padding: 4px;
}

#table tr:hover {background-color: #ddd;}

#table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #1976d2;
  color: white;
}
.scrollbox {
  overflow: auto;
}
</style>
<style scoped>
.v-list-item {
  min-height: 25px !important;
}
</style>
