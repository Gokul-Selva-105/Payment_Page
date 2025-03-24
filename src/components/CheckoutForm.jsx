import { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  Typography,
  Container,
  StepConnector,
  styled
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import OrderSummary from './OrderSummary';
import PaymentSuccess from './PaymentSuccess';
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${StepConnector.alternativeLabel}`]: {
    top: 22,
  },
  [`& .${StepConnector.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
  [`&.${StepConnector.active}`]: {
    [`& .${StepConnector.line}`]: {
      backgroundImage: 'linear-gradient(95deg, #2196F3 0%, #21CBF3 100%)',
    },
  },
  [`&.${StepConnector.completed}`]: {
    [`& .${StepConnector.line}`]: {
      backgroundImage: 'linear-gradient(95deg, #2196F3 0%, #21CBF3 100%)',
    },
  },
}));

const StepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient(136deg, #2196F3 0%, #21CBF3 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient(136deg, #2196F3 0%, #21CBF3 100%)',
  }),
}));

function StepIcon(props) {
  const { active, completed, className, icon } = props;

  return (
    <StepIconRoot ownerState={{ completed, active }} className={className}>
      {icon}
    </StepIconRoot>
  );
}

const CheckoutForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    shipping: {
      country: '',
      category: '',
      price: '',
      dimensions: {
        length: '',
        width: '',
        height: ''
      },
      weight: '',
      courier: ''
    },
    payment: {
      cardNumber: '',
      cardName: '',
      expiry: '',
      cvv: ''
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleReset = () => {
    setCurrentStep(1);
    setFormData({
      shipping: {
        country: '',
        category: '',
        price: '',
        dimensions: {
          length: '',
          width: '',
          height: ''
        },
        weight: '',
        courier: ''
      },
      payment: {
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: ''
      }
    });
  };

  const updateFormData = (step, data) => {
    setFormData(prev => ({
      ...prev,
      [step]: { ...prev[step], ...data }
    }));
  };

  const steps = [
    { id: 1, name: 'Shipping' },
    { id: 2, name: 'Payment' },
    { id: 3, name: 'Summary' },
    { id: 4, name: 'Confirmation' }
  ];

  const pageVariants = {
    initial: { opacity: 0, x: "-100vw" },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: "100vw" }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      py: 6,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          opacity: 0.4,
          background: 'url(https://www.transparenttextures.com/patterns/cubes.png)'
        }}
      />
      
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography 
            variant="h4" 
            align="center" 
            sx={{ 
              mb: 4, 
              color: '#1a237e', 
              fontWeight: 700,
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            {currentStep === 4 ? 'Order Complete' : 'Checkout Process'}
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Paper 
            elevation={3} 
            sx={{ 
              p: { xs: 2, sm: 3 }, 
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)'
            }}
          >
            {currentStep !== 4 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Stepper 
                  activeStep={currentStep - 1} 
                  sx={{ mb: 4 }} 
                  alternativeLabel
                  connector={<ColorlibConnector />}
                >
                  {steps.map((step) => (
                    <Step key={step.id}>
                      <StepLabel StepIconComponent={StepIcon}>{step.name}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </motion.div>
            )}

            {/* Form Steps */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Box sx={{ p: { xs: 1, sm: 2 } }}>
                  {currentStep === 1 && (
                    <ShippingForm
                      data={formData.shipping}
                      onUpdate={(data) => updateFormData('shipping', data)}
                      onNext={handleNext}
                    />
                  )}
                  {currentStep === 2 && (
                    <PaymentForm
                      data={formData.payment}
                      onUpdate={(data) => updateFormData('payment', data)}
                      onNext={handleNext}
                      onPrev={handlePrev}
                    />
                  )}
                  {currentStep === 3 && (
                    <OrderSummary
                      formData={formData}
                      onPrev={handlePrev}
                      onNext={handleNext}
                    />
                  )}
                  {currentStep === 4 && (
                    <PaymentSuccess
                      formData={formData}
                      onReset={handleReset}
                    />
                  )}
                </Box>
              </motion.div>
            </AnimatePresence>
          </Paper>
        </motion.div>

        {currentStep !== 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mt: 4,
              color: 'rgba(0,0,0,0.6)'
            }}>
              <Typography variant="body2" align="center">
                Secure checkout process • All information is encrypted and secure
              </Typography>
            </Box>
          </motion.div>
        )}
      </Container>
    </Box>
  );
};

export default CheckoutForm;