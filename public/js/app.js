const form = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageTwo.textContent = "";
  messageOne.textContent = "Loading";
  fetch(`/weather?address=${location}`).then((res) =>
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = "";
        messageTwo.textContent = data.error;
      } else {
        messageOne.textContent = `${data.address}, ${data.location}`;
        messageTwo.textContent = `It's currently ${data.forecast} in ${data.address} with temperature of ${data.temp} fahrenheit`;
      }
    })
  );
});
