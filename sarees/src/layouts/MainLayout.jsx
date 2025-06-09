import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Badge,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart,
  Favorite,
  Person,
  Language,
  Search,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import Footer from '../components/Footer';
import SearchDialog from '../components/SearchDialog';

const pages = ['shop', 'new-arrivals', 'collections', 'sale'];
const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'te', name: 'తెలుగు' },
];

function MainLayout() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElLang, setAnchorElLang] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleOpenLangMenu = (event) => setAnchorElLang(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleCloseLangMenu = () => setAnchorElLang(null);

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    handleCloseLangMenu();
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Mobile Menu Icon */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                onClick={() => setMobileDrawerOpen(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Logo */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              SAREE STORE
            </Typography>

            {/* Desktop Navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => navigate(`/${page}`)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {t(`navigation.${page}`)}
                </Button>
              ))}
            </Box>

            {/* Actions */}
            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Search */}
              <IconButton color="inherit" onClick={() => setSearchOpen(true)}>
                <Search />
              </IconButton>

              {/* Language */}
              <Tooltip title={t('navigation.language')}>
                <IconButton onClick={handleOpenLangMenu} color="inherit">
                  <Language />
                </IconButton>
              </Tooltip>

              {/* Cart */}
              <IconButton color="inherit" onClick={() => navigate('/cart')}>
                <Badge badgeContent={cartItems.length} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>

              {/* Wishlist */}
              <IconButton color="inherit" onClick={() => navigate('/wishlist')}>
                <Badge badgeContent={wishlistItems.length} color="secondary">
                  <Favorite />
                </Badge>
              </IconButton>

              {/* User Menu */}
              {isAuthenticated ? (
                <Tooltip title={t('navigation.account')}>
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar alt={user?.name} src={user?.avatar} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Button
                  color="inherit"
                  onClick={() => navigate('/login')}
                  startIcon={<Person />}
                >
                  {t('navigation.login')}
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {pages.map((page) => (
              <ListItem
                button
                key={page}
                onClick={() => {
                  navigate(`/${page}`);
                  setMobileDrawerOpen(false);
                }}
              >
                <ListItemText primary={t(`navigation.${page}`)} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Language Menu */}
      <Menu
        anchorEl={anchorElLang}
        open={Boolean(anchorElLang)}
        onClose={handleCloseLangMenu}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            selected={i18n.language === lang.code}
          >
            {lang.name}
          </MenuItem>
        ))}
      </Menu>

      {/* User Menu */}
      <Menu
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={() => navigate('/account')}>
          {t('navigation.myAccount')}
        </MenuItem>
        <MenuItem onClick={() => navigate('/orders')}>
          {t('navigation.myOrders')}
        </MenuItem>
        <MenuItem onClick={handleLogout}>{t('navigation.logout')}</MenuItem>
      </Menu>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default MainLayout; 