<h1 align="center"> ingredient-ally 🧴</h1>

#### Click [here](https://lisa-go.github.io/ingredient-ally/) to view the live preview of the application.

# Made with

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
<br><br>

# Description

#### Welcome to ingredient-ally, a web application that helps users find out whether the skincare products in their collection have conflicting ingredients with each other. This is especially important as mixing certain ingredients may cause irritation, dryness, and rashes on your skin.

<br><br>

# Features

- Responsive Design: The application features a responsive design that
  seamlessly adapts to various screen sizes, ensuring an optimal user
  experience. Furthermore, a dedicated mobile view has been implemented to
  enhance usability on smaller devices.

- Intuitive Page Navigation: A user-friendly navigation selector positioned at
  the top right of the page allows effortless navigation between different
  sections. The current page number is prominently displayed, providing users
  with clear context and orientation.

- Guided Instructions: The application offers comprehensive instructions
  accompanied by illustrative images presented in an engaging image carousel.
  This approach empowers users to quickly grasp the functionality and maximize
  their effectiveness when utilizing the application.

- Efficient Product Management: Users can conveniently add their skincare
  products using a simple form and selectively delete specific items from the
  list. Additionally, an option to delete the entire inventory is available. To
  prevent accidental deletion, a modal confirmation dialog has been implemented,
  ensuring user confidence and preventing unintended actions.

- Persistent Local Storage: Leveraging local storage capabilities, the
  application remembers the user's inventory on the device. This means that
  users do not have to re-enter their skincare products each time they revisit
  the application, streamlining the overall experience.

- Results Display: Upon clicking the "Generate Results" button, users can
  instantly view a comprehensive list of conflicting products. The application
  provides clear visibility into which specific ingredient triggered the
  conflict, allowing users to make informed decisions about their skincare
  routine.

<br><br>

# Previews

### Welcome Page

<img src="https://i.imgur.com/MHVKMFp.png" alt="welcome page" width="700" />

#### Welcome Page Mobile View

<img src="https://i.imgur.com/L28ykTQ.png" alt="welcome mobile page" height="500" />

### Page Navigation

<img src="https://i.imgur.com/225sVn3.png" alt="page navigation" width="200" />

### Instructions Page

<img src="https://i.imgur.com/o6AqG0i.png" alt="instructions page" width="700" />

#### Instructions Page Mobile View

<img src="https://i.imgur.com/fyTW9xF.png" alt="welcome portrait page" height="500" />

### Inventory Page

<img src="https://i.imgur.com/ASGfa7z.png" alt="inventory page" width="700" />

#### Inventory Page Mobile View

<img src="https://i.imgur.com/HnHdxru.png" alt="inventory portrait page" height="500" />

### Results Page

<img src="https://i.imgur.com/EQQtUdg.png" alt="results page" width="700" />

#### Results Page Mobile View

<img src="https://i.imgur.com/JOH6M7U.png" alt="results portrait page" height="500" />

<br><br>

# Key Learnings

- Gained a deeper understanding of using keyframes and animations in CSS/SASS.

```sass
@keyframes changecolor {
  0% {
    color: #97d1e6;
  }
  25% {
    color: #c9b5e9;
  }
  50% {
    color: #e1abd7;
  }
  75% {
    color: #98e5a5;
  }
  100% {
    color: #e1e7a5;
  }
}
```

- Utilized mixins in SASS to prevent repeating code and promote code
  reusability.

```sass
@mixin glass-bg {
  background-color: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(5px);
  border-radius: 6px;
  box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.5);
}
```

- Emphasized the importance of separating functions to improve code readability
  and maintainability. Breaking down complex tasks into smaller, focused
  functions simplifies problem-solving.

- Developed skills in data comparison and analysis to generate accurate results
  by comparing ingredients against a dataset and identifying conflicts.
