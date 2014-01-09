Meteor.startup ->
  console.log('hi')
  AccountsEntry.config
    signupCode: 's3cr3t'
