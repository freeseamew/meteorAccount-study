
Template.home.events({
  'click button[name=btn-logout]' (vet, tmpl)
  {
    event.preventDefault();
    Meteor.logout();
  },
  'click button[name=resend-verification-link]' ( event, template ) {

    showLoadingEffect.set(true);

    let user = Meteor.userId();

    Meteor.call( 'sendVerificationLink', user, ( error, response ) => {
      if ( error ) {
        showLoadingEffect.set(false);
        Bert.alert( error.reason, 'danger' );
      }
      else
      {


        showLoadingEffect.set(false);
        let email = Meteor.user().emails[ 0 ].address;
        Bert.alert( `Verification sent to ${ email }!`, 'success' );
      }
    });
  }
});
