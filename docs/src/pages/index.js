import React from "react";
import clsx from "clsx";
// import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
// import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
// import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import ArrowRightIcon from "@site/static/img/arrow-right.svg";
import ArrowRightRedIcon from "@site/static/img/arrow-right-red.svg";
import ArrowRightBlueIcon from "@site/static/img/arrow-right-blue.svg";
import PageCurve from "@site/static/img/page-curve.svg";
import PageCurveDark from "@site/static/img/page-curve-dark.svg";
import { NodeEditor } from "flume";
import config, { nodes } from "../exampleFlumeConfig";
import Helmet from "react-helmet";
import TypeSafeAnimation from "../components/TypeSafe";
import { Portal } from "react-portal";

const TITLE = "Flume";
const DESCRIPTION =
  "Extract business logic from your apps with a user-friendly node editor powered by React.";

const getScreenSize = () => {
  if (global.window) {
    if (global.window.matchMedia("(max-width: 700px)").matches)
      return "extra-small";
    if (global.window.matchMedia("(max-width: 960px)").matches) return "small";
    if (global.window.matchMedia("(max-width: 1200px)").matches)
      return "medium";
    return "large";
  }
  return "large";
};

const BlueSpan = ({ children }) => (
  <span className={styles.blueText}>{children}</span>
);
const GreenSpan = ({ children }) => (
  <span className={styles.greenText}>{children}</span>
);
const RedSpan = ({ children }) => (
  <span className={styles.redText}>{children}</span>
);

function Home() {
  // const context = useDocusaurusContext();
  // const {siteConfig = {}} = context;
  const [initialScreenSize, setInitialScreenSize] = React.useState(
    getScreenSize()
  );

  React.useEffect(() => {
    setInitialScreenSize(getScreenSize());
  }, []);

  return (
    <div className={styles.homePageWrapper}>
      <Helmet>
        <title>{TITLE + " | " + DESCRIPTION}</title>
        <meta property="og:title" content={TITLE} data-react-helmet="true" />
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content="https://flume.dev" />
        <meta property="og:url" content="https://flume.dev" />
        <meta property="og:image" content="https://flume.dev/img/fb-img.png" />
        <meta name="twitter:image" content="https://flume.dev/img/fb-img.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <style>
          {`
            body{
              background: var(--background-dark);
            }
          `}
        </style>
      </Helmet>
      <HomeNavigation />
      <HeroBlock />
      <VideoBlock />
      <ExampleBlock initialScreenSize={initialScreenSize.current} />
      <TypeSafetyBlock />
      <FeatureBlocks />
      <RunLogicBlock />
      <CallToActionBlock />
      <Footer />
    </div>
  );
}

export default Home;

const HomeNavigation = () => {
  return (
    <header className={styles.homeHeader}>
      <img className={styles.logo} src="img/logo-dark.svg" alt="Flume logo" />
      <nav className={styles.navLinks}>
        <Link className={styles.desktop} to="/docs/">
          Documentation
        </Link>
        <Link className={styles.mobile} to="/docs/">
          Docs
        </Link>
      </nav>
      <nav className={styles.alignRight}>
        <a
          href="https://github.com/chrisjpatty/flume"
          className={clsx(
            styles.pillButton,
            styles.pillSmall,
            styles.pillWhite
          )}
        >
          <span className={styles.desktop}>View on Github</span>
          <span className={styles.mobile}>Github</span>
        </a>
      </nav>
    </header>
  );
};

const HeroBlock = () => {
  return (
    <div className={styles.heroBlock}>
      <div className={styles.heroTextBlock}>
        <div className={styles.heroTextInnerWrapper}>
          <h1>
            <BlueSpan>Model.</BlueSpan>
            <GreenSpan>Extract.</GreenSpan>
            <RedSpan>Run.</RedSpan>
          </h1>
          <p className={styles.heroSubtitle}>
            Build better apps with{" "}
            <span className={styles.whiteText}>Flume.</span>
          </p>
          <p className={clsx(styles.heroSubtitle, styles.heroSubSubtitle)}>
            A React-powered node editor and runtime engine
          </p>
          <div className={styles.mobileColumnCenter}>
            <Link className={styles.pillButton} to="/docs/quick-start">
              Get Started <ArrowRightIcon />
            </Link>
            <span className={styles.license}>MIT Open-Source</span>
          </div>
        </div>
      </div>
      <div className={styles.heroImageBlock}>
        <img
          src="img/hero-nodes.svg"
          className={styles.heroNodes}
          alt="Flume nodes connected together"
        />
      </div>
    </div>
  );
};

