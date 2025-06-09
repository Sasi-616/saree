const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create necessary directories
const dirs = ['public', 'public/css', 'public/images', 'public/images/sarees'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Bundle React components into a single file
const bundleCode = `
const Home = ${fs.readFileSync('src/pages/Home.jsx', 'utf8')};
const MainLayout = ${fs.readFileSync('src/layouts/MainLayout.jsx', 'utf8')};
const Footer = ${fs.readFileSync('src/components/Footer.jsx', 'utf8')};
const SearchDialog = ${fs.readFileSync('src/components/SearchDialog.jsx', 'utf8')};
const useDebounce = ${fs.readFileSync('src/hooks/useDebounce.js', 'utf8')};

// Initialize React app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout />
        </ThemeProvider>
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
`;

// Write the bundled code
fs.writeFileSync('public/bundle.js', bundleCode);

// Copy static files
fs.copyFileSync('public/css/main.css', 'public/css/main.css');

// Create index.html
const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online Saree Store - Traditional & Designer Sarees</title>
    <link rel="stylesheet" href="/css/main.css">
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@mui/material@5.13.0/umd/material-ui.production.min.js"></script>
    <script src="https://unpkg.com/react-router-dom@6.11.1/dist/umd/react-router-dom.production.min.js"></script>
    <script src="https://unpkg.com/i18next@22.4.15/dist/umd/i18next.min.js"></script>
    <script src="https://unpkg.com/react-i18next@12.2.2/react-i18next.min.js"></script>
</head>
<body>
    <div id="root"></div>
    <script src="/bundle.js"></script>
</body>
</html>
`;

fs.writeFileSync('public/index.html', indexHtml);

console.log('Build completed successfully!'); 