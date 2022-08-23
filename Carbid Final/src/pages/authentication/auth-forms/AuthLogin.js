import Axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { values } from 'lodash';

const url = process.env.REACT_APP_API_URL;

// ========================================|| AUTH LOGIN PAGE FUNCTIONS ||======================================== //
const AuthLogin = () => {
    const [checked, setChecked] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // User login functions ----------------------------------------
    const navigate = useNavigate()

    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            Axios.post(`${url}/login`,
            {
                userEmail: values.email,
                userPassword: values.password
            }
            )
            .then(response => {
                response.status === 200 ? console.log("Login Submitted") : console.log("Login submit failed")
                
                if (response.status === 200) {
                    console.log("Authentication success ID#" + response.data[0].UserID);
                    sessionStorage.setItem('userKey', JSON.stringify(response.data[0]));
                    navigate('/home');
                    
                }
                else if (response.status === 401 || response.status === 501) {
                    console.log("Invalid login parameters");
                }
                else {
                    console.log("Random error occured");
                }

            })
            .catch((error) => console.log(error))
        }
        
    });

    
    // validationSchema: values => {
    //     Yup.object().shape({
    //         email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    //         password: Yup.string().max(255).required('Password is required')
    //     })
    // }
    // initialValues={{
    //     email: 'info@codedthemes.com',
    //     password: '123456',
    //     submit: null
    // }}
    // validationSchema={Yup.object().shape({
    //     email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    //     password: Yup.string().max(255).required('Password is required')
    // })}
    // onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
    //     try {
    //         setStatus({ success: false });
    //         setSubmitting(false);
    //     } catch (err) {
    //         setStatus({ success: false });
    //         setErrors({ submit: err.message });
    //         setSubmitting(false);
    //     }
    // }}

    // {touched.email && errors.email && (
    //     <FormHelperText error id="standard-weight-helper-text-email-login">
    //         {errors.email}
    //     </FormHelperText>
    // )}
    // {touched.password && errors.password && (
    //     <FormHelperText error id="standard-weight-helper-text-password-login">
    //         {errors.password}
    //     </FormHelperText>
    // )}

// ========================================|| AUTH LOGIN PAGE RENDER ||======================================== //
    return (
        <>
            <form novalidate onSubmit={loginForm.handleSubmit}>
                <Grid container spacing={3}>

                    {/* EMAIL INPUT */}
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="email-login">Email Address</InputLabel>
                            <OutlinedInput
                                id="email-login"
                                type="email"
                                value={loginForm.values.email}
                                name="email"
                                // onBlur={handleBlur}
                                onChange={loginForm.handleChange}
                                placeholder="Enter email address"
                                fullWidth
                                // error={Boolean(loginForm.validationSchema['touched'].email && loginForm.validationSchema['errors'].email)}
                            />
                        </Stack>
                    </Grid>


                    {/* PASSWORD  INPUT */}
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="password-login">Password</InputLabel>
                            <OutlinedInput
                                fullWidth
                                // error={Boolean(touched.password && errors.password)}
                                id="-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={loginForm.values.name}
                                name="password"
                                // onBlur={handleBlur}
                                onChange={loginForm.handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                placeholder="Enter password"
                            />
                            
                        </Stack>
                    </Grid>

                    {/* KEEP ME SIGNED IT / FORGET PASSWWORD*/}
                    <Grid item xs={12} sx={{ mt: -1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                        size="small"
                                    />
                                }
                                label={<Typography variant="h6">Keep me signed in</Typography>}
                            />
                            <Link variant="h6" component={RouterLink} to="../ForgotPassword" color="text.primary">
                                Forgot Password?
                            </Link>
                        </Stack>
                    </Grid>
                    {/* {errors.submit && (
                        <Grid item xs={12}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Grid>
                    )} */}
                    
                    {/* LOGIN BUTTON */}
                    <Grid item xs={12}>
                        <AnimateButton>
                            <Button
                                disableElevation
                                // disabled={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="primary"
                                // component={RouterLink}
                                // to="../../home"
                            >
                                Login
                            </Button>
                        </AnimateButton>
                    </Grid>

                </Grid>
            </form>
        </>
    );
};

export default AuthLogin;
