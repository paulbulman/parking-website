import { Link } from "react-router-dom";
import { Layout } from "../../components/Layout";

export const PrivacyPage = () => {
  return (
    <Layout
      heading="Privacy policy"
      subheading="How your data is kept as safe as possible"
    >
      <div className="content">
        <h3>Introduction</h3>
        <p>
          This app requires a limited amount of personal information to function
          correctly. As per the{" "}
          <a href="http://www.legislation.gov.uk/ukpga/2018/12/contents/enacted">
            Data Protection Act 2018
          </a>
          , steps have been taken to ensure this information is:
        </p>
        <ul>
          <li>used fairly, lawfully and transparently;</li>
          <li>used for specified, explicit purposes;</li>
          <li>
            used in a way that is adequate, relevant and limited to only what is
            necessary;
          </li>
          <li>accurate and, where necessary, kept up to date;</li>
          <li>kept for no longer than is necessary; and</li>
          <li>
            handled in a way that ensures appropriate security, including
            protection against unlawful or unauthorised processing, access,
            loss, destruction or damage.
          </li>
        </ul>
        <p>You also have the right to:</p>
        <ul>
          <li>be informed about how your data is being used;</li>
          <li>access personal data;</li>
          <li>have incorrect data updated;</li>
          <li>have data erased;</li>
          <li>stop or restrict the processing of your data;</li>
          <li>
            data portability (allowing you to get and reuse your data for
            different services); and
          </li>
          <li>
            object to how your data is processed in certain circumstances.
          </li>
        </ul>
        <h3>What personal information is collected, and why?</h3>
        <p>
          All personal information collected is required for the app to function
          correctly:
        </p>
        <ul>
          <li>
            your email address, to allow you to reset your account password, and
            to receive notifications;
          </li>
          <li>
            your name and car registration number, to allow other people to find
            out who is blocking them in; and
          </li>
          <li>
            approximately how far you live from the office, to allow the system
            to allocate spaces accordingly.
          </li>
        </ul>
        <p>
          Note that, in the case of where you live, the only information stored
          is an approximate numerical distance. Your physical address is never
          stored, even partially.
        </p>
        <h3>How is personal information secured?</h3>
        <p>
          All personal information is stored in managed AWS services and
          encrypted at rest. Access to this underlying data is restricted to
          those who need it in order to support the running of the system. All
          such accounts have strong, unique passwords and are protected by
          multi-factor authentication.
        </p>
        <p>
          Some personal information (name, car registration number) is available
          to other users of the system. In order to protect this data, users are
          not allowed to sign up to the system themselves; all new accounts must
          be created by an administrative user.
        </p>
        <p>
          Registration numbers are not visible to browse; they are only
          displayed when searching for a specific registration number. This is
          the legitimate use case of another user finding out who is blocking
          them in.
        </p>
        <p>
          No personal information is ever shared with any third-party. No
          adverts or tracking cookies are used.
        </p>
        <p>
          Further technical protections are in place to attempt to make the
          overall system as secure as is practicably possible. Details of some
          of these are on the <Link to="/faq">FAQ</Link> page.
        </p>
        <h3>Contact details</h3>
        <p>
          If you have any questions relating to how your personal data is
          managed, please contact help@{process.env.REACT_APP_DOMAIN}.
        </p>
      </div>
    </Layout>
  );
};
