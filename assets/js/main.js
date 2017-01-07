var formUrl = 'http://jasonx.herokuapp.com/jrs.json'
$(document).foundation()
$('#form').submit(function(e) {
  e.preventDefault()
  var data = $('#form').serializeArray()
  data[0].value = "https://github.com/" + data[0].value
  console.log(data)
  $.ajax({
    url: formUrl,
    type: 'post',
    data: data,
    success: function(data, status, jqXHR) {
      console.log(jqXHR.responseText)
      $('.response').html(jqXHR.responseText)
    },
    error: function(jqXHR, status, err) {
      window.alert(err)
      console.log(err)
    }
  })
})
