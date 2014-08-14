displayMessage2 = function (tipo, message) {
  $('#info-paragraph-text2').text(message);

  $('#info-paragraph2').show();
  $('#info-paragraph2').removeClass();
  $('#info-paragraph2').addClass('form-element');
  $('#info-paragraph2').addClass('alert');
  $('#info-paragraph2').addClass(tipo);
}

Template.manageusers.rendered = function () {
  $('#info-paragraph2').hide();
}
