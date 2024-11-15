# url-shortener

## Table of Contents 

- [Installation](#installation)
- [Usage](#Usage)


## Installation and Setup

Follow these steps to get started: 

1. **Clone the Repository**
   - Execute `git clone [repository-url]` to clone the repository to your local machine.

2. **Navigate to the direcctory**
   - Run `cd [repository-url]` to install the required dependencies.

3. **Install Dependencies**
   - Run `npm install` to install the required dependencies.

4. **Environment Setup**
   - Create `.env` file in the root directory.
   - Provide the necessary keys in the `.env` file. Refer to the `.env.example` file for guidance and use the credentials specified in the assignment as values.

5. **Start the development server**
   - Run `npm run dev` to start local server.


## Usage

1.**User Input Mask**
   - In the User Input Mask, enter a URL in the input field, for example, `https://www.google.com`

   - By default, if the input field is empty, the GO button will be disabled, and the output field for displaying the shortened URL will be hidden.
   - After clicking the GO button:
    * The output field will display the shortened URL.
    * Two buttons will appear next to the output field:
        i. Test button: Clicking this button redirects you to the original URL entered in the input field. 
        ii. Copy button: Clicking this button copies the shortened URL to your clipboard, allowing you to paste it into a new tab or share it elsewhere.

2.**Admin Overview**
- URL List Management:
    - Add Button: This button represents the Insert or Add action. Clicking this button allows you to create a new URL and add it to the list with a custom ID 
    - Pencil Icon (Blue): This icon is typically used as an Edit button. Clicking this icon usually allows you to modify or update the current item, such as editing details.
    - Trash Icon (Red): This icon usually serves as a Delete button. Clicking this icon will often delete the current item, removing it from the list.



