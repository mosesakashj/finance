<template>
  <div>
    <v-row class="px-2">
      <v-col cols="4" class="py-1">
        <v-btn text class="ma-2" color="primary" @click="$router.push('/loans')"><v-icon>mdi-arrow-left</v-icon></v-btn>
      </v-col>
    </v-row>
    <v-form ref="form">
      <v-card>
        <v-card-text class="mt-2">
        <v-row>
          <v-col cols="12" lg="4" md="4" sm="6">
            <v-autocomplete outlined :items="listOfCustomers" :disabled="fieldsDisabled" item-text="name" item-value="uid" label="Select Customer" v-model="userdefinedObj.customer" :rules="defaultRules" dense hide-details></v-autocomplete>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="6">
            <v-autocomplete outlined :items="listOfAgents" :disabled="fieldsDisabled" item-text="name" item-value="uid" label="Select Agent" v-model="userdefinedObj.agent" :rules="defaultRules" dense hide-details></v-autocomplete>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="6">
            <v-select outlined :items="['week', 'day']" :disabled="fieldsDisabled" label="Select Collection Type" v-model="userdefinedObj.type" dense hide-details :rules="defaultRules"></v-select>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="6">
            <v-text-field outlined dense :disabled="fieldsDisabled" label="Collection Count" type="number" v-model="userdefinedObj.collectionCount" :rules="userdefinedObj.type === 'week' ? [ v => v <= 20 || 'Value Must be less than 20'  ] : [ v => v <= 100 || 'Value Must be less than 100'  ]"></v-text-field>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="6">
            <v-text-field outlined dense hide-details :disabled="fieldsDisabled" label="Enter Amount" v-model="userdefinedObj.loanAmount" type="number" :rules="defaultRules"></v-text-field>
          </v-col>
          <v-col cols="12" lg="4" sm="6" md="4" >
            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="userdefinedObj.date" transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field outlined v-model="userdefinedObj.date" :disabled="fieldsDisabled" label="Picker in menu" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" :rules="defaultRules" hide-details dense></v-text-field>
              </template>
              <v-date-picker v-model="userdefinedObj.date" no-title scrollable >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(userdefinedObj.date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" lg="6">
            <v-textarea outlined dense hide-details label="Note" v-model="userdefinedObj.description" :disabled="fieldsDisabled"></v-textarea>
          </v-col>
        </v-row>
        <v-row  v-if="Boolean($route.params.id)">
          <v-col>
            <v-btn color="primary" @click="dialog = true">Add Collection</v-btn>
          </v-col>
        </v-row>
        <v-row v-if="Boolean($route.params.id)">
          <v-col>
            <v-data-table dense :headers="headers" :items="userdefinedObj.Collections" :items-per-page="25"  class="elevation-1"></v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-layout class="text-center">
          <v-flex class="text-center">
            <v-btn color="success" class="mr-2" @click="saveUpdatehandler" v-if="!Boolean($route.params.id)">save</v-btn>
          </v-flex>
        </v-layout>
      </v-card-actions>
      </v-card>
    </v-form>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title> <span class="headline">User Profile</span> </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" lg="4" md="4" sm="6">
                <v-autocomplete outlined :items="listOfCustomers" :disabled="fieldsDisabled" item-text="name" item-value="uid" label="Select Customer" v-model="userdefinedObj.customer" :rules="defaultRules" dense hide-details></v-autocomplete>
              </v-col>
              <v-col cols="12" lg="4" md="4" sm="6">
                <v-autocomplete outlined :items="listOfAgents" :disabled="fieldsDisabled" item-text="name" item-value="uid" label="Select Agent" v-model="userdefinedObj.agent" :rules="defaultRules" dense hide-details></v-autocomplete>
              </v-col>
              <v-col cols="12" lg="4" md="4" sm="6">
                <v-select outlined :items="['week', 'day']" :disabled="fieldsDisabled" label="Select Collection Type" v-model="userdefinedObj.type" dense hide-details :rules="defaultRules"></v-select>
              </v-col>
              <v-col cols="12" lg="4" md="4" sm="6">
                <v-text-field outlined dense :disabled="fieldsDisabled" label="Collection Count" type="number" v-model="userdefinedObj.collectionCount" :rules="userdefinedObj.type === 'week' ? [ v => v <= 20 || 'Value Must be less than 20'  ] : [ v => v <= 100 || 'Value Must be less than 100'  ]"></v-text-field>
              </v-col>
              <v-col cols="12" lg="4" md="4" sm="6">
                <v-text-field outlined dense hide-details :disabled="fieldsDisabled" label="Enter Amount" v-model="userdefinedObj.loanAmount" type="number" :rules="defaultRules"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"> Close </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import * as fb from '@/firebase'

export default {
  data () {
    return {
      menu: false,
      userdefinedObj: { type: 'week', collections: [] },
      listOfCustomers: [],
      listOfAgents: [],
      fieldsDisabled: Boolean(this.$route.params.id),
      dialog: false
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
    async getSingleRecord () {
      await fb.loansCollection.get(this.$route.params.id).then((querySnapshot) => {
        querySnapshot.forEach((doc) => { this.userdefinedObj = doc.data() })
      })
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
    },
    saveUpdatehandler () {
      if (this.$refs.form.validate()) {
        fb.loansCollection.add(this.userdefinedObj).then(doc => {
          this.$router.push('/loans')
        })
      }
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