const getInitialScale = size => {
  switch (size) {
    case "extra-small":
      return 0.4;
    case "small":
      return 0.6;
    case "medium":
      return 0.8;
    default:
      return 1;
  }
};

const VideoBlock = () => {
  const [videoOpen, setVideoOpen] = React.useState(false);
  const video = React.useRef();

  return (
    <div className={`${styles.videoCtaWrapper} ${styles.desktop}`}>
      <PageCurveDark className={styles.videoCurve} />
      <div className={styles.videoCtaInnerWrapper}>
        <video autoPlay muted loop className={styles.videoPreview} ref={video}>
          <source src="img/flume-short-web.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoButtonWrapper}>
          <button
            className={styles.playVideoButton}
            onClick={() => {
              setVideoOpen(true);
              video.current.pause();
            }}
          >
            <img src="img/play-icon.svg" alt="play" />
            <span>Watch the trailer</span>
          </button>
        </div>
      </div>
      {videoOpen && (
        <Portal>
          <div className={styles.videoWrapper}>
            <div className={styles.embedContainer}>
              <iframe
                title="Introducing Flume"
                src="https://www.youtube.com/embed/00BrWZnbnLQ?autoplay=1&modestbranding=1"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <div
              className={styles.videoShade}
              onClick={() => {
                video.current.play();
                setVideoOpen(false);
              }}
            />
          </div>
        </Portal>
      )}
    </div>
  );
};

const ExampleBlock = ({ initialScreenSize }) => {
  return (
    <div className={styles.exampleBlock}>
      <PageCurve className={styles.pageCurve} />
      <div className={styles.exampleInnerWrapper}>
        <div className={styles.exampleTextBlock}>
          <h2 className={styles.exampleTitleBlock}>
            <GreenSpan>Extract</GreenSpan> <span>business logic</span>{" "}
            <span>
              <span className={styles.whiteText}>into</span>{" "}
              <GreenSpan>JSON graphs</GreenSpan>
            </span>
          </h2>
          <p className={styles.desktop}>
            Build apps that are resilient to changing requirements by modeling
            your business logic as a JSON graph. Flume provides a sleek UI for
            creating and editing these graphs. <br />
            <br /> This is a live Flume node editor. Go ahead, take it for a
            spin!
          </p>
          <p className={styles.mobileInline}>
            Build apps that are resilient to changing requirements by modeling
            your business logic as a JSON graph. Flume provides a sleek UI for
            creating and editing these graphs. Visit this page on a desktop
            browser to try it out live!
          </p>
        </div>
        <div className={styles.flumeWrapper}>
          <NodeEditor
            comments={{}}
            nodeTypes={config.nodeTypes}
            portTypes={config.portTypes}
            initialScale={getInitialScale(initialScreenSize)}
            disableZoom
            nodes={nodes}
          />
        </div>
      </div>
    </div>
  );
};

const TypeSafetyBlock = () => {
  return (
    <div className={styles.typeSafeWrapper}>
      <PageCurveDark className={styles.pageCurve} />
      <div className={styles.typeSafeInnerWrapper}>
        <div className={clsx(styles.exampleTextBlock, styles.halfTextBlock)}>
          <div className={styles.innerTextWrapper}>
            <h2 className={styles.exampleTitleBlock}>
              <span>
                Let <RedSpan>users</RedSpan> code{" "}
              </span>
              <span>
                with <RedSpan>type safety</RedSpan>
              </span>
            </h2>
            <p>
              Create your own visual programming language, while guaranteeing
              that users can’t create invalid logic. Color-coded ports make this
              concept easy and intuitive for end-users.
              <br />
              <RedSpan>
                <Link to="/docs/type-safety" className={styles.inlineCtaLink}>
                  Learn How <ArrowRightRedIcon />
                </Link>
              </RedSpan>
            </p>
          </div>
        </div>
        <div className={styles.typeSafeImageWrapper}>
          <TypeSafeAnimation className={styles.typeSafeImage} />
        </div>
      </div>
    </div>
  );
};

