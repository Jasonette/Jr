// Where to POST data to
var formUrl = 'http://jasonx.herokuapp.com/jrs.json'
// List of repos for placeholder
var repos = ['facebook/react', 'twbs/bootstrap', 'angular/angular.js', 'vuejs/vue', 'jashkenas/backbone', 'emberjs/ember.js', 'mozbrick/brick']
// Foundation 6
$(document).foundation()
// Submit form placeholder
superplaceholder({
  el: document.querySelector('.repo-placeholder'),
  sentences: repos,
  options: {
    loop: true,
    shuffle: true,
    startOnFocus: false
  }
})
// Search bar placeholder
superplaceholder({
    el: document.querySelector('.search-placeholder'),
    sentences: repos,
    options: {
        startOnFocus: true,
        loop: true,
        shuffle: true
    }
})
// Form submit
$('#form').submit(function(e) {
  // Prevent default action
  e.preventDefault()
  var form = $('#form')
  // jQuery validation plugin
  form.validate()
  // Serialize form data to array
  var data = form.serializeArray()
  // Prepend github url to repo
  data[0].value = "https://github.com/" + data[0].value
  // Log data
  console.log(data)
  if (form.valid()) {
    // Ajax POST data to formUrl
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
  }
})
