Template.mainLayout.onCreated(function(){

  // ReactiveVar의 경우 다른 탬플릿에서 사용하기 위해서는 window를 써 전역으로 만들어 줘야만 한다.
  window.showLoadingEffect = new ReactiveVar(false);
});

Template.mainLayout.helpers({

  //loaddingEffect()
  //{
  //  //return Session.get("loaddingEffect");
  //  return Template.instance().showLoadingEffect.get();
  //  // template.showLoadingEffect.set(true);
  //}

  showLoadingEffectLoad: function ()
  {
    return showLoadingEffect.get();
  }
});
