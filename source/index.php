
<html class="page" lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="shortcut icon"
      href="https://faviconka.ru/ico/1/faviconka.ru_1_116474.ico"
      type="image/x-icon"
    />
    <link
      rel="icon"
      href="https://faviconka.ru/ico/1/faviconka.ru_1_116474.ico"
      type="image/x-icon"
    />
    <link rel="stylesheet" href="css/style.min.css" />
    <link
      rel="preload"
      href="./fonts/montserrat-v23-latin_cyrillic-regular.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />
    <link
      rel="preload"
      href="./fonts/montserrat-v23-latin_cyrillic-200.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />
    <link
      rel="preload"
      href="./fonts/montserrat-v23-latin_cyrillic-600.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />
    <title>Конвертация</title>
  </head>

  <div class="container">
    <?php
      include 'stat.php'
    ?>
  </div>

  <body>
    <div class="upload-page">
      <div class="container">
        <div class="upload">
          <div class="upload__main-title-block">
            <h1 class="upload__main-title">
              Приложение для создания таблиц Excel из&nbsp;отчетов программы
              подбора VRV&nbsp;Xpress для формирования ТКП в 1C:ERP
            </h1>
            <div class="upload__main-title-img"></div>
          </div>
          <div class="upload__input-wrap">
            <label class="upload__label" data-input="0">
              <input
                type="file"
                accept="docx,doc"
                name="file-0"
                class="upload__input visually-hidden"
                multiple
              />
              <p class="upload__title">
                Нажмите на эту область, чтобы загрузить файлы или перетащите их
                сюда. *
                <br />
                <span>
                  * Выбирать и перетаскивать можно сразу несколько файлов.
                </span>
                <span>* Файлы можно добавлять к уже загруженным.</span>
              </p>
              <p class="upload__desc">Файлы .docx</p>
            </label>
          </div>

          <div class="upload__input-results">
            <div class="upload__result" data-result="0">
              <div class="upload__name">
                Файлы загружены
                <div class="upload__failed-files-block" style="display: none">
                  <p class="upload__failed-files-title">
                    В этих файлах системы не найдены:
                  </p>
                  <div class="upload__failed-files"></div>
                </div>
              </div>
              <button type="button" class="upload__close">
                <b>Очистить</b>
                <!-- <svg class="upload__close-icon" role="img" width="24" height="24">
                  <use xlink:href="img/sprite.svg#icon-close_small"></use>
                </svg> -->
              </button>
            </div>
          </div>

          <div class="loader">
            <div class="lds-dual-ring"></div>
            <div class="loader__count">
              <span class="loader__count-label"><span>Файлы:&nbsp;</span></span>
              <span class="loader__count-current"></span>/<span
                class="loader__count-max"
              ></span>
              <div class="loader__filename">
                <span> </span>
                <div class="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
            <div class="loader__bar"></div>
          </div>
        </div>

        <div class="result-block">
          <!-- Блок с выбором опций -->
          <div class="result-block__accessories" style="display: none">
            <div class="result-block__refnets">
              <label>
                <input type="checkbox" name="refnets" />
                <span>Использовать рефнеты DRQ</span>
              </label>
            </div>
            <div class="result-block__controllers">
              <div class="result-block__controllers-title">Пульты</div>
              <label>
                <input
                  type="radio"
                  name="controller"
                  value="BRC1H52W"
                  checked
                />
                <span>BRC1H52W (белый)</span>
              </label>
              <label>
                <input type="radio" name="controller" value="BRC1H52S" />
                <span>BRC1H52S (серебристый)</span>
              </label>
              <label>
                <input type="radio" name="controller" value="BRC1H52K" />
                <span>BRC1H52K (черный)</span>
              </label>
              <label>
                <input type="radio" name="controller" value="BRC1D52" />
                <span>BRC1D52</span>
              </label>
              <label>
                <input type="radio" name="controller" value="DC60W" />
                <span>DC60W</span>
              </label>
            </div>
            <i>
              <b>
                При добавлении новых систем к существующим, проверьте рефнеты и
                пульты, если нужно, отметьте еще раз "галочки"
              </b>
            </i>
          </div>

          <!-- Блок с кнопками переключения между раздельной о общей таблицами -->
          <div class="result-block__radios">
            <button
              id="separate-radio"
              class="result-block__radio-item"
              disabled
            >
              Спецификация посистемно
            </button>
            <button id="total-radio" class="result-block__radio-item" disabled>
              Спецификация общая
            </button>
            <button id="ppd-radio" class="result-block__radio-item" disabled>
              Спецификация PPD
            </button>
          </div>

          <!-- Блок с таблицей посистемной спецификации -->
          <div class="result-info" style="display: none">
            <button class="save-button" id="button">Скачать</button>
            <i>
              <b>
                Если в названии систем есть тире с пробелами по бокам (" - ")
                могут неправильно отображаться названия
              </b>
            </i>
            <div class="result"><table></table></div>
          </div>

          <!-- Блок с таблицей общей спецификации -->
          <div class="result-total-info" style="display: none">
            <button class="save-button" id="button-total">Скачать</button>
            <div class="result-total"><table></table></div>
          </div>

          <!-- Блок с таблицей спецификации PPD -->
          <div class="result-ppd" style="display: none">
            <div class="result-ppd__title">DCM-BMS-01 + PPD</div>
            <div class="result-ppd__sub-title">
              Расчет системы управления с функцией учета потребляемой
              электоэнергии является ориентировочным и не учитывает
              специфических особенностей конкретного объекта!!!
            </div>

            <button class="save-button" id="button-ppd">Скачать</button>
            <button class="save-button-light" id="ppd-check-all">
              Выбрать все системы
            </button>
            <button class="save-button-light" id="clear-ppd-group">
              Сбросить
            </button>
            <button class="save-button-light" id="make-ppd-group">
              Создать группу управления
            </button>
            <div class="result-ppd__messages">
              <div>
                Отметьте системы, которые будут входит в одельнут группу
                управления (для нее PPD рассчитывается независимо). Например,
                это отдельный корпус
              </div>
              <div>
                Отметьте сначала одну систему, а затем комбинацией клавиш SHIFT
                + <span class="mouse-img"></span> щелкните по другой системе.
                Будут выбраны все системы между отмеченными.
              </div>
            </div>
            <div class="result-ppd__options"></div>
            <div class="result-ppd__groups"></div>
            <div class="result-ppd__table">
              <table></table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="preloader"><div class="lds-dual-ring"></div></div>

    <div class="modal" id="error-modal">
      <div class="modal__blackout">
        <div class="modal__content">
          <h2 class="modal__title">Внимание!</h2>
          <div class="modal__text">
            <span>В этих загруженных файлах системы не найдены:</span>
            <div class="modal__failed-files"></div>
          </div>
          <button type="button" class="modal__button">Закрыть</button>
        </div>
      </div>
    </div>

    <script src="js/main.min.js"></script>
  </body>
</html>
