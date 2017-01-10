// Where to POST data to
var formUrl = 'http://jasonx.herokuapp.com/jrs.json'
// List of repos for placeholder
var repos = ['facebook/react', 'twbs/bootstrap', 'gliechtenstein/JasonConsoleAction']
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
// Form submit
$('#form').submit((e) => {
  // Prevent default action
  e.preventDefault()
  var form = $('#form')
  var success = $('#success')
  var error = $('#error')
  // jQuery validation plugin
  form.validate()
  // Serialize form data to array
  var data = form.serializeArray()
  // Prepend github url to repo
  data[0].value = 'https://github.com/' + data[0].value
  if (form.valid()) {
    // Ajax POST data to formUrl
    $.ajax({
      url: formUrl,
      type: 'post',
      data: data,
      success: function (data, status, jqXHR) {
        var j = jqXHR.responseJSON
        console.log(jqXHR)
        error.hide()
        success.show()
        success.html('Success')
        success.html(
          jqXHR.status + ' ' + jqXHR.statusText
          + '<br>' + 'ID: ' + j.id
          + '<br>' + 'Classname: ' + j.classname
          + '<br>' + 'Version: ' + j.version
          + '<br>' + 'Name: ' + j.name
          + '<br>' + j.platform
          + '<br>' + j.sha
        )
      },
      error: function (jqXHR, status, err) {
        var j = jqXHR.responseJSON
        console.log(jqXHR)
        success.hide()
        error.show()
        error.html('Error')
        error.html(
          jqXHR.status + ' ' + jqXHR.statusText
          + '<br>' + 'ID: ' + j.jr.id
          + '<br>' + 'Classname: ' + j.jr.classname
          + '<br>' + 'Version: ' + j.jr.version
          + '<br>' + 'Name: ' + j.jr.name
          + '<br>' + j.jr.platform
          + '<br>' + j.jr.sha
        )
        // l to not conflict with e
        for(var l = 0; l < j.errors.length; l++) {
          error.append('<br>' + j.errors[l].charAt(0).toUpperCase() + j.errors[l].substring(1))
        }
      }
    })
  }
})
