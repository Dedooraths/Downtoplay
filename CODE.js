// CODE
localStorage.clear();
// Sample user data
var users = [
  { username: 'user1', password: 'password1', isAdmin: 'false' },
  { username: 'user2', password: 'password2', isAdmin: 'false' },
  { username: 'admin', password: 'admin', isAdmin: 'true'}
];

// Check if user is logged in
let isLoggedIn = false;
let currentUser = null;

// Check if events are stored in localStorage
let storedEvents = localStorage.getItem('events');
let events = storedEvents ? JSON.parse(storedEvents) : [];

// DOM elements
const loginForm = document.getElementById('loginForm');
const eventForm = document.getElementById('eventForm');
const eventList = document.getElementById('eventList');
const eventListUL = document.getElementById('events');
const currentEvents = document.getElementById('currentEvents');
const currentEventListUL = document.getElementById('currentEventList');
const signOutButton = document.getElementById('signOutButton');

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Check if user exists
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    isLoggedIn = true;
    currentUser = user;
    showEventForm();
    displayStoredEvents();
    clearLoginInputs(); // Clear the login inputs
    SignUp.classList.add('hidden');
    SignOut.classList.remove('hidden');
    if(user.isAdmin == 'true') {
      document.body.style.backgroundColor = 'salmon';
    }
  } else {
    alert('Invalid username or password');
  }
}

function signUpS() {
  const username = document.getElementById('usernameS').value;
  const password = document.getElementById('passwordS').value;

  // Check if user exists
  const user = users.find(u => u.username === username);

  if (!user) {
    users.push({ username: username, password: password, isAdmin: 'false'})
    isLoggedIn = true;
    const user = users.find(u => u.username === username && u.password === password);
    currentUser = user;
    showEventForm();
    displayStoredEvents();
    clearSignUpInputs(); // Clear the login inputs
    SignUp.classList.add('hidden');
    SignOut.classList.remove('hidden');
    signUpForm.classList.add('hidden');
    logIn.classList.add('hidden');
    if(user.isAdmin == 'true') {
      document.body.style.backgroundColor = 'salmon';
    }
  } else {
    alert('This Username Is In Use');
  }
}




function clearLoginInputs() {
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
}

function clearSignUpInputs() {
  document.getElementById('usernameS').value = '';
  document.getElementById('passwordS').value = '';
}

function showEventForm() {
  loginForm.classList.add('hidden');
  eventForm.classList.remove('hidden');
  currentEvents.classList.remove('hidden');
}

function signOut() {
  isLoggedIn = false;
  currentUser = null;
  clearEventLists();
  showLoginForm();
  SignOut.classList.add('hidden');
  signUpForm.classList.add('hidden');
}

function showSignUpForm() {
  loginForm.classList.add('hidden');
  eventForm.classList.add('hidden');
  eventList.classList.add('hidden');
  currentEvents.classList.add('hidden');
}

function signUp() {
  showSignUpForm();
  clearLoginInputs();
  logIn.classList.remove('hidden');
  SignUp.classList.add('hidden');
  signUpForm.classList.remove('hidden');
}

function clearEventLists() {
  eventListUL.innerHTML = '';
  currentEventListUL.innerHTML = '';
  document.body.style.backgroundColor = 'white';
}

function showLoginForm() {
  loginForm.classList.remove('hidden');
  eventForm.classList.add('hidden');
  eventList.classList.add('hidden');
  currentEvents.classList.add('hidden');
  logIn.classList.add('hidden');
  SignUp.classList.remove('hidden');
}

function saveEvents() {
  localStorage.setItem('events', JSON.stringify(events));
}

function loadEvents() {
  if (storedEvents) {
    events.forEach(event => {
      displayEvent(event);
    });
  }
}

function AmPm(x) {
  var timeSplit = x.split(':');
  hours = timeSplit[0];
  minutes = timeSplit[1];
  if (hours > 12) {
    meridian = 'PM';
    hours -= 12;
  } else if (hours < 12) {
    meridian = 'AM';
    if (hours == 0) {
      hours = 12;
    }
  } else {
    meridian = 'PM';
  }
  return(meridian);
}

function addEvent() {
  const eventName = document.getElementById('eventName').value;
  const eventDate = document.getElementById('eventDate').value;
  const eventTime = document.getElementById('eventTime').value;
  const endTime = document.getElementById('endTime').value;

  // Create event object
  const event = {
    name: eventName,
    date: eventDate,
    time: eventTime,
    etime: endTime
  };

  // Add event to the array
  events.push(event);

  // Clear the input fields
  document.getElementById('eventName').value = '';
  document.getElementById('eventDate').value = '';
  document.getElementById('eventTime').value = '';
  document.getElementById('endTime').value = '';

  // Display the event on the screen
  displayEvent(event);

  // Save events to localStorage
  saveEvents();
}

function displayEvent(event) {
  const listItem = document.createElement('li');
  listItem.innerText = `${event.name} - ${event.date} at ${event.time} ${AmPm(event.time)} to ${event.etime}  ${AmPm(event.etime)}`;
  eventListUL.appendChild(listItem);
  currentEventListUL.appendChild(listItem.cloneNode(true));
}

function displayStoredEvents() {
  eventListUL.innerHTML = '';
  currentEventListUL.innerHTML = '';
  events.forEach(event => {
    displayEvent(event);
  });
}


// Load events when the page is loaded
window.addEventListener('DOMContentLoaded', () => {
  loadEvents();
});
