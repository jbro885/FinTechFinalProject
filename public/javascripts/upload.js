'use strict'

$("#progressbarTWInput").change(function(){

  readURL(this);

});

function readURL(input){

  if(input.files && input.files[0]){

    var reader = new FileReader();

    reader.onload = function (e) {

      $("#preview_progressbarTW_img").attr('src', e.target.result);

    }

    reader.readAsDataURL(input.files[0]);

  }

}

function uploadTo(shop){
  $('#upload-shopname').text(shop);
}