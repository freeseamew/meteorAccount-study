Template.recoverPassword.onRendered(function () {
  showLoadingEffect.set(false);
});

Template.recoverPassword.helpers({
  resetPassword: function()
  {
    //return Session.get('resetPassword');
    return resetPasswordVar.get();
    Bert.alert( resetPasswordVar.get(), 'success' );
  }
});

Template.recoverPassword.events({

  'click button[name=reset-password]' (evt, tmpl)
  {
    evt.preventDefault();

    var password = tmpl.find('#reset-password').value;
    var passwordAgain = tmpl.find('#reset-password-confirm').value;

    // 입력 검증
    try
    {
      NotEmptyString(password);
      NotEmptyString(passwordAgain);
      isMatchPassword(password, passwordAgain);
    }
    catch (err)
    {
      Bert.alert( err.message , 'danger', 'growl-top-right' );
    }

    Accounts.resetPassword(resetPasswordVar.get(), password, function(err)
    {
      if(err)
      {
        Bert.alert( '패스워드 변경중 오류가 발생했습니다.'  , 'danger', 'growl-top-right' );
      }
      else
      {
        Bert.alert('패스워드를 변경했습니다 ', 'success', 'growl-top-right');
      }
    });
  },
  'click button[name=send-email]' (evt, tmpl)
  {
    evt.preventDefault();
    showLoadingEffect.set(true);

    var email = tmpl.find('#user-email').value; // trim 대기
    Accounts.forgotPassword({email: email}, function(err)
    {
      if(err)
      {
        if(err.message == 'User not found [403]')
        {
          console.log(err.message);
          showLoadingEffect.set(false);
          Bert.alert( '해당메일로 가입자가 없습니다.' , 'danger', 'growl-top-right' );
        }
        else
        {
          showLoadingEffect.set(false);
          Bert.alert( '오류로 메일 발송에 실패했습니다. 잠시후 다시 시도해주세요.' , 'danger', 'growl-top-right' );
        }
      }
      else
      {
        showLoadingEffect.set(false);
        Bert.alert( '비밀번호 변경에 관한 메일을 발송했습니다.' , 'success', 'growl-top-right' );
      }
    });

  }
});

