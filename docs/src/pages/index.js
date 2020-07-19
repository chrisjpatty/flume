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

function Home() {
  // const context = useDocusaurusContext();
  // const {siteConfig = {}} = context;
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
      <ExampleBlock />
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
            <span className={styles.blueText}>Model.</span>
            <span className={styles.greenText}>Extract.</span>
            <span className={styles.redText}>Run.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Build better apps with{" "}
            <span className={styles.whiteText}>Flume.</span>
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

const ExampleBlock = () => {
  return (
    <div className={styles.exampleBlock}>
      <PageCurve className={styles.pageCurve} />
      <div className={styles.exampleInnerWrapper}>
        <div className={styles.exampleTextBlock}>
          <h2 className={styles.exampleTitleBlock}>
            <span className={styles.greenText}>Extract</span>{" "}
            <span>business logic</span>{" "}
            <span>
              <span className={styles.whiteText}>into</span>{" "}
              <span className={styles.greenText}>JSON graphs</span>
            </span>
          </h2>
          <p className={styles.desktop}>
            Build apps that are resilient to changing requirements by modeling
            your business logic as a JSON graph. This is a live Flume node
            editor. Go ahead, take it for a spin!
          </p>
          <p className={styles.mobileInline}>
            Build apps that are resilient to changing requirements by modeling
            your business logic as a JSON graph. Visit this page on a desktop
            browser to try out a live node editor.
          </p>
        </div>
        <div className={styles.flumeWrapper}>
          <NodeEditor
            nodeTypes={config.nodeTypes}
            portTypes={config.portTypes}
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
                Let <span className={styles.redText}>users</span> code{" "}
              </span>
              <span>
                with <span className={styles.redText}>type safety</span>
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
        <div className={styles.gridWrapper}>
          <div className={styles.grid1}>
            <h3 className={styles.featureText}>
              <span className={styles.blueText}>Butter-smooth</span> performance
              <br />
              on <span className={styles.blueText}>every</span> <br />
              device
            </h3>
            <img src="img/60fps.svg" alt="60 frames per second plus" />
          </div>
          <div className={styles.grid2}>
            <h3 className={styles.featureText}>
              Preset <br />
              and <span className={styles.greenText}>custom</span>
              <br />
              controls supported
            </h3>
            <img src="img/controls.svg" alt="Custom control icons" />
          </div>
          <div className={styles.grid3}>
            <h3 className={styles.featureText}>
              Custom <span className={styles.redText}>styling</span>
              <br /> and <span className={styles.redText}>theme</span>
              <br /> support
              <br />
              <span className={styles.featureSubtext}>(Coming Soon)</span>
            </h3>
            <img src="img/theme.svg" alt="Paint chips" />
          </div>
          <div className={styles.grid4}>
            <h3 className={styles.featureText}>
              Packed
              <br /> with <span className={styles.blueText}>features</span>,
              <br /> <span className={styles.blueText}>lightweight</span>{" "}
              footprint
            </h3>
            <div className={styles.sizeWrapper}>
              <div className={styles.sizeTextWrapper}>
                <span className={styles.size}>20</span>
                <span className={styles.sizeUnit}>kb</span>
              </div>
              <span className={styles.sizeHint}>Minified + GZipped</span>
            </div>
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
