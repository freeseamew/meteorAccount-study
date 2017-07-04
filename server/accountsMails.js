// 공통사항
Accounts.emailTemplates.siteName = "사이트이름";
Accounts.emailTemplates.from     = "보내는 사람 <보내는사람이메일@gmail.com>"; // 보내는 주소 정보

// 가입확인 메일
Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "Meteor accounts 가입확인 메일";
  },
  text( user, url ) {
    let emailAddress   = user.username,
      urlWithoutHash = url.replace( '#/', '' ),
      supportEmail   = "보내는 이메일 주소",
      emailBody      = `이메일 주소를 확인하려면 (${emailAddress}) 다음 링크를 방문하십시오. \n\n link: ${urlWithoutHash} \n\n 만약 확인을 요청하지 않은 경우, 이 이메일을 무시하십시오. 문제가 있다고 생각되면 다음 서비스 지원팀에 문의하십시오. \n\n 문의주소 : ${supportEmail}.`;

    return emailBody;
  }
};


// 비밀번호 변경 메일
Accounts.emailTemplates.resetPassword = {
  subject() {
    return "Meteor accounts 비밀번호 변경 메일";
  },
  text( user, url ) {
    //let emailAddress   = user.emails[0].address,
    let emailAddress   = user.username,
      urlWithoutHash = url.replace( '#/', '' ),
      supportEmail   = "보내는 이메일 주소",
      emailBody      = `비밀번호 변경 을 원하시면 다음 링크를 클릭해주세요. \n\n link: ${urlWithoutHash} \n\n 만약 확인을 요청하지 않은 경우, 이 이메일을 무시하십시오. 문제가 있다고 생각되면 다음 서비스 지원팀에 문의하십시오. \n\n 문의 주소 : ${supportEmail}.`;

    return emailBody;
  }
};
