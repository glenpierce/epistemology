var askQuestion = () => {
  window.location='/forum/ask';
}

var submitQuestion = (formId) => {
  var formElements = document.getElementById(formId).elements;
  var postData = {};
  for (var i = 0; i < formElements.length; i++)
      if (formElements[i].type != "button")
          postData[formElements[i].name] = formElements[i].value;
  if(postData.questionTitle != "" && postData.questionBody != "") {
    console.log(postData);
    postQuestion("/forum/submit/", postData, messageCallback);
  } else {
    console.log("no post data");
  }

}


var postQuestion = (theUrl, questionObject, callback) => {
    let data = questionObject;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("POST", theUrl, true); // true for asynchronous
    xmlHttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    var dataAsJson = JSON.stringify(data);
    xmlHttp.send(dataAsJson);

}


var goToPost = (id) => {
  window.location = '/forum/post?id=' +id;
}


var messageCallback = (res) => {
  window.location = JSON.parse(res).path;
}

var replyTo = (postId, parentId) => {
  if(parentId == -1) {
    //If it's a top-level post, scroll the user to the reply box.
    var askForm = document.getElementById('askForm');
    askForm.scrollIntoView(false);
    askForm.classList.add("highlighted");
  } else {
    //If it's a second-level post, unhide the post's comment box.
    var responseFormId = "responseBox" + postId;
    hideAllResponseForms();
    var responseForm = document.getElementById(responseFormId);
    responseForm.classList.remove("hide");
  }
}

var hideAllResponseForms = () => {
  var responseForms = document.getElementsByClassName('responseBox');
  for(i = 0; i < responseForms.length; i++){
    responseForms[i].classList.add("hide");
  }
}
