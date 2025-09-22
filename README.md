# Employee Management System

A modern, responsive employee management interface built with React and TypeScript.

## Features

- **Employee Management**: View, edit, and manage employee information
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, professional interface with intuitive navigation
- **Accessibility**: Built with accessibility best practices
- **TypeScript**: Full type safety and better developer experience

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
\```bash
git clone <repository-url>
cd employee-management-app
\```

2. Install dependencies:
\```bash
npm install
\```

3. Start the development server:
\```bash
npm start
\```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Project Structure

\```
src/
├── components/
│   ├── EmployeeManagement.tsx    # Main employee management component
│   └── EmployeeManagement.css    # Component styles
├── App.tsx                       # Main app component
├── App.css                       # App styles
├── index.tsx                     # Entry point
├── index.css                     # Global styles
└── ...
\```

## Key Components

### EmployeeManagement
The main component that handles:
- Employee list display
- Search functionality
- Employee editing modal
- Sidebar navigation

### Reusable Components
- **InputField**: Consistent form input styling
- **ActionButton**: Edit/Delete buttons with icons
- **EmployeeRow**: Table row with employee information
- **CheckboxOption**: Absence type selections with color indicators
- **SidebarIcon**: Navigation menu items

## Styling

The application uses:
- **CSS Modules**: Component-scoped styling
- **Google Fonts**: Poppins font family
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG compliant color contrast and keyboard navigation

## Browser Support

This project supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Create React App](https://github.com/facebook/create-react-app)
- Icons and images from Figma design system
- Font: [Poppins](https://fonts.google.com/specimen/Poppins) from Google Fonts
\```
