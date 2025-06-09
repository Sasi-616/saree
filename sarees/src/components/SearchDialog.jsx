import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '../hooks/useDebounce';

// Mock data - replace with actual API call
const mockSearch = async (query) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return [
    {
      id: 1,
      name: 'Banarasi Silk Saree',
      price: '₹5,999',
      image: '/images/sarees/banarasi.jpg',
    },
    {
      id: 2,
      name: 'Kanjeevaram Silk',
      price: '₹8,999',
      image: '/images/sarees/kanjeevaram.jpg',
    },
  ].filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );
};

function SearchDialog({ open, onClose }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(async (term) => {
    if (!term) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const searchResults = await mockSearch(term);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, 300);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleProductClick = (productId) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: 'background.paper',
        },
      }}
    >
      <DialogContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            autoFocus
            fullWidth
            placeholder={t('search.placeholder')}
            value={searchTerm}
            onChange={handleSearch}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => {
                      setSearchTerm('');
                      setResults([]);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
          <IconButton
            onClick={onClose}
            sx={{ ml: 1 }}
            aria-label="close search"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : searchTerm && results.length === 0 ? (
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ py: 4 }}
          >
            {t('search.noResults')}
          </Typography>
        ) : (
          <List sx={{ py: 0 }}>
            {results.map((product) => (
              <ListItem
                key={product.id}
                button
                onClick={() => handleProductClick(product.id)}
                sx={{
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={product.image}
                    alt={product.name}
                    variant="rounded"
                    sx={{ width: 48, height: 48 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  secondary={product.price}
                  primaryTypographyProps={{
                    variant: 'subtitle1',
                    gutterBottom: true,
                  }}
                  secondaryTypographyProps={{
                    variant: 'body2',
                    color: 'primary',
                  }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SearchDialog; 