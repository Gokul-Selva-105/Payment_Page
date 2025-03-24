import { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  MenuItem, 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Box, 
  Typography, 
  InputAdornment,
  Paper
} from '@mui/material';
import { motion } from 'framer-motion';

const ShippingForm = ({ data, onUpdate, onNext }) => {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    onUpdate(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.dimensions.length) newErrors['dimensions.length'] = 'Length is required';
    if (!formData.dimensions.width) newErrors['dimensions.width'] = 'Width is required';
    if (!formData.dimensions.height) newErrors['dimensions.height'] = 'Height is required';
    if (!formData.weight) newErrors.weight = 'Weight is required';
    if (!formData.courier) newErrors.courier = 'Please select a courier';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <TextField
                select
                fullWidth
                label="Ship to"
                name="country"
                value={formData.country}
                onChange={handleChange}
                error={!!errors.country}
                helperText={errors.country}
                variant="outlined"
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#2196F3',
                    },
                  },
                }}
              >
                <MenuItem value="">Select Country</MenuItem>
                <MenuItem value="Hong Kong">Hong Kong</MenuItem>
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="UK">UK</MenuItem>
              </TextField>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <TextField
                select
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                error={!!errors.category}
                helperText={errors.category}
                variant="outlined"
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#2196F3',
                    },
                  },
                }}
              >
                <MenuItem value="">Select Category</MenuItem>
                <MenuItem value="Furniture">Furniture</MenuItem>
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Clothing">Clothing</MenuItem>
              </TextField>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <TextField
                fullWidth
                label="Item's retail price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                error={!!errors.price}
                helperText={errors.price}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                variant="outlined"
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#2196F3',
                    },
                  },
                }}
              />
            </motion.div>
          </Grid>

          <Grid item xs={12}>
            <motion.div variants={itemVariants}>
              <Typography variant="subtitle1" gutterBottom sx={{ color: '#1976d2', fontWeight: 500 }}>
                Package Dimensions (cm)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Length"
                    name="dimensions.length"
                    type="number"
                    value={formData.dimensions.length}
                    onChange={handleChange}
                    error={!!errors['dimensions.length']}
                    helperText={errors['dimensions.length']}
                    variant="outlined"
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#2196F3',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Width"
                    name="dimensions.width"
                    type="number"
                    value={formData.dimensions.width}
                    onChange={handleChange}
                    error={!!errors['dimensions.width']}
                    helperText={errors['dimensions.width']}
                    variant="outlined"
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#2196F3',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Height"
                    name="dimensions.height"
                    type="number"
                    value={formData.dimensions.height}
                    onChange={handleChange}
                    error={!!errors['dimensions.height']}
                    helperText={errors['dimensions.height']}
                    variant="outlined"
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#2196F3',
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <TextField
                fullWidth
                label="Package Weight (kg)"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                error={!!errors.weight}
                helperText={errors.weight}
                variant="outlined"
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#2196F3',
                    },
                  },
                }}
              />
            </motion.div>
          </Grid>

          <Grid item xs={12}>
            <motion.div variants={itemVariants}>
              <FormControl component="fieldset" error={!!errors.courier} sx={{ width: '100%' }}>
                <FormLabel component="legend" sx={{ color: '#1976d2', fontWeight: 500, mb: 1 }}>
                  Choose your courier
                </FormLabel>
                <RadioGroup
                  name="courier"
                  value={formData.courier}
                  onChange={handleChange}
                >
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <Paper 
                      elevation={1} 
                      sx={{ 
                        mb: 2, 
                        p: 2, 
                        border: 1, 
                        borderColor: formData.courier === 'fedex' ? 'primary.main' : 'grey.300',
                        borderRadius: 2,
                        background: formData.courier === 'fedex' ? 'rgba(33, 150, 243, 0.04)' : 'white',
                        transition: 'all 0.3s ease',
                        '&:hover': { 
                          borderColor: 'primary.main',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      <FormControlLabel 
                        value="fedex" 
                        control={<Radio color="primary" />} 
                        label={
                          <Box>
                            <Typography variant="subtitle1" fontWeight={500}>FedEx International</Typography>
                            <Typography variant="body2" color="text.secondary">2-3 business days delivery</Typography>
                          </Box>
                        }
                        sx={{ width: '100%' }}
                      />
                    </Paper>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <Paper 
                      elevation={1} 
                      sx={{ 
                        p: 2, 
                        border: 1, 
                        borderColor: formData.courier === 'dhl' ? 'primary.main' : 'grey.300',
                        borderRadius: 2,
                        background: formData.courier === 'dhl' ? 'rgba(33, 150, 243, 0.04)' : 'white',
                        transition: 'all 0.3s ease',
                        '&:hover': { 
                          borderColor: 'primary.main',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      <FormControlLabel 
                        value="dhl" 
                        control={<Radio color="primary" />} 
                        label={
                          <Box>
                            <Typography variant="subtitle1" fontWeight={500}>DHL Express</Typography>
                            <Typography variant="body2" color="text.secondary">1-2 business days delivery</Typography>
                          </Box>
                        }
                        sx={{ width: '100%' }}
                      />
                    </Paper>
                  </motion.div>
                </RadioGroup>
                {errors.courier && (
                  <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                    {errors.courier}
                  </Typography>
                )}
              </FormControl>
            </motion.div>
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ 
                  px: 4, 
                  py: 1.2, 
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  transition: 'all 0.3s ease'
                }}
              >
                Next Step
              </Button>
            </motion.div>
          </Grid>
        </Grid>
      </form>
    </motion.div>
  );
};

export default ShippingForm;