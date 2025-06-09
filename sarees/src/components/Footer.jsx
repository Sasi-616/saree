import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  Twitter,
  Pinterest,
  Send as SendIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    setEmail('');
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              {t('footer.about.title')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {t('footer.about.description')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton
                color="inherit"
                component="a"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook />
              </IconButton>
              <IconButton
                color="inherit"
                component="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram />
              </IconButton>
              <IconButton
                color="inherit"
                component="a"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter />
              </IconButton>
              <IconButton
                color="inherit"
                component="a"
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Pinterest />
              </IconButton>
            </Box>
          </Grid>

          {/* Customer Service */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              {t('footer.customerService.title')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/shipping');
                }}
              >
                {t('footer.customerService.shipping')}
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/returns');
                }}
              >
                {t('footer.customerService.returns')}
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/size-guide');
                }}
              >
                {t('footer.customerService.sizeGuide')}
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/contact');
                }}
              >
                {t('footer.customerService.contact')}
              </Link>
            </Box>
          </Grid>

          {/* Legal */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              {t('footer.legal.title')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/privacy');
                }}
              >
                {t('footer.legal.privacy')}
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/terms');
                }}
              >
                {t('footer.legal.terms')}
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/shipping-policy');
                }}
              >
                {t('footer.legal.shipping')}
              </Link>
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              {t('footer.newsletter.title')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {t('footer.newsletter.description')}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubscribe}
              sx={{
                display: 'flex',
                gap: 1,
              }}
            >
              <TextField
                size="small"
                fullWidth
                placeholder={t('footer.newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'background.paper',
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                endIcon={<SendIcon />}
              >
                {t('footer.newsletter.subscribe')}
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'primary.light' }} />

        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Online Saree Store. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 