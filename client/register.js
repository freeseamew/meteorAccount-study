Template.register.onCreated(function () {
  showLoadingEffect.set(true);
});

Template.register.onRendered(function () {

  Meteor.setTimeout(function() {
    showLoadingEffect.set(false);
  }, 2 * 200);

});

Template.register.events({
  'click button[name=btn-register]' (evt, tmpl)
  {
    evt.preventDefault(); //새로 고침 방지

    var inputUsername = tmpl.find('input[name=user-email]').value;
    var inputEmail= tmpl.find('input[name=user-email]').value;
    var inputPassword = tmpl.find('input[name=user-password]').value;
    var inputPasswordAgain =  tmpl.find('input[name=user-passwordAgain]').value;
    var inputFirstName = tmpl.find('input[name=user-firstName]').value;
    var inputLastName = tmpl.find('input[name=user-lastName]').value;


    var inputUser = {
      username: inputUsername,
      email: inputEmail,
      password: inputPassword,
      passwordAgain: inputPasswordAgain,
      profile: {
        firstName: inputFirstName,
        lastName: inputLastName
      }
    }


    //서버로의 로그인 호출
    Meteor.call('register', inputUser, function (err)
    {
      if(!err)
      {
        Bert.alert( '가입에 성공했습니다. 가입한 메일로 인증을 받아주세요' , 'success', 'growl-top-right' );
        FlowRouter.go('/login');
      }
      else
      {
        Bert.alert( err.message , 'danger', 'growl-top-right' );
      }
    });

  }

});
