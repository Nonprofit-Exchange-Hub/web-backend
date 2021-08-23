import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import type { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { placeholderImg } from './assets/temp';
import EmailInput from './EmailInput';
import FacebookAuthBtn from './FacebookAuthBtn';
import GoogleAuthBtn from './GoogleAuthBtn';
import PasswordInput from './PasswordInput';
import StyledLink from './StyledLink';
import TextDivider from './TextDivider';

const useStyles = makeStyles((theme: Theme) => ({
    sideImg: {
        backgroundImage: `url("${placeholderImg}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
    },
    signUpContainer: {
        margin: theme.spacing(5),
    },
    button: {
        borderRadius: 0,
        height: 62,
        textTransform: 'none',
        backgroundColor: '#C4C4C4',
        color: 'white',
    },
    header: { fontWeight: 'bold' },
    input: {
        height: 62,
        border: '1px solid #C4C4C4',
        boxSizing: 'border-box',
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        fontSize: 18,
        marginBottom: 20,
    },
    label: {
        color: '#000000',
        textAlign: 'left',
    },
}));

interface UserSignupData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    accept_terms: boolean;
}

const initialFormData: UserSignupData = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    accept_terms: false,
};

function SignupCitizen() {
    const classes = useStyles();
    const history = useHistory();
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'failure'>('idle')
    const [emailError, setEmailError] = React.useState(false)
    const [ formData, setFormData ] = React.useState(initialFormData);

    React.useEffect(() => {
        if(status === 'success'){
            history.push('/')

        }
    }, [status, history])

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value, checked }: { name: string; value: string; checked: boolean } = evt.target;
        setFormData((fData) => ({
            ...fData,
            [name]: name ==='accept_terms' ? checked : value,
        }));
    };

    const handleSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();
        setStatus('loading')
        try {
            const res = await fetch('http://localhost:3001/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json()
            if(data.status === 409){
                setStatus('failure')
                setEmailError(true)
            } else setStatus('success')
        } catch (err) {
            setStatus('failure')
        }
    };

    return (
        <div className="SignupCitizen">
            <Grid container>
                <Grid className={classes.sideImg} item xs={5} />
                <Grid container className={classes.signUpContainer} item direction="column" xs={6}>
                    <Typography className={classes.header} variant="h4" component="h1" align="left" gutterBottom>
                        Let's get started.
                    </Typography>
                    <Typography component="p" align="left" gutterBottom>
                        Already have an account? <StyledLink to="/login">Log In</StyledLink>
                    </Typography>
                    <Grid container item justify="space-between">
                        <GoogleAuthBtn>Sign Up with Google</GoogleAuthBtn>
                        <FacebookAuthBtn>Sign Up With Facebook</FacebookAuthBtn>
                    </Grid>
                    <TextDivider>or</TextDivider>
                    <form onSubmit={handleSubmit}>
                        <Grid container item xs={12} justify="space-between">
                            <Grid item xs={5}>
                                <FormControl fullWidth>
                                    <label className={classes.label} htmlFor="first_name">
                                        First Name
                                    </label>
                                    <Input
                                        className={classes.input}
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        autoComplete="given-name"
                                        placeholder="Jane"
                                        fullWidth
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        disableUnderline
                                        required
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={5}>
                                <FormControl fullWidth>
                                    <label className={classes.label} htmlFor="last_name">
                                        Last Name
                                    </label>
                                    <Input
                                        className={classes.input}
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        autoComplete="family-name"
                                        placeholder="Individual"
                                        fullWidth
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        disableUnderline
                                        required
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container />
                        <EmailInput
                            value={formData.email}
                            placeholder="jane@citizen.com"
                            onChange={handleChange}
                            startAdornment={true}
                            error={emailError}
                        />
                        <PasswordInput value={formData.password} onChange={handleChange} startAdornment={true} />
                        <FormControlLabel
                            style={{ textAlign: 'left', display: 'block' }}
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={formData.accept_terms}
                                    onChange={handleChange}
                                    name="accept_terms"
                                    inputProps={{ 'aria-label': 'accept_terms_checkbox' }}
                                />
                            }
                            label={
                                <label>
                                    Accept the{' '}
                                    <StyledLink to="/terms_and_condtions" target="_blank">
                                        Terms and Condtions
                                    </StyledLink>
                                </label>
                            }
                        />

                        <Button
                            className={classes.button}
                            fullWidth
                            type="submit"
                            disabled={!formData.accept_terms}
                        >
                            Sign Up
                        </Button>
                        {/* Placeholder for loading  - waiting on UI/UX response as to what they want. */}
                        {status === 'loading' && <Typography>Loading</Typography>} 
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}

export default SignupCitizen;
