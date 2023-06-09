async function checkPassword(event) {
  event.preventDefault(); // Prevent the form from being submitted via GET request

  var password = document.getElementById("password").value.trim();

  // Hash the password using SHA-512
  var encoder = new TextEncoder();
  var data = encoder.encode(password);
  var hashBuffer = await crypto.subtle.digest("SHA-512", data);
  var hashArray = Array.from(new Uint8Array(hashBuffer));
  var hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  // Check if the hash matches the expected value
  if (
    hashHex ===
    "293431311559ebbffd5f1cc23b98661c4cd538727e3190cc750a0a1e2dd1ddc15c676c4168d101e560eb78b955b1bc115e65731e193f39297e9b294beaae923f"
  ) {
    // Set the token value to be stored
    const tokenValue = "12345";

    // Add the token to local storage
    sessionStorage.setItem("token", tokenValue);

    // Decode the URL from base 64 and redirect the user

    var url = atob("aHR0cHM6Ly9lZXZiLmdpdGh1Yi5pby9yb2xhcy8=");
    window.location.href = url;
  } else {
    alert("Incorrect password, please try again.");
    document.getElementById("password").value = "";
  }
}
