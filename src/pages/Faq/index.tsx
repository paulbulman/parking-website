import { Link } from "react-router-dom";
import { Layout } from "../../components/Layout";

export const FaqPage = () => {
  return (
    <Layout heading="FAQ" subheading="Frequently (er, perhaps) asked questions">
      <div className="content">
        <h3>How do I request a parking space?</h3>
        <p>
          From the <Link to="/">home page</Link>, click the{" "}
          <Link to="/edit-requests">"Edit requests"</Link> button. Select any
          dates you would like a space, and click "Save". Your new requests will
          initially show as "Pending", before updating either to "Allocated"
          (meaning that you can park at the office), or "Interrupted" (meaning
          that you can't, sorry 🙁).
        </p>
        <h3>When will I know whether I have a space?</h3>
        <ul>
          <li>
            Most spaces are released at 12am on the Thursday 11 days ahead of a
            working week. So for instance, for the week beginning Monday, 26
            July 2021, most spaces are released on Thursday, 15 July 2021.
          </li>
          <li>
            At 11am each working day, further spaces are released for the
            subsequent working day.
          </li>
        </ul>
        <p>
          This aims to give some sort of balance between allowing people to make
          travel plans in advance, versus keeping some flexibility for people
          moved onto certain shifts at short notice.
        </p>
        <h3>How are spaces allocated?</h3>
        <p>
          When spaces are released, they are allocated to anybody who's
          requested them in priority order:
        </p>
        <ul>
          <li>People working certain shifts are given top priority;</li>
          <li>
            People who live further away are given priority over people who live
            'nearby'; and
          </li>
          <li>
            People who have been interrupted proportionally more frequently are
            given priority over people who have been interrupted less.
          </li>
        </ul>
        <p>
          Once a space is allocated it is not removed unless the person cancels
          it themselves, i.e. if you are given a space it will not be given to
          anybody else, even if they would have had higher priority if you had
          both requested it at the same time.
        </p>
        <h3>What if I no longer need a space?</h3>
        <p>
          If you've been allocated a space that you no longer need, please
          cancel your request via the{" "}
          <Link to="/edit-requests">"Edit requests"</Link> page.
        </p>
        <p>
          Similarly if you've been interrupted, but no longer need a space
          because you're not coming into the office for whatever reason, please
          cancel your request. This means that if a space becomes available it
          can be given straight to someone who can still use it.
        </p>
        <p>
          If you've been interrupted, but have now made alternative arrangments{" "}
          <strong>to come into the office</strong>, you can choose to stay
          interrupted using the "Stay interrupted" button on the{" "}
          <Link to="daily-details">"Daily details"</Link> page. Note that this
          will only be available if you were interrupted when the final spaces
          were released for that day.
        </p>
        <h3>That's not fair!</h3>
        <p>
          That's not actually a question. However... If you feel you're being
          unfairly disadvantaged on a regular basis, please speak to your
          manager. Management have done their best to devise a system that works
          as fairly as possible, for as many people as possible, but it's a
          surprisingly tricky task.
        </p>
        <h3>I think I've found a bug</h3>
        <p>
          Still not really a question - but very possible. (Normally there's a
          tester whose full-time job it is to find my mistakes... 😄) If
          something's not working as it says it should be, please create a bug
          report{" "}
          <a href={`${process.env.REACT_APP_REPOSITORY_URL}/issues`}>here</a> -
          or, even better, create a PR to fix it!
        </p>
        <h3>How do I know the system's not rigged?</h3>
        <p>
          I suppose you don't, though creating this app would have been an awful
          lot of hassle to go to just for the sake of sneaking an occasional
          exra parking space for myself 😛. If something's not working as it
          should be it's much more likely that there's a bug (see above), but
          you <em>can</em> see all the source code{" "}
          <a href={`${process.env.REACT_APP_REPOSITORY_URL}/tree/main`}>here</a>
          . Anything that's pushed to the main branch is live. Similarly for the
          associated service/API repository.
        </p>
        <h3>Is it secure?</h3>
        <p>
          Yes and no. No system is ever completely secure, despite what it might
          claim. But there are various things in place here to increase the
          odds:
        </p>
        <ul>
          <li>
            As long as you're using a relatively recent browser, it's literally
            impossible to access the site unless you're using an{" "}
            <a
              href={`https://hstspreload.org/?domain=${process.env.REACT_APP_DOMAIN}`}
            >
              encrypted connection
            </a>
            .
          </li>
          <li>
            The site is hosted using{" "}
            <a href="https://pages.cloudflare.com/">Cloudflare pages</a>, which
            provides various security features including{" "}
            <a
              href={`https://www.ssllabs.com/ssltest/analyze.html?d=${process.env.REACT_APP_DOMAIN}&hideResults=on&latest`}
            >
              ensuring the encryption is configured correctly
            </a>
            .
          </li>
          <li>
            Potential passwords are checked against the database of
            known-breached passwords at{" "}
            <a href="https://haveibeenpwned.com/Passwords">Pwned Passwords</a>{" "}
            (using a{" "}
            <a href="https://en.wikipedia.org/wiki/K-anonymity">k-anonymity</a>{" "}
            model, meaning the <em>actual</em> password never leaves your
            computer.)
          </li>
          <li>
            The site is written using the{" "}
            <a href="https://reactjs.org/">React libarary</a>, which helps
            protect against e.g.{" "}
            <a href="https://owasp.org/www-community/attacks/xss/">
              cross-site scripting (XSS)
            </a>{" "}
            attacks.
          </li>
          <li>
            Various attack vectors are mitigated by{" "}
            <a
              href={`https://securityheaders.com/?q=${process.env.REACT_APP_DOMAIN}&hide=on&followRedirects=on`}
            >
              security headers set on the HTTP response.
            </a>
          </li>
          <li>
            The service runs on{" "}
            <a href="https://aws.amazon.com/dynamodb/">various</a>{" "}
            <a href="https://aws.amazon.com/lambda/">serverless</a>{" "}
            <a href="https://aws.amazon.com/api-gateway/">AWS</a>{" "}
            <a href="https://aws.amazon.com/cognito/">services</a>, meaning that
            corresponding hosting environments are hopefully automagically kept
            up-to-date and configured correctly, by people much cleverer than I
            am. I could still have set them up badly, of course, but this at
            least gives us a fighting chance.
          </li>
        </ul>
        <p>
          Hopefully all of the above (and various other things besides), coupled
          with the fact that it's not exactly a high-value target for nation
          state hacker types, means that the chance of your car registration
          number being sold on the dark web is pretty low... 🤞
        </p>
      </div>
    </Layout>
  );
};
