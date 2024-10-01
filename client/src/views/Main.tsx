import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import renderPrivateRoute from '../routes/PrivateRouteWrapper';
import routes from '../routes/routes';

const {
  Home,
  AboutUs,
  HowItWorks,
  OurStory,
  TrustAndSafety,
  TermsOfService,
  PrivacyPolicy,
  CookiePolicy,
  ForgotPassword,
  SetNewPassword,
  SignupCitizen,
  SignupNonProfit,
  Inbox,
  User,
  MakePost,
  ActionForm,
  Assets,
  Asset,
  NeedForm,
  NeedFormGoods,
  NeedFormVolunteers,
  OfferForm,
  OfferFormGoods,
  OfferFormSkills,
  ContactUs,
  Help,
  EmailVerification,
  Login,
} = routes;

function Main() {
  return (
    <main>
      <Switch>
        <Route exact path={Home.path} component={Home.component} />

        {/* static */}
        {/* static: about */}
        <Route exact path={AboutUs.path} component={AboutUs.component} />
        <Route exact path={HowItWorks.path} component={HowItWorks.component} />
        <Route exact path={OurStory.path} component={OurStory.component} />

        {/* static: policy */}
        <Route exact path={TrustAndSafety.path} component={TrustAndSafety.component} />
        <Route exact path={TermsOfService.path} component={TermsOfService.component} />
        <Route exact path={PrivacyPolicy.path} component={PrivacyPolicy.component} />
        <Route exact path={CookiePolicy.path} component={CookiePolicy.component} />

        {/* users */}
        <Route exact path={Login.path} component={Login.component} />
        <Route exact path={ForgotPassword.path} component={ForgotPassword.component} />
        <Route exact path={SetNewPassword.path} component={SetNewPassword.component} />
        <Route exact path={SignupCitizen.path} component={SignupCitizen.component} />
        <Route exact path={SignupNonProfit.path} component={SignupNonProfit.component} />

        {/* action: assets */}
        <Route exact path={Assets.path} component={Assets.component} />
        <Route exact path={Asset.path} component={Asset.component} />

        {/*Make a post Route */}
        <Route exact path={MakePost.path} component={MakePost.component} />

        {/* Private Routes */}
        <Route exact path={User.path} render={renderPrivateRoute(User.roles, User.component)} />

        <Route exact path={Inbox.path} render={renderPrivateRoute(Inbox.roles, Inbox.component)} />

        {/* action */}
        <Route
          exact
          path={ActionForm.path}
          render={renderPrivateRoute(ActionForm.roles, ActionForm.component)}
        />

        {/* action: needs */}
        <Route
          exact
          path={NeedForm.path}
          render={renderPrivateRoute(NeedForm.roles, NeedForm.component)}
        />
        <Route
          exact
          path={NeedFormGoods.path}
          render={renderPrivateRoute(NeedFormGoods.roles, NeedFormGoods.component)}
        />
        <Route
          exact
          path={NeedFormVolunteers.path}
          render={renderPrivateRoute(NeedFormVolunteers.roles, NeedFormVolunteers.component)}
        />

        {/* action: offers */}
        <Route
          exact
          path={OfferForm.path}
          render={renderPrivateRoute(OfferForm.roles, OfferForm.component)}
        />
        <Route
          exact
          path={OfferFormGoods.path}
          render={renderPrivateRoute(OfferFormGoods.roles, OfferFormGoods.component)}
        />
        <Route
          exact
          path={OfferFormSkills.path}
          render={renderPrivateRoute(OfferFormSkills.roles, OfferFormSkills.component)}
        />
        {/* End Private Routes*/}

        {/* support */}
        <Route exact path={ContactUs.path} component={ContactUs.component} />
        <Route exact path={Help.path} component={Help.component} />
        <Route exact path={EmailVerification.path} component={EmailVerification.component} />
      </Switch>
    </main>
  );
}

export default Main;
