'use strict';

// module3-task1
(function () {
  window.map = {};
  var NUMBER_PINS = 8;

  var BOOK_TYPE_NAME = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var PIN_WIDTH = 62;
  var PIN_HEIGHT = 84;


  var map = document.querySelector('.map');
  map.classList.remove('map--faded');


  var pinsOnMap = map.querySelector('.map__pins');
  var pinsTemplate = document.querySelector('template').content.querySelector('.map__pin');

  // задание 5
  var elemBefore = document.querySelector('.map__filters-container');

  var elemParent = document.querySelector('.map');
  var elem = document.createElement('div');
  elem.className = 'new_map__card';
  elemParent.insertBefore(elem, elemBefore);

  var articleTemplatePopup = document.querySelector('template').content.querySelector('article.map__card');

  window.map.renderPopup = function (anyBook) {

    var articlePopup = articleTemplatePopup.cloneNode(true);

    //  заменили название
    articlePopup.querySelector('h3').textContent = anyBook.offer.title;

    // заменили адрес
    articlePopup.querySelector('small').textContent = anyBook.offer.address;

    // заменили цену
    articlePopup.querySelector('.popup__price').textContent = anyBook.offer.price + '₽/ночь';

    // заменили тип жилья
    articlePopup.querySelector('h4').textContent = BOOK_TYPE_NAME[anyBook.offer.type];

    // заменили количества комнат и гостей, nth-child не работает
    articlePopup.querySelector('p:nth-of-type(3)').textContent = anyBook.offer.rooms + ' комнаты для ' + anyBook.offer.guests + ' гостей';

    // заменили время приезда-выезда
    articlePopup.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + anyBook.offer.checkin + ', выезд до ' + anyBook.offer.checkout;

    // заменили удобства
    var articlePopupFeatures = articlePopup.querySelector('.popup__features');

    for (var i = 0; i < 6; i++) {
      articlePopupFeatures.removeChild(articlePopup.querySelector('li'));
    }

    for (i = 0; i < anyBook.offer.features.length; i++) {
      var li = document.createElement('li');
      li.className = 'feature feature--' + anyBook.offer.features[i];
      articlePopupFeatures.appendChild(li);
    }
    // заменили описание
    articlePopup.querySelector('p:nth-of-type(5)').textContent = anyBook.offer.description;

    // добавили фотографии
    var popupPhoto = articlePopup.querySelector('.popup__pictures');

    for (i = 0; i < anyBook.offer.photos.length; i++) {
      var popupPhotoCopy = popupPhoto.querySelector('li').cloneNode(true);
      popupPhoto.appendChild(popupPhotoCopy);

      popupPhoto.querySelector('img').setAttribute('src', anyBook.offer.photos[i]);
      popupPhoto.querySelector('img').setAttribute('width', '35px');
      popupPhoto.querySelector('img').setAttribute('heigth', '30px');
    }

    // заменили аватар
    articlePopup.querySelector('img').setAttribute('src', anyBook.author.avatar);

    var fragmentPopup = document.createDocumentFragment();

    if (elem.querySelector('article.map__card')) {
      elem.querySelector('article.map__card').remove();
    }

    fragmentPopup.appendChild(articlePopup);
    elem.appendChild(fragmentPopup);
  };
  var onLoad = function (book) {


    for (var i = 0; i < NUMBER_PINS; i++) {
      var template = pinsTemplate.cloneNode(true);
      var fragment = document.createDocumentFragment();

      template.querySelector('img').setAttribute('src', book[i].author.avatar);
      template.setAttribute('style', 'left: ' + (book[i].location.x - PIN_WIDTH / 2) + 'px; top: ' + (book[i].location.y - PIN_HEIGHT) + 'px');

      template.dataset.pinId = i;

      fragment.appendChild(template);
      pinsOnMap.appendChild(fragment);
    }

    var mapPin = document.querySelector('.map__pin--main');
    var address = document.getElementById('address');

    var parentPin = document.querySelector('.map__pins');
    parentPin.addEventListener('click', function (evt) {

      var targetPin = evt.target;
      if (targetPin.tagName === 'IMG') {
        targetPin = targetPin.parentElement;
      }

      if (targetPin.dataset.pinId !== void 0) {
        window.map.renderPopup(book[parseInt(targetPin.dataset.pinId, 10)]); //  не book, а данные с сервера
      }
      var articlePopupAll = document.querySelectorAll('article.map__card');
      if (articlePopupAll.length >= 2) {
        articlePopupAll[0].remove();
      }
    });

    mapPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      map.classList.remove('map--faded');
      document.querySelector('.notice__form').classList.remove('notice__form--disabled');
      document.querySelector('.notice__form').removeAttribute('disabled');
      var newAddressLeft = 0;
      var newAddressTop = 0;

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        newAddressLeft = mapPin.style.left;
        newAddressTop = mapPin.style.top;
        address.setAttribute('value', newAddressLeft + ', ' + newAddressTop);

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if ((mapPin.offsetTop - shift.y) < 150) {
          mapPin.style.top = 150 + 'px';
        } else if ((mapPin.offsetTop - shift.y) > 500) {
          mapPin.style.top = 500 + 'px';
        } else {
          mapPin.style.top = (mapPin.offsetTop - shift.y) + 'px';
        }

        if ((mapPin.offsetLeft - shift.x) > pinsOnMap.offsetWidth - (PIN_WIDTH / 2)) {
          mapPin.style.left = pinsOnMap.offsetWidth - (PIN_WIDTH / 2) + 'px';
        } else if ((mapPin.offsetLeft - shift.x) < (PIN_WIDTH / 2)) {
          mapPin.style.left = (PIN_WIDTH / 2) + 'px';
        } else {
          mapPin.style.left = (mapPin.offsetLeft - shift.x) + 'px';
        }
      };
      var onMouseUp = function (upEvt) {
        newAddressLeft = mapPin.offsetLeft;
        newAddressTop = mapPin.offsetTop;

        address.setAttribute('value', newAddressLeft + 'px, ' + newAddressTop + 'px');

        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
  window.backend.load(onLoad, onError);
  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var formSubmit = document.querySelector('.form__submit');
  formSubmit.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(formSubmit));
    evt.preventDefault();
    document.querySelector('.notice__form').reset();
  });
})();
