<template>
  <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1" >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>AGENTS</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px" >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> NEW </v-btn>
          </template>
          <v-card>
            <v-card-title> <span class="headline">{{ formTitle }}</span> </v-card-title>
            <v-card-text>
              <v-container>
                <v-form ref="form">
                  <v-row>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field v-model="editedItem.name" label="Name" :rules="defaultRules"></v-text-field>
                    </v-col><v-col cols="12" sm="6" md="4" >
                      <v-text-field v-model="editedItem.email" label="Email" :rules="emailRules"></v-text-field>
                    </v-col><v-col cols="12" sm="6" md="4" >
                      <v-text-field v-model="editedItem.phone" label="Phone" :rules="phoneRules"></v-text-field>
                    </v-col><v-col cols="12" sm="6" md="4" >
                      <v-text-field v-model="editedItem.role" label="Role" readonly></v-text-field>
                    </v-col><v-col cols="12" sm="6" md="4" >
                      <v-text-field v-model="editedItem.password" label="Password" :rules="defaultRules"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.profile" label="Profile" ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close" > Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="saveUpdateHandler" > Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.profile`]="{ item }">
      <v-img :src="item.profile" height="100px" contain></v-img>
    </template>
    <!-- <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)" > mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)" > mdi-delete </v-icon>
    </template> -->
    <template v-slot:no-data>
      <span>There are No Records</span>
    </template>
  </v-data-table>
</template>
<script>
import * as fb from '@/firebase'
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      { text: 'Email', value: 'email' },
      { text: 'Phone', value: 'phone' },
      { text: 'Role', value: 'role' },
      { text: 'Profile', value: 'profile' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      role: 'agent'
    },
    defaultItem: {
      name: '',
      role: 'agent'
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Agent' : 'Edit Agent'
    }
  },
  created () {
    this.getAgentsRecords()
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  methods: {
    async getAgentsRecords () {
      await fb.usersCollection.where('role', '==', 'agent').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => this.desserts.push(doc.data()))
      })
    },
    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    saveUpdateHandler () {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.$store.dispatch('signup', this.editedItem)
          this.getAgentsRecords()
        }
        this.close()
      }
    }
  }
}
</script>
