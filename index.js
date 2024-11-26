// console.log(window.location)

// console.log(window.history)

// console.log(window.screen);

// window.addEventListener("resize", () => {
//     const width = window.innerWidth;
//     const height = window.innerHeight;

//     console.log({height, width});
// });

// const username = "Oliver";
// const userAge = 24;
// const isDeveloper = true;

// localStorage.setItem("username", username);
// window.localStorage.setItem("userAge", userAge); // Explicit :)
// localStorage.setItem("isDeveloper", isDeveloper); // Implicit :)

// const username1 = localStorage.getItem("username");

// const usernameHTML = `<p>${username1}</p>`;
// const content = document.querySelector(".content");
// content.insertAdjacentHTML("afterbegin", usernameHTML);

// localStorage.removeItem("isDeveloper");

const user = {
    name: "Oliver",
    age: 24,
    isDeveloper: true,
};

localStorage.setItem("user", JSON.stringify(user));

const userFromLS = localStorage.getItem("user");
console.log(JSON.parse(userFromLS));
