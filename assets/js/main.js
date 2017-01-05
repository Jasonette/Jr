/* global $ */
$(document).foundation()
$('#form').submit(function (e) {
  e.preventDefault()
  $.ajax({
    url: '/log/',
    type: 'post',
    data: $('#form').serialize(),
    success: function (data, status, jqXHR) {
      console.log(jqXHR.responseText)
      $('.response').html(jqXHR.responseText)
    },
    error: function (jqXHR, status, err) {
      window.alert(err)
      console.log(err)
    }
  })
})
