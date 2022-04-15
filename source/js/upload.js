import { loader } from "./fileLoader";
import { makeTotalTable, clearTotalTable } from "./totalTable";
import quantityInputEventListeners from "./quantityInputEventListeners";
import {
  getTablesFromDoc,
  makeSeparateTable,
  clearSeparateTable,
} from "./separateTable";
import { totalSystems } from "./globalData";
import { resultLabel } from "./resultLabel";
import { dropdownEvents } from "./dropdownEvents";
import { resultBlock } from "./resultBlock";
import { resetRefnetsCheckbox } from "./changeAccessories";
import { resetControllers } from "./changeAccessories";
import { modal } from "./errorModal";
import ppd from "./ppd";

const uploads = document.querySelectorAll(".upload");

function onLastFileLoaded() {
  resultLabel.show();

  if ($(".result table").find("tr").length > 0) {
    resultBlock.show();
    // $(".result-block__radios button").removeAttr("disabled");
    // $(".result-block__radios button").first().addClass("active");
    // $(".result-info").show();
    // $(".result-block__accessories").show();

    makeTotalTable();

    quantityInputEventListeners.remove();
    quantityInputEventListeners.add();
  }

  setTimeout(() => {
    loader.remove();
    modal.isNeededToShow() && modal.show();
  }, 1000);
}

////FUNCTION FOR MULTIFILES INPUT
function readmultifiles(input, files) {
  var reader = new FileReader();

  resultLabel.resetNewFailedFileStatus();
  loader.add(files);

  function readFile(index) {
    if (index >= files.length) return;

    var file = files[index];

    reader.onloadstart = function (e) {
      if (index === 0) {
        console.log(
          "load started",
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );
        //loader.add(files);
      }
    };

    reader.onprogress = function (e) {};

    reader.onload = function (e) {
      const result = mammoth
        .convertToHtml({
          arrayBuffer: reader.result,
        })
        .then((res) => {
          //get converted to html document
          const $doc = $("<div></div>");
          $doc.append(res.value);

          //take usefull part from converted document
          //const usefullPart = getUsefullPart($doc);
          const resultTables = getTablesFromDoc($doc, file);

          //throw error if no success
          if (!resultTables) {
            // alert(`
            // Ошибка!
            // Файл не содержит систем:
            // "${file.name}"
            //             `);
            // loader.remove();

            // $(".upload__close").trigger("click");
            //loader.remove();

            //modal.show(file.name);
            //return;
            resultLabel.addFailedFilename(file.name);
            // $(".upload__failed-files-block").show();
            // $(".upload__failed-files").append(
            //   `<div class='upload__failed-files-item'>${file.name}</div>`
            // );
          }

          //take tables from usefull part
          //const $tables = $("<div></div>").append(usefullPart);
          //make proper format of tables for render
          //const currentTables = getTablesFromDoc(usefullPart);

          //render detailed and total tables
          //$(".result table").append(resultTables);
          makeSeparateTable(resultTables);
          ppd.renderOptions();

          //render currently loading file name
          if (index < files.length - 1) {
            loader.setFileName(files[index + 1]);
          }

          //render files quantity progress
          loader.setStage(index);

          //on files loading finish
          if (index === files.length - 1) {
            onLastFileLoaded();
            // resultLabel.show();

            // if ($(".result table").find("tr").length > 0) {
            //   $(".result-block__radios button").removeAttr("disabled");
            //   $(".result-block__radios button").first().addClass("active");
            //   $(".result-info").show();
            //   $(".result-block__accessories").show();

            //   makeTotalTable();

            //   quantityInputEventListeners.add();
            // }

            // setTimeout(() => {
            //   loader.remove();
            // }, 1000);
          }

          readFile(index + 1);
        })
        .catch((err) => {
          resultLabel.addFailedFilename(file.name);
          // $(".upload__failed-files-block").show();
          // $(".upload__failed-files").append(
          //   `<div class='upload__failed-files-item'>${file.name}</div>`
          // );

          //render currently loading file name
          if (index < files.length - 1) {
            loader.setFileName(files[index + 1]);
          }

          //render files quantity progress
          loader.setStage(index);

          //on files loading finish
          if (index === files.length - 1) {
            onLastFileLoaded();
            // resultLabel.show();

            // if ($(".result table").find("tr").length > 0) {
            //   $(".result-block__radios button").removeAttr("disabled");
            //   $(".result-block__radios button").first().addClass("active");
            //   $(".result-info").show();
            //   $(".result-block__accessories").show();

            //   makeTotalTable();

            //   quantityInputEventListeners.add();
            // }

            // setTimeout(() => {
            //   loader.remove();
            // }, 1000);
          }

          readFile(index + 1);
        });
    };

    reader.readAsArrayBuffer(file);
  }

  readFile(0);
}

////READ INPUT FILES
const readUrl = (input) => {
  if (input.files && input.files[0]) {
    readmultifiles(input, input.files);
  }
};

///FILE CHANGE HANDLER
const onFileChange = (e) => {
  readUrl(e.currentTarget);
};

////FILE DROP HANDLER
function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;

  const target = e.currentTarget;
  const input = target.querySelector("input");

  if (input.files && input.files[0]) {
    input.value = "";

    if (!/safari/i.test(navigator.userAgent)) {
      input.type = "";
      input.type = "file";
    }
  }

  input.files = files;
  readUrl(input);
}

////CLEAR ALL FIELDS HANDLER
function onFileClear(e) {
  const $input = $(".upload__label input");

  $input[0].value = "";

  if (!/safari/i.test(navigator.userAgent)) {
    $input[0].type = "";
    $input[0].type = "file";
  }

  quantityInputEventListeners.remove();

  resultLabel.hide();

  resultBlock.hide();
  // $(".result-block__radios button").attr("disabled", "true");
  // $(".result-block__radios button").first().removeClass("active");
  // $(".result-block__radios button").last().removeClass("active");
  // $(".result-info").hide();
  // $(".result-total-info").hide();
  // $(".result-block__accessories").hide();

  clearSeparateTable();
  clearTotalTable();
  ppd.clearResult();
  //$(".result-total table").html("");
  resetRefnetsCheckbox();
  resetControllers();

  // $(".upload__failed-files-block").hide();
  // $(".upload__failed-files").html("");

  totalSystems.reset();
}

////ALL EVENT LISTENERS
function addEventListeners($inputLabel, $result) {
  const input = $inputLabel.children("input")[0];
  const inputLabel = $inputLabel[0];
  const fileClearBtn = $result.find(".upload__close")[0];

  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    inputLabel.addEventListener(eventName, dropdownEvents.prevent, false);
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    inputLabel.addEventListener(eventName, dropdownEvents.highlight, false);
  });

  ["dragleave", "drop"].forEach((eventName) => {
    inputLabel.addEventListener(eventName, dropdownEvents.unhighlight, false);
  });

  inputLabel.addEventListener("drop", handleDrop, false);
  input.addEventListener("change", onFileChange);
  fileClearBtn.addEventListener("click", onFileClear);
}

////ADD EVENT LISTENERS
uploads.forEach(function (upload) {
  const $inputLabel = $(upload).find(".upload__label");
  const $result = $(upload).find(".upload__result");

  if (!$(upload).hasClass("disabled")) {
    addEventListeners($inputLabel, $result);
  }
});
