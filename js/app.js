"use strict";

// elements
const user = document.querySelector(".user-name");
const selfStoryEl = document.querySelector('.item-stories.active img');
const selfStoryProfileEl = document.querySelector('.p-story img');
const profileImage = document.querySelector(".img-prof img");
const backDrop = document.querySelector(".overlay");
const statusUserEl = document.querySelector(".status");
const postItemEl = document.querySelectorAll(".post-item");
const likeContainerEl = document.querySelectorAll(".like-container");
const likeIcon = document.querySelectorAll(".like-ico");
const likeNumberTxt = document.querySelectorAll(".like-number");
const btnShowModalAddStory = document.querySelector(".empty");
const btnCloseModal = document.querySelectorAll(".close-modal");
const modalAddStory = document.querySelector(".modal-add-story");
const btnAddStory = document.querySelector(".import");
const btnReShowModalAddStory = document.querySelector(".add-story");
let inputCaptionStory = document.querySelector(".txt-area");
let inputMentionStory = document.querySelector(".mention");
let inputTagStory = document.querySelector(".tag");
const fileStory = document.querySelector("#file");
const btnUploadFile = document.querySelector(".btn-upload");
const uploadImageOutput = document.querySelector(".output-img");
const modalStory = document.querySelector(".modal-show-story");
const contantStory = document.querySelector(".container-contant");
const btnForwardStory = document.querySelector(".forward");
const btnBackwardStory = document.querySelector(".backward");
const itemStory = document.querySelector(".item-stories");
const progContainer = document.querySelector(".prog");



const btnModalAddPost = document.querySelector(".add-post");
const modalAddPost = document.querySelector(".modal-add-post");
const inputCaptionPost = document.querySelector(".txt-area-post");
const inputMentionPost = document.querySelector(".mention-post");
const inputTagPost = document.querySelector(".tag-post");
const filePost = document.querySelector("#file-post");
const btnUploadPostFile = document.querySelector(".btn-upload-post");
const uploadImagePostOutput = document.querySelector(".output-img-post");

const btnAddPost = document.querySelector(".import-post");
const postContainer = document.querySelector(".posts");

const modalPostInfo = document.querySelector(".modal-show-comment");
const imgPostInfo = document.querySelector(".img-post-info");
const imgProfileInfo = document.querySelector(".i--post");
const disPost = document.querySelector(".dis-post");
const tagPost = document.querySelector(".tag-post");
const btnAddComment = document.querySelector(".add-comment");
let inputAddComment = document.querySelector(".c-m-input");
const commentContainer = document.querySelector(".post-comment-container");

const btnShowDirect = document.querySelector(".direct-btn");
const btnShowLive = document.querySelector(".live-btn");
const liveContainer = document.querySelector(".live");
const directContainer = document.querySelector(".direct");
const liveVideo = document.querySelector(".live-video");

const modalCapture = document.querySelector(".modal-add-capture");
const btnAccepts = document.querySelector(".yes-btn");
const btnCancel = document.querySelector(".cancel-btn");
const choiseShareTypeScreen = document.querySelector("#screen");
const choiseShareTypeWebcam = document.querySelector("#webcam");

const btnSettingModal = document.querySelector(".setting");
const modalSetting = document.querySelector(".modal-setting");
const switchDarkMode = document.querySelector(".ch-btn");
const modeTitle = document.querySelector(".dark-txt");

const leftSide = document.querySelector(".left-side");
const h2El = document.querySelector("h2");
const header = document.querySelector("header");
const headerDirect = document.querySelector(".header-direct");
const pinnedMessage = document.querySelector(".pinned-message");
const mainPost = document.querySelector(".main-posts");
const itemDirect = document.querySelectorAll(".item-direct");
const commentLive = document.querySelectorAll(".c-box-live");
const pEl = document.querySelectorAll("p");
const MODALS = document.querySelectorAll(".modal");
const icons = document.querySelectorAll("svg path");
const inputEl = document.querySelectorAll("input");
const inputContainer = document.querySelectorAll(".form-input");

const itemPost = document.querySelectorAll(".post-item");

const commentContainerLive = document.querySelector(".c-comment");
const inputLive = document.querySelector(".c-text");
const btnCommentlive = document.querySelector(".send-c-l");
const pinContainer = document.querySelector(".p-comment");

