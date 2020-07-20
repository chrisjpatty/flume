import React from "react";
import clsx from "clsx";
// import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
// import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
// import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import ArrowRightIcon from "@site/static/img/arrow-right.svg";
import PageCurve from "@site/static/img/page-curve.svg";
import PageCurveDark from "@site/static/img/page-curve-dark.svg";
import { NodeEditor } from "flume";
import config, { nodes } from "../exampleFlumeConfig";
import Helmet from "react-helmet";

const getScreenSize = () => {
  if (window.matchMedia("(max-width: 700px)").matches) return "extra-small";
  if (window.matchMedia("(max-width: 960px)").matches) return "small";
  if (window.matchMedia("(max-width: 1200px)").matches) return "medium";
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
  const initialScreenSize = React.useRef(getScreenSize());
  return (
    // <Layout
    //   title={`Flume | Extract business logic from your apps with a user-friendly node editor powered by React.`}
    //   description="Description will go into a meta tag in <head />"
    // >
    <div className={styles.homePageWrapper}>
      <Helmet>
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
      <ExampleBlock initialScreenSize={initialScreenSize.current} />
      <TypeSafetyBlock />
      <FeatureBlocks />
      <CallToActionBlock />
    </div>
    // </Layout>
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
        <img src="img/hero-nodes.svg" alt="Flume nodes connected together" />
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
            nodeTypes={config.nodeTypes}
            portTypes={config.portTypes}
            initialScale={getInitialScale(initialScreenSize)}
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
            </p>
          </div>
        </div>
        <div className={styles.typeSafeImageWrapper}>
          <img
            className={styles.typeSafeImage}
            src="img/type-safe-nodes.svg"
            alt="Nodes demonstrating type safety"
          />
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

const CallToActionBlock = () => {
  return (
    <div className={styles.callToActionWrapper}>
      <PageCurveDark className={styles.pageCurve} />
    </div>
  );
};
