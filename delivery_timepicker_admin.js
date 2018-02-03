/*
 * A script for 
 *
 * Project web page: 
 * Ecwid shopping cart: http://www.ecwid.com
 *
 */

/*
 * EcwidDeliveryTimepickerAdmin module - the main one. 
 * It also provides interfaces to all included modules
 */


// ДАЛЕЕ: 
// - повесить обработчик на загрузку ДОМа, и прописывать данные из страджа в форму (инит формы данными пользователя)
// - на инит формы также завязать привязку обработчиков на кждое поле с атрибутом data-... . Обработчики onchange для чекбоксов и хитрые с задержками для текстов. Пример хитрых приведен под кодом ниже. 
// - после этого вся форма будет читаться и сохраняться сама
// - далее добавить поле с перечислением shipping options, чтобы ограничить то, где появляется пикер
// - далее добавить карточку статуса, она закоментирована в html коде.


var EcwidDeliveryTimepickerAdmin = (function(module) {
  var _appConfig = {
    'publicConfigFieldsHtmlAttr': 'app-public-config-key',
    'appClientId': 'delivery-time-picker'
  }

  var _userConfig;

  function _init() {
    EcwidApp.init({
      app_id: _appConfig.appClientId,
      autoloadedflag: true, 
      autoheight: true
    });

    // Get the store ID and access token
    var storeData = EcwidApp.getPayload();
    var storeId = storeData.store_id;
    var accessToken = storeData.access_token;
    var language = storeData.lang;

    if (storeData.public_token !== undefined){
      var publicToken = storeData.public_token;
    }

    if (storeData.app_state !== undefined){
      var appState = storeData.app_state;
    }
  };

  /*
   * Extend target object with a given source object
   */
  function _extend(target, src, isRecursive) {
    var targetType = typeof (target);
    var srcType = typeof (src);
    if (
      'undefined' == targetType
      || 'undefined' == srcType
    ) {
      return src || target;
    }

    if (target === src) {
      return target;
    }

    if ('object' == srcType) {
      if ('object' != targetType) {
        target = {};
      }
      for (var key in src) {
        if (isRecursive) {
          target[key] = _extend(target[key], src[key], isRecursive);

        } else {
          target[key] = src[key];
        }
      }

    } else {
      target = src;
    }

    return target;
  }

  /*
   *
   */
  function _saveUserConfig() {
    var userConfig = {};
    jQuery("[data-" + _appConfig.publicConfigFieldsHtmlAttr + "]").each(function(index, element) {
      var key = jQuery(element).data(_appConfig.publicConfigFieldsHtmlAttr);
      var value = element.value;
      switch(element.type) {
        case 'checkbox':
          value = element.checked;
          break;

        default:
          value = element.value;
      }
      userConfig[key] = value;
    });
    EcwidApp.setAppPublicConfig(JSON.stringify(userConfig), function(){
      //console.debug('Public config saved!');
    });
    //console.warn(userConfig);
    //console.warn(JSON.stringify(userConfig));
    _getUserPublicConfig();
  }

  /*
   *
   */
  function _getUserPublicConfig() {
    //var userConfig = EcwidApp.getAppStorage();
    EcwidApp.getAppStorage("public", function(storage) {
      var userConfig = JSON.parse(storage);
    });
    
  }


  // Public
  return (_extend(
    module,
    {
      init: _init,
      extend: _extend,
      saveUserConfig: _saveUserConfig
    }
  ));
}(EcwidDeliveryTimepickerAdmin || {}));


// Initialize the application inside Ecwid CP
EcwidDeliveryTimepickerAdmin.init();
jQuery(document).ready(function(){
  EcwidDeliveryTimepickerAdmin.saveUserConfig();
});



// Initialize the application
// dbg: ecwidAPp может быть пустым





/*
//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 5000;  //time in ms, 5 second for example
var $input = $('#myInput');

//on keyup, start the countdown
$input.on('keyup', function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown 
$input.on('keydown', function () {
  clearTimeout(typingTimer);
});

//user is "finished typing," do something
function doneTyping () {
  //do something
}





var setData = function(){
   var data = {};

   $('#form_name').filter(':input').each(function() {
       const $id = $(this).attr('id');
       const $value = $(this).attr('value');
       data[$id] = $value;
   });

   return data;
}

var data = setObject();


$('#new_user_form *').filter(':input').each(function(){
    //your code here
});
*/