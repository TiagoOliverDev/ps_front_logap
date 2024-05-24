import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, CardActions, TextField, Button, Container, Grid } from '@mui/material';
import { HomeMaster } from '../../shared/layouts/HomeMaster';
import { Search, Favorite, ShoppingCart, Visibility } from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';
import { CategoriesService } from '../../shared/services/api/categories/Categories'; 
import { IApiResponseCategories, ICategory } from '../../@types/IApiResponseCategories'; 


const products = [
    { id: 1, name: 'Produto 1', category: 'Celulares', price: 1000, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Produto 2', category: 'Notebooks', price: 2000, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Produto 3', category: 'Bebidas', price: 50, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Produto 4', category: 'Eletrônicos', price: 300, image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Produto 5', category: 'Roupas', price: 150, image: 'https://via.placeholder.com/150' },
];

export const Home: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('GERAL');
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [error, setError] = useState<string | null>(null);

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        (selectedCategory === 'GERAL' ? true : product.category === selectedCategory)
    );

    useEffect(() => {
        const fetchCategories = async () => {
            const result = await CategoriesService.getAll();
            if (result instanceof Error) {
                setError(result.message);
            } else {
                setCategories(result);
            }
        };

        fetchCategories();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <HomeMaster title='Bem vindo a sua HomePage de produtos!'>
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
                    <Button 
                        key="GERAL" 
                        onClick={() => setSelectedCategory('GERAL')}
                        variant={selectedCategory === 'GERAL' ? 'contained' : 'outlined'}
                        sx={{ margin: '0 8px' }}
                    >
                        GERAL
                    </Button>
                    {categories.map(category => (
                        <Button 
                            key={category.id} 
                            onClick={() => setSelectedCategory(category.name)}
                            variant={selectedCategory === category.name ? 'contained' : 'outlined'}
                            sx={{ margin: '0 8px' }}
                        >
                            {category.name}
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
                                    <Button startIcon={<Favorite />} size="small">Favoritar</Button>
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
