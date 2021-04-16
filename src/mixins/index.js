export default {
  data () {
    return {
      defaultRules: [v => !!v || 'Required'],
      emailRules: [v => !!v || 'E-mail is required', v => /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(v) || 'E-mail must be valid'],
      phoneRules: [v => !!v || 'Required', v => /^[0-9]+$/.test(v) || 'Not Valid Number', v => (v && v.length === 10) || 'Phone Number must have 10 digits']
    }
  },
  computed: {
    //
  },
  methods: {
    //
  }
}
