import React from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { motion } from 'framer-motion';

const OrderSummary = ({ formData, onPrev, onNext }) => {
  const { shipping, payment } = formData;
  const shippingCost = 19.99;
  const tax = shipping.price * 0.1;
  const insurance = 12.00;
  const total = parseFloat(shipping.price) + shippingCost + tax + insurance;

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
      <Box sx={{ width: '100%' }}>
        <motion.div variants={itemVariants}>
          <Paper elevation={2} sx={{ 
            p: 3, 
            mb: 3, 
            background: 'linear-gradient(to bottom, #ffffff, #f9fafc)',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 600 }}>
              Order Summary
            </Typography>
            
            <List disablePadding>
              <ListItem sx={{ py: 1 }}>
                <ListItemText primary="Shipping to" />
                <Typography variant="body2" fontWeight="medium">{shipping.country}</Typography>
              </ListItem>
              
              <ListItem sx={{ py: 1 }}>
                <ListItemText primary="Category" />
                <Typography variant="body2" fontWeight="medium">{shipping.category}</Typography>
              </ListItem>
              
              <ListItem sx={{ py: 1 }}>
                <ListItemText primary="Item Price" />
                <Typography variant="body2" fontWeight="medium">${parseFloat(shipping.price).toFixed(2)}</Typography>
              </ListItem>
              
              <ListItem sx={{ py: 1 }}>
                <ListItemText primary="Dimensions" />
                <Typography variant="body2" fontWeight="medium">
                  {shipping.dimensions.length} × {shipping.dimensions.width} × {shipping.dimensions.height} cm
                </Typography>
              </ListItem>
              
              <ListItem sx={{ py: 1 }}>
                <ListItemText primary="Weight" />
                <Typography variant="body2" fontWeight="medium">{shipping.weight} kg</Typography>
              </ListItem>
              
              <ListItem sx={{ py: 1 }}>
                <ListItemText primary="Courier" />
                <Typography variant="body2" fontWeight="medium">
                  {shipping.courier === 'fedex' ? 'FedEx Int.' : 'DHL Express'}
                </Typography>
              </ListItem>
              
              <Divider sx={{ my: 2 }} />
              
              <ListItem sx={{ py: 1, bgcolor: 'rgba(245, 245, 245, 0.6)', borderRadius: 1 }}>
                <ListItemText primary="Shipping" />
                <Typography variant="body2" fontWeight="medium">${shippingCost.toFixed(2)}</Typography>
              </ListItem>
              
              <ListItem sx={{ py: 1 }}>
                <ListItemText primary="Tax" />
                <Typography variant="body2" fontWeight="medium">${tax.toFixed(2)}</Typography>
              </ListItem>
              
              <ListItem sx={{ py: 1, bgcolor: 'rgba(245, 245, 245, 0.6)', borderRadius: 1 }}>
                <ListItemText primary="Insurance" />
                <Typography variant="body2" fontWeight="medium">${insurance.toFixed(2)}</Typography>
              </ListItem>
              
              <Divider sx={{ my: 2 }} />
              
              <ListItem sx={{ py: 1.5, bgcolor: 'rgba(25, 118, 210, 0.08)', borderRadius: 1 }}>
                <ListItemText primary={<Typography variant="h6" sx={{ fontWeight: 600 }}>Total</Typography>} />
                <Typography variant="h6" color="primary" fontWeight="bold">${total.toFixed(2)}</Typography>
              </ListItem>
            </List>
          </Paper>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Paper elevation={2} sx={{ 
            p: 3, 
            mb: 3, 
            background: 'linear-gradient(to bottom, #ffffff, #f9fafc)',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 600 }}>
              Payment Details
            </Typography>
            
            <List disablePadding>
              <ListItem sx={{ py: 1 }}>
                <ListItemText primary="Card Number" />
                <Typography variant="body2" fontWeight="medium">**** **** **** {payment.cardNumber.slice(-4)}</Typography>
              </ListItem>
              
              <ListItem sx={{ py: 1 }}>
                <ListItemText primary="Card Holder" />
                <Typography variant="body2" fontWeight="medium">{payment.cardName}</Typography>
              </ListItem>
              
              <ListItem sx={{ py: 1 }}>
                <ListItemText primary="Expiry Date" />
                <Typography variant="body2" fontWeight="medium">{payment.expiry}</Typography>
              </ListItem>
            </List>
          </Paper>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={onNext}
                sx={{ 
                  px: 3, 
                  py: 1.2, 
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  transition: 'all 0.3s ease'
                }}
              >
                Place Order
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default OrderSummary;