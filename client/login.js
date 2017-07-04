Template.login.onCreated(function () {
  showLoadingEffect.set(true);
});

Template.login.onRendered(function () {

  Meteor.setTimeout(function() {
    showLoadingEffect.set(false);
  }, 2 * 200);

});


Template.login.events({
  'click button[name=btn-singIn]' (evt, tmpl)
  {
    evt.preventDefault();

    var inputEmail = tmpl.find('input[name=user-email]').value;
    var inputPwd = tmpl.find('input[name=user-pwasword]').value;

    try
    {
      NotEmptyString(inputEmail);
      NotEmptyString(inputPwd);
    }
    catch(err)
    {
      console.log(err);
      //Bert.alert( err.message , 'danger', 'growl-top-right' );

      return;
    }

    Meteor.loginWithPassword(inputEmail, inputPwd, function(err)
    {
      if(!err)
      {
        FlowRouter.go('/');
      }
      else
      {
        console.log(err);
        //Bert.alert( err , 'danger', 'growl-top-right' );
      }
    });

    return false;

  },
  'click button[name=facebook]' (evt, tmpl)
  {
    evt.preventDefault();
    Meteor.loginWithFacebook(function(err)
    {
      if(!err)
      {
        FlowRouter.go('/');
        console.log(currentUser);
      }
      else
      {
        console.log(err);
        Bert.alert( err , 'danger', 'growl-top-right' );
      }
    });
  },
  'click button[name=google]' (evt, tmpl)
  {
    evt.preventDefault();
    Meteor.loginWithGoogle(function(err)
    {
      if(!err)
      {
        FlowRouter.go('/');
      }
      else
      {
        console.log(err);
        Bert.alert( err , 'danger', 'growl-top-right' );
      }
    });
  },
  'click button[name=twitter]' (evt, tmpl)
  {
    evt.preventDefault();
    Meteor.loginWithTwitter(function(err)
    {
      if(!err)
      {
        FlowRouter.go('/');
      }
      else
      {
        console.log(err);
        Bert.alert( err , 'danger', 'growl-top-right' );
      }
    });
  },
  'click button[name=kakao]' (evt, tmpl)
  {
    evt.preventDefault();
    Meteor.loginWithKakao(function(err)
    {
      if(!err)
      {
        FlowRouter.go('/');
      }
      else
      {
        console.log(err);
        Bert.alert( err , 'danger', 'growl-top-right' );
      }
    });
  }

});

