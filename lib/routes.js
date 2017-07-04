FlowRouter.route('/', {
  name: 'home',
  action: function() {
    BlazeLayout.render('mainLayout', {
      content:'home'
    });

  }
});

FlowRouter.route('/login', {
  name: 'login',
  action() {
    BlazeLayout.render('mainLayout', {
      content: 'login'
    });

  }
});

FlowRouter.route('/register', {
  name:'register',
  action: function() {
    BlazeLayout.render('mainLayout', {
      content: 'register'
    });

  }
});

FlowRouter.route('/changePassword', {
  name:'changePassword',
  action: function()
  {
    if(Meteor.user())
    {
      BlazeLayout.render('mainLayout', {
        content: 'changePassword'
      });
    }
    else
    {
      FlowRouter.go('/');
    }
  }
});


//이메일 인증 관련
FlowRouter.route( '/verify-email/:token', {
  name: 'verify-email',
  action( params )
  {
    Accounts.verifyEmail( params.token, ( error ) => {
      if ( error )
      {
        Bert.alert( error.reason, 'danger' );
      }
      else
      {
        FlowRouter.go( '/' );
        Bert.alert( '이메일 인증에 성공했습니다.', 'success' );
      }
    });
  }
});


// 비밀번호 변경 관련
FlowRouter.route('/recover', {
  name:'recoverPassword',
  action: function()
  {
    BlazeLayout.render('mainLayout', {
      content: 'recoverPassword'
    });
  }
});

FlowRouter.route( '/reset-password/:token', {
  name: 'reset-password/',
  action( params )
  {
    window.resetPasswordVar = new ReactiveVar(params.token);
    FlowRouter.go( '/recover' );
  }
});

