import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, CardActions, TextField, Button, Container, Grid } from '@mui/material';
import { HomeMaster } from '../../shared/layouts/HomeMaster';
import { Search, Favorite, ShoppingCart, Visibility } from '@mui/icons-material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';

const categories = ['GERAL', 'Celulares', 'Notebooks', 'Bebidas', 'Eletrônicos', 'Roupas'];
const products = [
    { id: 1, name: 'Produto 1', category: 'Celulares', price: 1000, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Produto 2', category: 'Notebooks', price: 2000, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Produto 3', category: 'Bebidas', price: 50, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Produto 4', category: 'Eletrônicos', price: 300, image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Produto 5', category: 'Roupas', price: 150, image: 'https://via.placeholder.com/150' },
    // Adicione mais produtos conforme necessário
];

export const Home: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('GERAL');

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        (selectedCategory === 'GERAL' ? true : product.category === selectedCategory)
    );

    return (
        <HomeMaster title='Bem vindo a sua Home!'>
            <Container>
                <Box display="flex" justifyContent="center" alignItems="center" mt={4} mb={4}>
                    <TextField
                        style={{color: "#FFFFFF"}}
                        variant="outlined"
                        placeholder="Buscar produtos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: <Search />,
                            sx: { borderRadius: '50px', backgroundColor: '#FFFFFF' }
                        }}
                        fullWidth
                    />
                </Box>

                <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
                    {categories.map(category => (
                        <Button 
                            key={category} 
                            onClick={() => setSelectedCategory(category)}
                            variant={selectedCategory === category ? 'contained' : 'outlined'}
                            sx={{ margin: '0 8px' }}
                        >
                            {category}
                        </Button>
                    ))}
                </Box>

                <Grid container spacing={4}>
                    {filteredProducts.map(product => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                            <Card style={{borderRadius: '11px', backgroundColor: '#000000'}} >
                                <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                <CardContent>
                                    <Typography style={{color: '#616161'}} variant="h6">{product.name}</Typography>
                                    <Typography style={{color: '#616161'}} variant="body2" color="textSecondary">R$ {product.price}</Typography>
                                </CardContent>
                                <CardActions>
                                    {/* <Button startIcon={<Visibility />} size="small">Ver mais</Button> */}
                                    <Button startIcon={<StarIcon />} size="small">Favoritar</Button>
                                    <Button startIcon={<ShoppingCart />} size="small" color="primary">Comprar</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </HomeMaster>
    );
};
