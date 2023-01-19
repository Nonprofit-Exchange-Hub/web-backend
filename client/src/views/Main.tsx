import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';

import routes from '../routes';

function Main() {
  return (
    <main>
      <Switch>
        <Route exact path={routes.Home.path} component={routes.Home.component} />

        {/* static */}
        {/* static: about */}
        <Route exact path={routes.AboutUs.path} component={routes.AboutUs.component} />
        <Route exact path={routes.HowItWorks.path} component={routes.HowItWorks.component} />
        <Route exact path={routes.OurStory.path} component={routes.OurStory.component} />

        {/* static: policy */}
        <Route
          exact
          path={routes.TrustAndSafety.path}
          component={routes.TrustAndSafety.component}
        />
        <Route
          exact
          path={routes.TermsOfService.path}
          component={routes.TermsOfService.component}
        />
        <Route exact path={routes.PrivacyPolicy.path} component={routes.PrivacyPolicy.component} />
        <Route exact path={routes.CookiePolicy.path} component={routes.CookiePolicy.component} />

        {/* users */}
        <Route exact path={routes.Login.path} component={routes.Login.component} />
        <Route
          exact
          path={routes.ForgotPassword.path}
          component={routes.ForgotPassword.component}
        />
        <Route
          exact
          path={routes.SetNewPassword.path}
          component={routes.SetNewPassword.component}
        />
        <Route exact path={routes.Signup.path} component={routes.Signup.component} />
        <Route exact path={routes.SignupCitizen.path} component={routes.SignupCitizen.component} />
        <Route
          exact
          path={routes.SignupNonProfit.path}
          component={routes.SignupNonProfit.component}
        />

        {/* support */}
        <Route exact path={routes.ContactUs.path} component={routes.ContactUs.component} />
        <Route exact path={routes.Help.path} component={routes.Help.component} />
        <Route exact path={routes.TempChat.path} component={routes.TempChat.component} />

        {/* action: assets */}
        <Route exact path={routes.Assets.path} component={routes.Assets.component} />
        <Route exact path={routes.Asset.path} component={routes.Asset.component} />

        <PrivateRoute>
          <Route exact path={routes.Inbox.path} component={routes.Inbox.component} />
          <Route exact path={routes.User.path} component={routes.User.component} />

          {/* action */}
          <Route exact path={routes.ActionForm.path} component={routes.ActionForm.component} />

          {/* action: needs */}
          <Route exact path={routes.NeedForm.path} component={routes.NeedForm.component} />
          <Route
            exact
            path={routes.NeedFormGoods.path}
            component={routes.NeedFormGoods.component}
          />
          <Route
            exact
            path={routes.NeedFormVolunteers.path}
            component={routes.NeedFormVolunteers.component}
          />

          {/* action: offers */}
          <Route exact path={routes.OfferForm.path} component={routes.OfferForm.component} />
          <Route
            exact
            path={routes.OfferFormGoods.path}
            component={routes.OfferFormGoods.component}
          />
          <Route
            exact
            path={routes.OfferFormSkills.path}
            component={routes.OfferFormSkills.component}
          />
        </PrivateRoute>
      </Switch>
    </main>
  );
}

export default Main;
