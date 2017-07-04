// 필수 입력사항 체크
NotEmptyString = function (value)
{
  if(value.length > 0)
  {
    return true
  }

  throw new Meteor.Error(403, '필수 사항을 입력해주세요.');
}

// 이메일 형식 체크
isEmail = function (value)
{
  var filter = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  if(filter.test(value))
  {
    return true;
  }
  throw new Meteor.Error(403, '이메일 형식이 바르지 않습니다 ');
}

// 패스워드 6자리 이상 체크
isValidPassword = function (password)
{
  if(password.length >= 6)
  {
    return true;
  }
  throw new Meteor.Error(403, '비밀번호는 6자리 이상이여야 합니다.');

}

// 패스워드, 패스워드 확인 일치 체크
isMatchPassword = function (password, passwordAgain)
{
  if(password === passwordAgain)
  {
    return true;
  }
  throw new Meteor.Error(403, '비밀번호와 비밀번호 확인이 다릅니다.');

}

// 전화번호 : "000-0000-0000"
isPhone = function(value)
{
  var filter = /^\d{3}-\d{3,4}-\d{4}$/;
  if(filter.test(value))
  {
    return true;
  }
  throw new Meteor.Error(403, '전화번호 형식이 바르지 않습니다 ');
}

// 특정 날짜 형식 : "yyyy/mm/dd"
isBirthDay = function (value)
{
  var filter = /^(19[0-9][0-9]|20\d{2})\/(0[0-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/;
  if(filter.test(value))
  {
    return true;
  }
  throw new Meteor.Error(403, '날짜 형식이 바르지 않습니다 ');
}

