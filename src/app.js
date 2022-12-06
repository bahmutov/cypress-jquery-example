// load the jQuery plugin dynamically
$.getScript('src/jquery.warning.js')

// immediately use the jQuery.warning plugin
// $(function () {
//   $('div').warning()
//   $('p').warning()
// })

// use the jQuery.warning plugin on button click
$(function () {
  $('button#warn').on('click', () => {
    $('div').warning()
    $('p').warning()
  })
})
