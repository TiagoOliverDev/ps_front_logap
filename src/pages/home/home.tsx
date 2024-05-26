import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, CardActions, TextField, Button, Container, Grid } from '@mui/material';
import { HomeMaster } from '../../shared/layouts/HomeMaster';
import { Search, Favorite, ShoppingCart } from '@mui/icons-material';
import { CategoriesService } from '../../shared/services/api/categories/CategoriesService'; 
import { ICategory } from '../../@types/IApiResponseCategories'; 
import { IProduct } from '../../@types/IApiResponseProducts';
import { ProductsService } from '../../shared/services/api/products/ProductsService';

export const Home: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | 'GERAL'>('GERAL');
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [error, setError] = useState<string | null>(null);

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        (selectedCategory === 'GERAL' ? true : product.category_id === selectedCategory)
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

        const fetchProducts = async () => {
            const result = await ProductsService.getAll();
            if (result instanceof Error) {
                setError(result.message);
            } else {
                setProducts(result);
            }
        };

        fetchCategories();
        fetchProducts();
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
                            onClick={() => setSelectedCategory(category.id)}
                            variant={selectedCategory === category.id ? 'contained' : 'outlined'}
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
                                <img src='imgPadrao.png' alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                <CardContent>
                                    <Typography style={{color: '#616161'}} variant="h6">{product.name}</Typography>
                                    <Typography style={{color: '#616161'}} variant="body2" color="textSecondary">R$ {product.sale_price}</Typography>
                                </CardContent>
                                <CardActions>
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
