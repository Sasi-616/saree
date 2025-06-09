import React from 'react';
import { Box, Container, Typography, Grid, Button, Card, CardMedia, CardContent, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const featuredProducts = [
  {
    id: 1,
    name: 'Banarasi Silk Saree',
    price: '₹5,999',
    image: '/images/sarees/banarasi.jpg',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Kanjeevaram Silk',
    price: '₹8,999',
    image: '/images/sarees/kanjeevaram.jpg',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Designer Cotton',
    price: '₹2,999',
    image: '/images/sarees/cotton.jpg',
    rating: 4.3,
  },
];

function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            {t('home.hero.title')}
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
            {t('home.hero.subtitle')}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/shop')}
          >
            {t('home.hero.cta')}
          </Button>
        </Container>
      </Box>

      {/* Featured Products */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
          {t('home.featured.title')}
        </Typography>
        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                    transition: 'all 0.3s ease-in-out',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h3">
                    {product.name}
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {product.price}
                  </Typography>
                  <Rating value={product.rating} precision={0.5} readOnly />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categories Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
            {t('home.categories.title')}
          </Typography>
          <Grid container spacing={4}>
            {['Silk', 'Cotton', 'Designer', 'Traditional'].map((category) => (
              <Grid item xs={12} sm={6} md={3} key={category}>
                <Card
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    '&:hover': {
                      transform: 'scale(1.05)',
                      transition: 'transform 0.3s ease-in-out',
                    },
                  }}
                >
                  <Typography variant="h6" component="h3">
                    {category}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate(`/shop?category=${category.toLowerCase()}`)}
                  >
                    {t('home.categories.explore')}
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Home; 