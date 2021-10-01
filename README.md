<h1 align="center">
   🖼 c.Background.Generator
</h1>
   
## A simple app to generate, edit and combine background and foreground colors


<!-- Infos -->
<p align="center">
  <img src="https://img.shields.io/static/v1?labelColor=381838&color=777777&label=created%20at&message=Sep%202021" alt="Creation Date" />

  <img src="https://img.shields.io/github/last-commit/kruchelski/cbgen?label=updated%20at&labelColor=381838&color=777777" alt="Update Date" />

  <img src="https://img.shields.io/github/v/tag/kruchelski/cbgen?label=latest%20version&labelColor=381838&color=777777" alt="Latest Version" />

  <img src="https://img.shields.io/github/license/kruchelski/cbgen?labelColor=381838&color=777777" alt="Project License" />
</p>

#### Important Note: This is a Work in Progress. At this moment some bugs may occur

<div style="color:#333333">

### 😶 Why bother creating this?

This application was made for studying purposes. The main goal of this project was to learn some concepts in frontend and how to deploy an app in production.   
That being said, this apps's objective is to help users to decide for color combinations of a background and a foreground in a UI without the need to write some codes to test the colors. The app simple generates background colors automatically (gradient by default) or the user can input the colors in hexadecimal format or input via html color selector. It's possible to save combinations (the saved combinations are stored in the localStorage), enable or disable the foreground and enable or disable the gradient effect. The app also provides the background style string for the selected colors and gradient to be used in an html project.

### 🖥 How do these stuff work?

When the user access the application a new random color will be generated. From this point the user can activate the foreground and choose a color of the foreground, can save a color combination, delete previously saved color combinations, generate another color or cycle through generated background colors. In the bottom of the screen there are three main controls:
- Foreground color: With a button to enable/disable the foreground and a control to select or input the color for the foreground
- Background color: With a button to enable/disable the gradient effect and the controls to select or input the color for the background
- Save config: With an input to type the desired name of the config and a button to save it   

Scrolling down it will be visible the saved configs. All the user needs to do is click in a config and then the config will be loaded. When mouse hover the saved configs or in mobile the button to delete the configs will be visible. Simple activate the button to remove the saved config

### 🚜 What is under the hood?

This app was made using Vue2 and Vue CLI along with some other dependencies as descibed below:

- [Vue JS v.2](https://vuejs.org/) - To develop the application
- [Vue CLI](https://cli.vuejs.org/) - To "bootstrap" the creation of the app
- [vue-tilt.js](https://www.npmjs.com/package/vue-tilt.js) - To use the tilt effect in some elements (with plans to remove this in the future and implement by myself)
- [Express](https://expressjs.com/pt-br/) - To create a serve that makes possible to serve static files
- [serve-static](https://www.npmjs.com/package/serve-static) - To serve static files
- [Vue Test Utils](https://vue-test-utils.vuejs.org/) - For automated unit tests

### 🎛 So... How to set up the environment?

- Install the dependencies
- Run the app locally

```bash
npm install     # This will install the dependencies
npm run serve   # In the root of the app to run it (usually the app will be accessible in localhost:8080)
```

</div>
