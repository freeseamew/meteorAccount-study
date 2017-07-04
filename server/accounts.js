
Meteor.methods({

  register: function(inputUser) // 서버측에서 회원가입 실행시 사용됨.
  {

    var userEmail = inputUser.email;
    var userPassword = inputUser.password;
    var userPasswordAgain = inputUser.passwordAgain;
    var userFirstName = inputUser.profile.firstName;
    var userLastName = inputUser.profile.lastName;

    // 회원가입 입력값 검증 시작
    try
    {
      NotEmptyString(userEmail);
      NotEmptyString(userPassword);
      NotEmptyString(userPasswordAgain);
      NotEmptyString(userFirstName);
      NotEmptyString(userLastName);
      isEmail(userEmail);
      isValidPassword(userPassword);
      isMatchPassword(userPassword, userPasswordAgain);
    }
    catch (err)
    {
      throw err;
    }
    // 회원가입 입력값 검증 종료

    // 회원가입 시작
    try
    {
      Accounts.createUser({
        username: userEmail,
        email: userEmail,
        password: userPassword,
        profile: {
          serviceType: 'site',
          firstName: userFirstName,
          lastName: userLastName,
          gender: ''
        }
      });
    }
    catch (err)
    {
      throw err;
    }
    // 회원가입 종료

  },
  sendVerificationLink(user)  // 가입 확인 메일 발송
  {
    var userId = user;
    if ( userId )
    {
      return Accounts.sendVerificationEmail( userId );
    }
  }

});

//Accounts.onLogin(function () {
//  //console.log(window.currentUser);
//});

//기타서비스(facebook 등) 으로 로긴시 profile정보를 따로 입력해줘야 한다.
Accounts.onCreateUser(function (options, user)
{

  user.profile = options.profile;// 이렇게 안해주면 profile이 없는 상태로 가입됨.

  // facebook profile 설정
  if(user.services.facebook)
  {
    user.username = user.services.facebook.email;
    user.emails = [
      {
        address: user.services.facebook.email,
        verified: true
      }
    ];
    user.profile.serviceType = 'facebook';
    user.profile.firstName = user.services.facebook.first_name;
    user.profile.lastName = user.services.facebook.last_name;
    user.profile.gender = user.services.facebook.gender;
  }

  // google profile 설정
  if(user.services.google)
  {
    user.emails = [
      {
        address: user.services.google.email,
        verified: true
      }
    ];
    user.profile.serviceType = 'google';
    user.username = user.services.google.name;
    user.profile.firstName = user.services.google.given_name;
    user.profile.lastName = user.services.google.family_name;
    user.profile.gender = user.services.google.gender;
  }

  // twitter profile 설정
  if(user.services.twitter)
  {
    user.emails = [
      {
        address: 'none',
        verified: true
      }
    ];
    user.profile.serviceType = 'twitter';
    user.username = user.services.twitter.screenName;
    user.profile.firstName = user.services.twitter.screenName;
    user.profile.lastName = 'none';
    user.profile.gender = '';
  }

  if(user.services.kakao)
  {
    user.emails = [
      {
        address: 'none',
        verified: true
      }
    ];
    user.profile.serviceType = 'kakao';
    user.username = user.profile.name;
    user.profile.gender = '';
  }


  Meteor.setTimeout(function() { // setTimeout을 걸어주지 않으면 메일 발송이 안됨.

    Meteor.call('sendVerificationLink', user._id, function (err)
    {
      if (err)
      {
        throw error.reason;
      }
    });

  }, 2 * 1000);

  return user; // 꼭 새 사용자 객체를 반환해야 함.(가이드에 나와있는 내용임)

});

