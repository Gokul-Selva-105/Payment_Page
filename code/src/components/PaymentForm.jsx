import { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  Box,
  Typography,
  InputAdornment,
  Paper
} from '@mui/material';
import { 
  CreditCard, 
  Person, 
  CalendarToday, 
  Lock 
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const PaymentForm = ({ data, onUpdate, onNext, onPrev }) => {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    onUpdate(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})/, '$1/')
      .substr(0, 5);
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').substr(0, 16);
    setFormData(prev => ({
      ...prev,
      cardNumber: formatCardNumber(value)
    }));
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      expiry: formatExpiry(value)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    if (!formData.cardName) {
      newErrors.cardName = 'Cardholder name is required';
    }
    if (!formData.expiry || !/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = 'Please enter a valid expiry date (MM/YY)';
    }
    if (!formData.cvv || !/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }
    
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
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          mb: 3, 
          background: 'linear-gradient(to bottom, #ffffff, #f9fafc)',
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 600, mb: 3 }}>
          Payment Information
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <motion.div variants={itemVariants}>
                <TextField
                  fullWidth
                  label="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber}
                  placeholder="1234 5678 9012 3456"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreditCard color="primary" />
                      </InputAdornment>
                    ),
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
                <TextField
                  fullWidth
                  label="Cardholder Name"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  error={!!errors.cardName}
                  helperText={errors.cardName}
                  placeholder="John Doe"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="primary" />
                      </InputAdornment>
                    ),
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

            <Grid item xs={12} sm={6}>
              <motion.div variants={itemVariants}>
                <TextField
                  fullWidth
                  label="Expiry Date"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleExpiryChange}
                  error={!!errors.expiry}
                  helperText={errors.expiry}
                  placeholder="MM/YY"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday color="primary" />
                      </InputAdornment>
                    ),
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

            <Grid item xs={12} sm={6}>
              <motion.div variants={itemVariants}>
                <TextField
                  fullWidth
                  label="CVV"
                  name="cvv"
                  type="password"
                  value={formData.cvv}
                  onChange={handleChange}
                  error={!!errors.cvv}
                  helperText={errors.cvv}
                  placeholder="123"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="primary" />
                      </InputAdornment>
                    ),
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
                <Box sx={{ 
                  p: 2, 
                  bgcolor: 'rgba(232, 245, 253, 0.5)', 
                  borderRadius: 2,
                  border: '1px solid rgba(33, 150, 243, 0.2)',
                  mt: 2
                }}>
                  <Typography variant="body2" color="text.secondary">
                    Your payment information is secure and encrypted. We do not store your full card details.
                  </Typography>
                </Box>
              </motion.div>
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={onPrev}
                  sx={{ 
                    px: 3, 
                    py: 1.2, 
                    borderRadius: 2,
                    transition: 'all 0.3s ease'
                  }}
                >
                  Previous
                </Button>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ 
                    px: 3, 
                    py: 1.2, 
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Review Order
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <motion.div variants={itemVariants}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: 2,
          mt: 4
        }}>
          <img 
            src="https://cdn-icons-png.flaticon.com/512/196/196578.png" 
            alt="Visa" 
            style={{ height: 30, opacity: 0.7 }} 
          />
          <img 
            src="https://cdn-icons-png.flaticon.com/512/196/196561.png" 
            alt="MasterCard" 
            style={{ height: 30, opacity: 0.7 }} 
          />
          <img 
            src="https://cdn-icons-png.flaticon.com/512/196/196565.png" 
            alt="American Express" 
            style={{ height: 30, opacity: 0.7 }} 
          />
          <img 
            src="https://cdn-icons-png.flaticon.com/512/196/196581.png" 
            alt="PayPal" 
            style={{ height: 30, opacity: 0.7 }} 
          />
        </Box>
      </motion.div>
    </motion.div>
  );
};

export default PaymentForm;