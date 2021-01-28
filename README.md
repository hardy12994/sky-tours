# SKY-TOURS

### Steps
- [**Important**] Please `Enable` Moesif CORS on Chrome Browser Extension (or any other CORS web extension) as we are hitting third party api (https://swapi.py4e.com) as per requirement.
- Clone the git repository by `git clone https://github.com/hardy12994/sky-tours.git`.
- Go inside the cloned repository i.e `sky-tours` folder.
- Run `npm install` to install all the NPM modules which are used in this repository.
- Run `yarn start` to run the test, it will starting on this `http://localhost:3000` URL.


There are two pages, `Categories List Page` and `Detail Categories Item Page`.

### Categories List Page
- Contain list of categories (`Peoples` and `Planets`) and `Peoples` category list will be shown by default.
- We can also search category from list of two (`Peoples` and `Planets`)
- We can also use pagination via `Next & Previous` buttons below. `Previous` button will be disabled when we are on first page, and `Next` button will be disabled when we are on last page.
- It also contains Re-direction when we click on any item of category from the table.

### Detail Categories Item Page
- It contains the detail part of selected item of particular category (`Peoples` or `Planets`).
- We can also go back from it to main page via `Go Back` Button.
