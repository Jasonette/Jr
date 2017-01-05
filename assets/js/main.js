/* global $ */
$(document).foundation()
$('#form').submit(function (e) {
  e.preventDefault()
  $.post('/log/', $('#form').serialize, function (data) {
    $('.response').html(data)
  })
})
