import Home from '../views/Home';
import AboutUs from '../views/AboutUs';
import HowItWorks from '../views/HowItWorks';
import OurStory from '../views/OurStory';
import TrustAndSafety from '../views/TrustAndSafety';
import TermsOfService from '../views/TermsOfService';
import PrivacyPolicy from '../views/PrivacyPolicy';
import Signup from '../views/Signup';
import SignupCitizen from '../views/SignupCitizen';
import SignupNonProfit from '../views/SignupNonProfit';
import Inbox from '../views/Inbox';
import User from '../views/User';
import MakePost from '../views/MakePost';
import ShareNeed from '../views/ShareNeed';
import MakeOffer from '../views/MakeOffer';
import ActionForm from '../views/ActionForm';
import SearchResults from '../views/SearchResults';
import Asset from '../views/Asset';
import NeedForm from '../views/NeedForm';
import NeedFormGoods from '../views/NeedFormGoods';
import NeedFormVolunteers from '../views/NeedFormVolunteers';
import OfferForm from '../views/OfferForm';
import OfferFormGoods from '../views/OfferFormGoods';
import OfferFormSkills from '../views/OfferFormSkills';
import ContactUs from '../views/ContactUs';
import Help from '../views/Help';
import ForgotPassword from '../components/Users/Auth/ForgotPassword';
import SetNewPassword from '../components/Users/Auth/SetNewPassword';
import CookiePolicy from '../views/CookiePolicy';
import TempChat from '../views/TempChat';
import EmailVerification from '../views/EmailVerification';
import Login from '../views/Login';

type RouteMap = {
  [componentName: string]: {
    component: () => JSX.Element;
    roles: string[];
    path: string;
  };
};

const routes: RouteMap = {
  Home: {
    component: Home,
    roles: [],
    path: '/',
  },
  AboutUs: {
    component: AboutUs,
    roles: [],
    path: '/about-us',
  },
  HowItWorks: {
    component: HowItWorks,
    roles: [],
    path: '/how-it-works',
  },
  OurStory: {
    component: OurStory,
    roles: [],
    path: '/our-story',
  },
  TrustAndSafety: {
    component: TrustAndSafety,
    roles: [],
    path: '/trust-and-safety',
  },
  TermsOfService: {
    component: TermsOfService,
    roles: [],
    path: '/terms-of-service',
  },
  PrivacyPolicy: {
    component: PrivacyPolicy,
    roles: [],
    path: '/privacy-policy',
  },
  CookiePolicy: {
    component: CookiePolicy,
    roles: [],
    path: '/cookie-policy',
  },
  ForgotPassword: {
    component: ForgotPassword,
    roles: [],
    path: '/forgot-password',
  },
  SetNewPassword: {
    component: SetNewPassword,
    roles: [],
    path: '/set-new-password',
  },
  Signup: {
    component: Signup,
    roles: [],
    path: '/signup',
  },
  Login: {
    component: Login,
    roles: [],
    path: '/login',
  },
  SignupCitizen: {
    component: SignupCitizen,
    roles: [],
    path: '/signup-citizen',
  },
  SignupNonProfit: {
    component: SignupNonProfit,
    roles: [],
    path: '/signup-nonprofit',
  },
  Inbox: {
    component: Inbox,
    roles: ['OWNER', 'ADMIN'],
    path: '/inbox',
  },
  User: {
    component: User,
    roles: [],
    path: '/my-profile',
  },
  MakePost: {
    component: MakePost,
    roles: [],
    path: '/make-a-post',
  },
  ShareNeed: {
    component: ShareNeed,
    roles: [],
    path: '/share-a-need',
  },
  MakeOffer: {
    component: MakeOffer,
    roles: [],
    path: '/make-an-offer',
  },
  ActionForm: {
    component: ActionForm,
    roles: [],
    path: '/action',
  },
  Assets: {
    component: SearchResults,
    roles: ['OWNER', 'ADMIN'],
    path: '/search-results',
  },
  Asset: {
    component: Asset,
    roles: ['OWNER', 'ADMIN'],
    path: '/asset/:assetId',
  },
  NeedForm: {
    component: NeedForm,
    roles: ['OWNER', 'ADMIN'],
    path: '/need',
  },
  NeedFormGoods: {
    component: NeedFormGoods,
    roles: ['OWNER', 'ADMIN'],
    path: '/need/goods',
  },
  NeedFormVolunteers: {
    component: NeedFormVolunteers,
    roles: ['OWNER', 'ADMIN'],
    path: '/need/volunteers',
  },
  OfferForm: {
    component: OfferForm,
    roles: ['OWNER', 'ADMIN'],
    path: '/offer',
  },
  OfferFormGoods: {
    component: OfferFormGoods,
    roles: ['OWNER', 'ADMIN'],
    path: '/offer/goods',
  },
  OfferFormSkills: {
    component: OfferFormSkills,
    roles: ['OWNER', 'ADMIN'],
    path: '/offer/skills',
  },
  ContactUs: {
    component: ContactUs,
    roles: [],
    path: '/contact-us',
  },
  Help: {
    component: Help,
    roles: [],
    path: '/help',
  },
  TempChat: {
    component: TempChat,
    roles: [],
    path: '/chat',
  },
  EmailVerification: {
    component: EmailVerification,
    roles: [],
    path: '/email-verification',
  },
};

export default routes;
