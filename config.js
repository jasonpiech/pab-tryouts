window.CFG = {
  // Apps Script /exec url. Empty = same origin (serve_local.py).
  BACKEND: 'https://script.google.com/macros/s/AKfycbxZxK3V4xtW05iV9GrzNCGnokuE9xSU-DTxS0x97ESl60IsMvcDoIHUYkkViYpRn5xr/exec',

  // Passcode is not here. It lives in the PASSCODE script property.
  EXEC: ['Sienna', 'Jason', 'Will', 'Eric', 'Kiara', 'Vinay', 'Caleb'],

  SHOW_MATCHES: false,

  // Pulls players with 1-2 votes toward the mean. 0 = plain average.
  SHRINK_K: 1.5,

  // Hide others' votes on a player until you've cast yours.
  BLIND: true,

  POLL_SEC: 30
};
