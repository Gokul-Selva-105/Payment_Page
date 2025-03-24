import React, { useEffect } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { green } from '@mui/material/colors';
import { CheckCircle } from '@mui/icons-material';
import { motion } from 'framer-motion';

const PaymentSuccess = ({ formData, onReset }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          maxWidth: '100%', 
          mx: 'auto',
          background: 'linear-gradient(to bottom right, #ffffff, #f7f9fc)',
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(149, 157, 165, 0.2)'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2 
            }}
          >
            <CheckCircle sx={{ fontSize: 80, color: green[500], mb: 2 }} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              Payment Successful!
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Typography variant="body1" color="text.secondary" align="center">
              Your order has been placed successfully. A confirmation email has been sent to your email address.
            </Typography>
          </motion.div>
        </Box>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Box sx={{ mb: 4, p: 2, bgcolor: 'rgba(232, 245, 233, 0.4)', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              Order Details
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Order Number</Typography>
              <Typography variant="body2" fontWeight="medium">{Math.floor(100000 + Math.random() * 900000)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Shipping to</Typography>
              <Typography variant="body2" fontWeight="medium">{formData.shipping.country}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Total Amount</Typography>
              <Typography variant="body2" fontWeight="medium" color="primary">
                ${(
                  parseFloat(formData.shipping.price) +
                  19.99 + // shipping cost
                  (parseFloat(formData.shipping.price) * 0.1) + // tax
                  12.00 // insurance
                ).toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={onReset}
              sx={{ 
                minWidth: 200,
                py: 1.2,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                transition: 'all 0.3s ease'
              }}
            >
              Back to Shopping
            </Button>
          </Box>
        </motion.div>
      </Paper>
    </motion.div>
  );
};

export default PaymentSuccess;