const FeatureBlocks = () => {
  return (
    <div className={styles.featuresBlock}>
      <PageCurve className={styles.pageCurve} />
      <div className={styles.featuresBlockInnerWrapper}>
        <div className={styles.featureTile}>
          <div className={styles.featureImageWrapper}>
            <img
              className={styles.featureImage}
              src="img/react-tile.svg"
              alt="React JS logo"
            />
          </div>
          <div className={styles.featureTextColumn}>
            <h3 className={styles.featureTitle}>
              Powered by <BlueSpan>React</BlueSpan>
            </h3>
            <p className={styles.featureDescription}>
              Rendering a node editor is as easy as rendering a single React
              component. All required styles are automatically included.
            </p>
          </div>
        </div>
        <div className={styles.featureTile}>
          <div className={styles.featureImageWrapper}>
            <img
              className={styles.featureImage}
              src="img/performance-tile.svg"
              alt="Speedometer"
            />
          </div>
          <div className={styles.featureTextColumn}>
            <h3 className={styles.featureTitle}>
              <GreenSpan>Buttery</GreenSpan> 60fps+ performance
            </h3>
            <p className={styles.featureDescription}>
              Flume bypasses React renders for smooth rendering of
              drag-and-drop, zoom, and pan animations, resulting in smooth
              60fps+ performance on every device.
            </p>
          </div>
        </div>
        <div className={styles.featureTile}>
          <div className={styles.featureImageWrapper}>
            <img
              className={styles.featureImage}
              src="img/theme-tile.svg"
              alt="Paint chips"
            />
          </div>
          <div className={styles.featureTextColumn}>
            <h3 className={styles.featureTitle}>
              Custom <RedSpan>themes</RedSpan>{" "}
              <span className={styles.mobileSmallInline}>
                and <RedSpan>styling</RedSpan>
              </span>
            </h3>
            <p className={styles.featureDescription}>
              (Coming Soon). In a upcoming version, Flume provides a stable API
              for creating sharable themes for the node editor.
            </p>
          </div>
        </div>
        <div className={styles.featureTile}>
          <div className={styles.featureImageWrapper}>
            <img
              className={styles.featureImage}
              src="img/size-tile.svg"
              alt="20kb Minified + GZipped"
            />
          </div>
          <div className={styles.featureTextColumn}>
            <h3 className={styles.featureTitle}>
              <BlueSpan>Lightweight</BlueSpan> footprint
            </h3>
            <p className={styles.featureDescription}>
              Flume was built from scratch to minimize dependencies and other
              bloating code. The result is a library that is fast, light, and
              packed with features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const RunLogicBlock = () => (
  <div className={styles.runLogicWrapper}>
    <PageCurveDark className={styles.pageCurve} />
    <div className={styles.exampleInnerWrapper}>
      <div className={styles.exampleTextBlock}>
        <h2 className={styles.exampleTitleBlock}>
          <span>
            <BlueSpan>Model</BlueSpan> <span>once</span>
            {". "}
          </span>
          <span>
            Run <BlueSpan>everywhere!</BlueSpan>
          </span>
        </h2>
        <p>
          Flume provides a blazing fast engine for running your logic in a
          browser, on your server, or in any Javascript environment. Not using a
          node server? Your logic graphs can also be used in any environment
          that supports JSON.
          <br />
          <BlueSpan>
            <Link to="/docs/running-logic" className={styles.inlineCtaLink}>
              Learn More <ArrowRightBlueIcon />
            </Link>
          </BlueSpan>
        </p>
      </div>
    </div>
  </div>
);

const Wordmark = props => {
  return (
    <svg viewBox="0 0 118.84 46.5" {...props}>
      <g id="prefix__Layer_2" data-name="Layer 2">
        <g id="prefix__Layer_1-2" data-name="Layer 1">
          <path
            className={styles.wordmarkRight}
            d="M110.39 5.32a23.24 23.24 0 00-22.51-4l-28.46 10 34 11.94-34 12 28.46 10a23.24 23.24 0 0022.51-4 23.26 23.26 0 000-35.94z"
          />
          <path
            className={styles.wordmarkLeft}
            d="M59.42 11.31L31 1.31a23.23 23.23 0 00-22.5 4 23.24 23.24 0 000 35.86 23.23 23.23 0 0022.5 4l28.47-10-34-12z"
          />
        </g>
      </g>
    </svg>
  );
};

const CallToActionBlock = () => {
  return (
    <div className={styles.callToActionWrapper}>
      <PageCurve className={styles.pageCurve} />
      <div className={styles.ctaInnerWrapper}>
        <div className={styles.centerFlex}>
          <Wordmark className={styles.ctaWordmark} />
          <p>Ready to give it a try?</p>
          <div>
            <Link className={styles.pillButton} to="/docs/quick-start">
              Get Started <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className={styles.footer} id="footer">
      <span>© Christopher Patty {CURRENT_YEAR}</span>
      <span className={clsx(styles.alignRight, styles.netlifyRecommend)}>
        <span className={styles.hostedBy}>Proudly hosted by</span>
        <a className={styles.netlifyWrapper} href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
          <img src="/img/netlify.svg" alt="Netlify" className={styles.netlifyLogo} />
        </a>
      </span>
    </footer>
  )
}
