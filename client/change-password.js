
Template.changePassword.events({
  'click button[name=change-password]' (evt, tmpl)
  {

    evt.preventDefault(); //새로 고침 방지

    var oldPassword = tmpl.find('#old-password').value;
    var newPassword = tmpl.find('#new-password').value;
    var newPasswordConfirm = tmpl.find('#new-password-confirm').value;


    try
    {
      NotEmptyString(oldPassword);
      NotEmptyString(newPassword);
      NotEmptyString(newPasswordConfirm);
      isValidPassword(newPassword);
      isMatchPassword(newPassword, newPasswordConfirm);
    }
    catch(err)
    {
      Bert.alert( err.message , 'danger', 'growl-top-right' );

      return;
    }

    Accounts.changePassword(oldPassword, newPassword, function(err)
    {
      if(!err)
      {
        Bert.alert('패스워드를 변경했습니다.' , 'success', 'growl-top-right');
      }
      else
      {
        console.log(err);

        var errMessage = '';

        if(err.message === 'Incorrect password [403]')
        {
          errMessage = "기존 비밀번호가 다릅니다."
        }
        else
        {
          errMessage = err.message;
        }

        Bert.alert( errMessage , 'danger', 'growl-top-right' );
      }
    });

  }
});
