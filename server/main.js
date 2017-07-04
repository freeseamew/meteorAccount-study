// Set up login services
Meteor.startup(function() {

  ServiceConfiguration.configurations.remove({
    service: "facebook"
  });
  ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: '발급받은 앱 ID',
    secret: '발급받은 앱 시크릿 코드',
    loginStyle: "popup"
  });


  ServiceConfiguration.configurations.remove({
    service: "google"
  });
  ServiceConfiguration.configurations.insert({
    service: "google",
    clientId: "발급받은 클라이언트 ID",
    secret: '발급받은 클라이언트 보안 비밀',
    loginStyle: "popup"
  });

  ServiceConfiguration.configurations.remove({
    service: "twitter"
  });
  ServiceConfiguration.configurations.insert({
    service: "twitter",
    consumerKey: "발급받은 consumer key",
    loginStyle: "popup",
    secret: "발급받은 consumer secret"
  });

  ServiceConfiguration.configurations.remove({
    service: "kakao"
  });
  ServiceConfiguration.configurations.insert({
    service: "kakao",
    clientId: "발급받은 REST API ",
    loginStyle: "popup"
  });


  Accounts.config({
    sendVerificationEmail: true
  });

  process.env.MAIL_URL="smtp 또는 smtps 정보";
});

