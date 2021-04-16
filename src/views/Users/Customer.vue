<template>
  <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1" >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>CUSTOMERS</v-toolbar-title>
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
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field v-model="editedItem.email" label="Email" :rules="emailRules"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field v-model="editedItem.phone" label="Phone" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-textarea v-model="editedItem.address" label="Address" ></v-textarea>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-textarea v-model="editedItem.description" label="Description" ></v-textarea>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field v-model="editedItem.role" label="Role" readonly></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field v-model="editedItem.password" label="Password" :rules="defaultRules"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-file-input label="File input" filled v-model="profile" prepend-icon="mdi-camera" @change=" profile ? createImage(profile) : false"></v-file-input>
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
    // defaultRules: [v => !!v || 'Required'],
    // emailRules: [v => !!v || 'E-mail is required', v => /.+@.+/.test(v) || 'E-mail must be valid'],
    profile: null,
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
      role: 'customer'
    },
    defaultItem: {
      name: '',
      role: 'customer'
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Customer' : 'Edit Customer'
    }
  },
  created () {
    this.getCustomersRecords()
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
    async getCustomersRecords () {
      await fb.usersCollection.where('role', '==', 'customer').get().then((querySnapshot) => {
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
    createImage (file) {
      if (file) {
        var reader = new FileReader()
        reader.onload = (e) => { this.editedItem.profile = e.target.result }
        reader.readAsDataURL(file)
      }
    },
    saveUpdateHandler () {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.$store.dispatch('signup', this.editedItem)
          this.getCustomersRecords()
        }
        this.close()
      }
    }
  }
}
</script>
