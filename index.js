let subscriptionId;
const USER_UPDATED_EVT_NAME = 'user:updated';

function init(){
  setupUserForm();
  listenUserChange();
  setupUnsubscribeButton();
}

function setupUserForm(){
  const form = document.querySelector('[data-user-form]');
  form.addEventListener('submit', onUserFormSubmit);
}

function onUserFormSubmit(evt){
  const username = evt.currentTarget.querySelector('[name="username"]');
  const date = new Date();
  evt.preventDefault();
  rasket.publish(USER_UPDATED_EVT_NAME, {
    username: username.value,
    updatedAt: date.toString()
  });
}

function listenUserChange(){
  subscriptionId = rasket.subscribe(USER_UPDATED_EVT_NAME, logUserChange);
}

function logUserChange(user){
  const list = document.querySelector('[data-change-list]');
  list.appendChild(buildUserChangeItem(user));
}

function buildUserChangeItem(user){
  const item = document.createElement('li');
  item.innerHTML = JSON.stringify(user);
  return item;
}

function setupUnsubscribeButton(){
  const button = document.querySelector('[data-unsubscribe-button]');
  button.addEventListener('click', () => rasket.unsubscribe(subscriptionId));
}

init();
