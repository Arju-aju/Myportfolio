jQuery(document).ready(function ($) {
  "use strict";

  // Contact
  $('form.contactForm').submit(function (e) {
    e.preventDefault(); // Prevent the default form submission

    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i,
      nameExp = /^[a-zA-Z\s]{2,}$/; // Name validation regex (at least 2 characters, no numbers)

    f.children('input').each(function () { // Run all inputs

      var i = $(this); // Current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // Error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (!i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'name':
            if (!nameExp.test(i.val())) { // Validate name field
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });

    f.children('textarea').each(function () { // Run all textareas

      var i = $(this); // Current textarea
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // Error flag for current textarea
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });

    if (ferror) return false;
    else var str = $(this).serialize();
    
    var action = $(this).attr('action');
    if (!action) {
      action = 'contactform/contactform.php';
    }
    
    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbwq3e9v1yX1HgMiie_tIVlp6_ByWIV_YYmIBUkiX-7JYX3klphwuIvUG3lNFZDEX3qe/exec",
      data: str,
      method: "post",
      success: function (response) {
        alert("Form submitted successfully");
        // window.location.reload(); // Remove or comment this line to prevent page reload
        // window.location.href = "https://google.com"; // Uncomment if you want to redirect instead
      },
      error: function (err) {
        alert("Something went wrong");
      }
    });

    return false;
  });
});
