function getTime() {
  const now = new Date();
  document.getElementById("update").value = now.getTimezoneOffset();
}