const modalLogin = document.querySelector(".modal-login");
const inputEmail = document.querySelector(".email-input");
const inputUserName = document.querySelector(".user-name-input");
const inputPassword = document.querySelector(".password-input");
const inputRePassword = document.querySelector(".re-password-input");
const regBtn = document.querySelector(".reg-btn");
const filePic = document.querySelector("#file-pic");
const imgProf = document.querySelector(".output-prof-pic");
const btnUploadProfile = document.querySelector(".btn-upload-prof");
const chkRemember = document.querySelector("#remember");

const btnUserInfo = document.querySelector(".btn-user--info");
const boxUserInfo = document.querySelector(".user--info");
const emailInfo = document.querySelector(".--email");
const userNameInfo = document.querySelector(".--user");
const btnNotification = document.querySelector(".notification svg");
const boxNotification = document.querySelector(".toltip");
const arrElement = [
  itemDirect,
  commentLive,
  pEl,
  MODALS,
  icons,
  inputEl,
  inputContainer,
];
// variable
let isLike = false;
let isCheck = getStorageBackMode();
let slide = 0;
let time = 0;
let isWatch = true;
let cpture = null;

switchDarkMode.checked = isCheck;
const profile = getStorageProfile();

const account1 = {
  profile,
  posts: getStorage("posts"),
  story: getStorage("story"),
};
profileImage.src = account1.profile[0]?.profImg;
user.textContent = account1.profile[0]?.username;
const liveComment = [];
// events

// when page loaded
document.addEventListener("DOMContentLoaded", () => {
  if (account1.profile.length == 0) {
    displayModal(modalLogin);
  }

  displayStory(account1.story);
  displayPost(account1.posts);
  backMode(isCheck);
  displayCommentLive(liveComment, isCheck);
  userNameInfo.textContent = account1.profile[0]?.username;
  emailInfo.textContent = account1.profile[0]?.email;
  selfStoryEl.src = account1.profile[0]?.profImg;
  selfStoryProfileEl.src = account1.profile[0]?.profImg;

});

/*------------ modal -------------*/
btnShowModalAddStory.addEventListener("click", () => {
  if (account1.story.length == 0) {
    displayModal(modalAddStory);
  } else {
    displayModal(modalStory);
    isWatch = true;
    if (isWatch) {
      itemStory.classList.remove("active");
      itemStory.classList.add("visited");
      isWatch = false;
    } else {
      itemStory.classList.add("active");
      itemStory.classList.remove("visited");
    }
  }
});
backDrop.addEventListener("click", closeModal);
for (let i = 0; i < btnCloseModal.length; i++) {
  btnCloseModal[i].addEventListener("click", closeModal);
}

btnModalAddPost.addEventListener("click", (e) => {
  displayModal(modalAddPost);
});

/*-----------upload file -----------*/
fileStory.addEventListener("change", (e) => {
  const out = e.target;
  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    uploadImageOutput.setAttribute("src", event.target.result);
    uploadImageOutput.style.display = "block";
    btnUploadFile.style.display = "none";
  });
  reader.readAsDataURL(out.files[0]);
});
filePost.addEventListener("change", (e) => {
  const out = e.target;
  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    uploadImagePostOutput.setAttribute("src", event.target.result);
    uploadImagePostOutput.style.display = "block";
    btnUploadPostFile.style.display = "none";
  });
  reader.readAsDataURL(out.files[0]);
});
/*------------------ post ---------------*/
btnAddPost.addEventListener("click", () => {
  const captionPost = inputCaptionPost.value;
  const mentionPost = inputMentionPost.value;
  const tagPost = inputTagPost.value;

  //  check info
  checkInfoPost(uploadImagePostOutput, captionPost, mentionPost, tagPost);

  // send info for show as post
  displayPost(account1.posts);
});
/*------------------ comment ----------------*/
btnAddComment.addEventListener("click", (e) => {
  let id = e.target.dataset.id;
  const finded = findItem(account1.posts, id);
  console.log(finded);

  let commentInfo = inputAddComment.value;
  inputAddComment.value = "";
  if (commentInfo !== "" || commentInfo !== null) {
    pushPostInfo(finded, commentInfo, user.textContent, imgProfileInfo.src);
  } else {
    alert("errr");
  }
});
inputAddComment.addEventListener("input", (e) => {
  if (e.target.value !== "") {
    btnAddComment.disabled = false;
    btnAddComment.classList.add("active");
  } else {
    btnAddComment.disabled = true;
    btnAddComment.classList.remove("active");
  }
});
/*------------- story ---------------------*/
btnAddStory.addEventListener("click", () => {
  const captionStory = inputCaptionStory.value;
  const mentionStory = inputMentionStory.value;
  const tagStory = inputTagStory.value;

  //  check info
  checkInfoStory(uploadImageOutput, captionStory, mentionStory, tagStory);

  // send info for show as story
  displayStory(account1.story);
});
btnReShowModalAddStory.addEventListener("click", () => {
  modalStory.classList.remove("active");
  clearInterval(time);
  displayModal(modalAddStory);
});
/*---------------- direct ---------------------*/
btnShowDirect.addEventListener("click", (e) => {
  directContainer.classList.add("active");
  liveContainer.classList.remove("active");
});
/*---------------- live ---------------------*/
btnShowLive.addEventListener("click", (e) => {
  displayModal(modalCapture);
});
btnCommentlive.addEventListener("click", function (e) {
  const message = inputLive.value;
  inputLive.value = "";
  if (message !== "") {
    liveComment.push({ id: uuidv4(), comment: message });
    displayCommentLive(liveComment);
  } else {
    alert("input is empty!");
  }
});
commentContainerLive.addEventListener("click", (e) => {
  const click = e.target.closest(".pin-btn");
  if (!click) return;
  commentContainerLive.querySelectorAll('.active').forEach(activeBtn => activeBtn.classList.remove('active'));
  click.classList.toggle("active");
  const id = click.dataset.id;
  console.log(id);
  const findComment = findItem(liveComment, id);
  pinContainer.textContent = findComment.comment;
});
btnAccepts.addEventListener("click", (e) => {
  if (choiseShareTypeScreen.checked) {
    shareScreen();
  }
  if (choiseShareTypeWebcam.checked) {
    shareWebcam();
  }
  liveContainer.classList.add("active");
  directContainer.classList.remove("active");
  closeModal();
});
btnCancel.addEventListener("click", () => {
  closeModal();
});

