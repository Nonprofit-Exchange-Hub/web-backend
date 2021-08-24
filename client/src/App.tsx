import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@material-ui/core/styles';
import theme from './Theme';

import Footer from './Footer';
import Header from './Header';
import Routes from './Routes';

import './App.css';

function App(): JSX.Element {
    // const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <Routes />
                    <Footer />
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
