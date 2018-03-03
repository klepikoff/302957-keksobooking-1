'use strict';

/*
Создайте модуль backend.js, который экспортирует в глобальную область видимости функции для взаимодействия с удалённым севером через XHR.

- получать с сервера данные с помощью объекта XMLHttpRequest, обрабатывать полученные запросы и передавать полученную информацию в функцию обратного вызова;
отправлять данные на сервер.
Функция получения данных с сервера должна принимать на вход следующие параметры:

onLoad — функция обратного вызова, которая срабатывает при успешном выполнении запроса. При вызове функции onLoad в её единственный параметр передаётся набор полученных данных;
onError — функция обратного вызова, которая срабатывает при неуспешном выполнении запроса. При вызове функции onError в её единственный параметр передаётся сообщение об ошибке.

*/
(function () {
  window.backend = {};
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.backend.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', URL);
    xhr.send();
  };
})();