//forward and backward story slide
btnForwardStory.addEventListener("click", () => {
  if (slide < account1.story.length - 1) {
    slide++;
  } else {
    slide = account1.story.length - 1;
    closeModal();
  }
  displayStory(account1.story, slide);
});
btnBackwardStory.addEventListener("click", () => {
  if (slide > 0) {
    slide--;
  } else {
    slide = 0;
  }
  displayStory(account1.story, slide);
});
/*------------------- register --------------*/
filePic.addEventListener("change", (e) => {
  const out = e.target;
  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    imgProf.setAttribute("src", event.target.result);
    imgProf.style.display = "block";
    btnUploadProfile.style.display = "none";
  });
  reader.readAsDataURL(out.files[0]);
});
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = inputEmail.value;
  const userName = inputUserName.value;
  const pass = inputPassword.value;
  const rePass = inputRePassword.value;
  const profileImage = imgProf.getAttribute("src");

  if (
    email !== "" &&
    userName !== "" &&
    pass !== "" &&
    rePass !== "" &&
    profileImage !== ""
  ) {
    if (pass.length >= 8 && pass === rePass) {
      profile.push({
        username: userName,
        email: email,
        password: pass,
        profImg: profileImage,
      });

      saveStorageProfile(profile);

      closeModal();
      location.reload();
    }
  } else {
    alert("fill the field");
  }
});

/*------------------------- setting --------------------*/
btnSettingModal.addEventListener("click", () => {
  displayModal(modalSetting);
});
switchDarkMode.addEventListener("change", (e) => {
  if (e.target.checked) {
    isCheck = true;
    backMode(isCheck);
  } else {
    isCheck = false;
    backMode(isCheck);
  }
  displayCommentLive(liveComment, isCheck);
  saveStorageBackMode(isCheck);
});
/*------------------------- info box ------------------*/
btnUserInfo.addEventListener("click", function () {
  boxUserInfo.classList.toggle("active");
  this.classList.toggle("active");
});
/*------------------------ notification ---------------------*/
btnNotification.addEventListener("click", function () {
  boxNotification.classList.toggle("active");
});
/*----- check online or offlie user ----*/
window.addEventListener("load", (e) => {
  console.log(navigator.onLine);
  // when user online status color green
  if (navigator.onLine) {
    statusUserEl.classList.add("online");
    statusUserEl.classList.remove("offline");
  }
  // when user offline status color gray
  else {
    statusUserEl.classList.remove("online");
    statusUserEl.classList.add("offline");
  }
});
// when user is back online
window.addEventListener("online", () => {
  statusUserEl.classList.add("online");
  statusUserEl.classList.remove("offline");
});
//when user is connection down
window.addEventListener("offline", () => {
  statusUserEl.classList.remove("online");
  statusUserEl.classList.add("offline");
});
