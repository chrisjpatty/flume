import * as React from "react";
import { useSpring, animated } from "react-spring";
import clamp from 'lodash/clamp'
import throttle from 'lodash/throttle'

const remap = (value, low1, high1, low2, high2) => {
  return clamp(low2 + (high2 - low2) * (value - low1) / (high1 - low1), -1, 1);
}

function TypeSafe(props) {
  const wrapper = React.useRef();

  const topRight = p => `translate(0, ${-p * 90})`;
  const bottomLeft = p => `translate(0, ${-p * 40})`
  const bottom = p => `translate(0, ${-p * 50})`
  const [squareProps, set] = useSpring(() => ({
    progress: 0,
    config: { mass: 10, tension: 550, friction: 100 }
  }));

  const setScrollY = React.useCallback(throttle(e => {
    const { y, height } = wrapper.current.getBoundingClientRect();
    const progress = remap(window.innerHeight - y, 0, window.innerHeight + height, -1, 1);
    set({progress})
  }, 50), [set])

  React.useEffect(() => {
    window.addEventListener("scroll", setScrollY);
    return () => {
      window.removeEventListener("scroll", setScrollY);
    };
  }, [setScrollY]);

  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}} ref={wrapper}>
      <svg viewBox="0 -50 444 600" {...props}>
        <defs>
          <linearGradient
            id="prefix__linear-gradient"
            x1={292.3}
            y1={181.25}
            x2={416.87}
            y2={79.26}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.01} stopColor="#a8263f" />
            <stop offset={1} stopColor="#d83058" />
          </linearGradient>
          <linearGradient
            id="prefix__linear-gradient-2"
            x1={145.25}
            y1={422.39}
            x2={24.72}
            y2={367.07}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0} stopColor="#661629" />
            <stop offset={1} stopColor="#931d34" />
          </linearGradient>
          <linearGradient
            id="prefix__linear-gradient-3"
            x1={141.87}
            y1={350.7}
            x2={288.11}
            y2={283.48}
            gradientTransform="matrix(0 1 1 0 -143 217)"
            xlinkHref="#prefix__linear-gradient"
          />
          <linearGradient
            id="prefix__linear-gradient-4"
            x1={19}
            y1={149.7}
            x2={91.69}
            y2={149.7}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0} stopColor="#999" stopOpacity={0} />
            <stop offset={0.14} stopColor="#999" stopOpacity={0.03} />
            <stop offset={0.31} stopColor="#999" stopOpacity={0.12} />
            <stop offset={0.48} stopColor="#999" stopOpacity={0.28} />
            <stop offset={0.67} stopColor="#999" stopOpacity={0.49} />
            <stop offset={0.86} stopColor="#999" stopOpacity={0.77} />
            <stop offset={1} stopColor="#999" />
          </linearGradient>
          <linearGradient
            id="prefix__linear-gradient-5"
            x1={19}
            y1={298.79}
            x2={91.69}
            y2={298.79}
            xlinkHref="#prefix__linear-gradient-4"
          />
          <linearGradient
            id="prefix__linear-gradient-6"
            x1={19}
            y1={350.72}
            x2={91.69}
            y2={350.72}
            xlinkHref="#prefix__linear-gradient-4"
          />
          <linearGradient
            id="prefix__linear-gradient-7"
            x1={308}
            y1={407.09}
            x2={380.69}
            y2={407.09}
            gradientTransform="matrix(-1 0 0 1 732 0)"
            xlinkHref="#prefix__linear-gradient-4"
          />
          <linearGradient
            id="prefix__linear-gradient-8"
            x1={222.86}
            y1={258.67}
            x2={222.86}
            y2={213.87}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0} stopColor="#6e6e6e" />
            <stop offset={1} stopColor="#5e5f60" />
          </linearGradient>
          <linearGradient
            id="prefix__linear-gradient-9"
            x1={90.02}
            y1={245.54}
            x2={90.02}
            y2={225.46}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0} stopColor="#ca2e5d" />
            <stop offset={1} stopColor="#f23d63" />
            <stop offset={1} stopColor="#5e5f60" />
          </linearGradient>
          <linearGradient
            id="prefix__linear-gradient-10"
            x1={90.02}
            y1={309.18}
            x2={90.02}
            y2={289.09}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0} stopColor="#1e56d4" />
            <stop offset={1} stopColor="#2f6aec" />
          </linearGradient>
          <linearGradient
            id="prefix__linear-gradient-11"
            x1={90.02}
            y1={361.1}
            x2={90.02}
            y2={341.02}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0} stopColor="#309e64" />
            <stop offset={1} stopColor="#30d673" />
          </linearGradient>
          <linearGradient
            id="prefix__linear-gradient-12"
            x1={90.02}
            y1={159.34}
            x2={90.02}
            y2={139.26}
            xlinkHref="#prefix__linear-gradient-9"
          />
          <linearGradient
            id="prefix__linear-gradient-13"
            x1={352.62}
            y1={417.46}
            x2={352.62}
            y2={397.38}
            xlinkHref="#prefix__linear-gradient-9"
          />
          <style>
            {
              ".prefix__cls-14{font-size:25.16px}.prefix__cls-14,.prefix__cls-19{font-family:Paralucent-Medium,Paralucent;font-weight:500}.prefix__cls-18{fill:#3a3a3a}.prefix__cls-19{font-size:23.12px}.prefix__cls-22,.prefix__cls-24{letter-spacing:-.02em}.prefix__cls-25{opacity:.45}.prefix__cls-27{letter-spacing:-.09em}.prefix__cls-28{letter-spacing:-.03em}"
            }
          </style>
        </defs>
        <g
          style={{
            isolation: "isolate"
          }}
        >
          <g id="prefix__Layer_2" data-name="Layer 2">
            <g id="prefix__Layer_1-2" data-name="Layer 1">
              <animated.path
                ref={bottomLeft}
                id="prefix__ts-bottom-left"
                d="M389.86 251h-94.3C283.1 251 273 241 273 229.07v-183c0-6.72 7.32-12.07 16.34-12.07h68.32c9 0 17.29 5.35 18.48 12.09l32.4 183C410.65 241 402.32 251 389.86 251z"
                fill="url(#prefix__linear-gradient)"
                transform={squareProps.progress.interpolate(bottomLeft)}
              />
              <animated.path
                ref={topRight}
                id="ts-top-right"
                d="M15 355.41v69.39a16.48 16.48 0 0016.21 16.61h141.08c5.41 0 9.71-5.64 9.71-12.58v-52.58c0-6.94-4.3-13.21-9.71-14l-141.08-21C22.35 339.9 15 346.24 15 355.41z"
                fill="url(#prefix__linear-gradient-2)"
                transform={squareProps.progress.interpolate(topRight)}
              />
              <animated.path
                ref={bottom}
                id="ts-bottom"
                d="M272 502.75v-90.18c0-11.91-9.55-21.57-21.06-21.57H67.61c-7 0-12.61 7.32-12.61 16.34v68.32c0 9 5.59 17.17 12.61 18.22l183.33 27.3c11.51 1.71 21.06-6.52 21.06-18.43z"
                fill="url(#prefix__linear-gradient-3)"
                transform={squareProps.progress.interpolate(bottom)}
              />
              <path
                d="M89.47 151.92H21.23a2.23 2.23 0 110-4.45h68.24a2.23 2.23 0 010 4.45z"
                fill="url(#prefix__linear-gradient-4)"
              />
              <path
                d="M89.47 301H21.23a2.23 2.23 0 110-4.45h68.24a2.23 2.23 0 010 4.45z"
                fill="url(#prefix__linear-gradient-5)"
              />
              <path
                d="M89.47 352.94H21.23a2.23 2.23 0 110-4.45h68.24a2.23 2.23 0 010 4.45z"
                fill="url(#prefix__linear-gradient-6)"
              />
              <path
                d="M353.53 409.32h68.24a2.23 2.23 0 100-4.46h-68.24a2.23 2.23 0 000 4.46z"
                fill="url(#prefix__linear-gradient-7)"
              />
              <image
                width={444}
                height={561}
                xlinkHref="data:image/png;base64,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"
                style={{
                  mixBlendMode: "multiply"
                }}
                opacity={0.65}
              />
              <rect
                x={90.79}
                y={70.6}
                width={262.6}
                height={379.58}
                rx={8.31}
                fill="#545556"
              />
              <rect
                x={90.79}
                y={70.6}
                width={262.6}
                height={379.58}
                rx={8.31}
                strokeMiterlimit={10}
                stroke="#212121"
                strokeWidth={0.5}
                fill="none"
              />
              <path
                d="M99.1 70.6h246a8.31 8.31 0 018.31 8.31v33.69H90.79V78.92a8.31 8.31 0 018.31-8.32z"
                fill="#4a4b4c"
              />
              <path
                stroke="#2f3030"
                strokeMiterlimit={10}
                fill="none"
                d="M90.79 112.6h262.6"
              />
              <text
                className="prefix__cls-14"
                transform="translate(104.63 100.79)"
              >
                {"Caclul"}
                <tspan x={69.22} y={0} letterSpacing="-.01em">
                  {"a"}
                </tspan>
                <tspan x={82.71} y={0} letterSpacing="-.02em">
                  {"t"}
                </tspan>
                <tspan x={90.61} y={0}>
                  {"e Price"}
                </tspan>
              </text>
              <rect
                x={111.64}
                y={213.87}
                width={222.44}
                height={44.8}
                rx={4.16}
                stroke="#3a3a3a"
                fill="url(#prefix__linear-gradient-8)"
                strokeMiterlimit={10}
              />
              <path
                className="prefix__cls-18"
                d="M310.54 231.63h13.1l-6.55-6.55-6.55 6.55zM324.04 239.36h-13.1l6.55 6.55"
              />
              <text
                className="prefix__cls-14"
                transform="translate(121.62 244.54)"
              >
                {".06"}
              </text>
              <text
                className="prefix__cls-19"
                transform="translate(112.36 208.23)"
              >
                <tspan letterSpacing="-.1em">{"T"}</tspan>
                <tspan x={9.27} y={0} letterSpacing="-.02em">
                  {"a"}
                </tspan>
                <tspan x={21.51} y={0}>
                  {"x "}
                </tspan>
                <tspan className="prefix__cls-22" x={39.2} y={0}>
                  {"R"}
                </tspan>
                <tspan x={52.72} y={0} letterSpacing="-.01em">
                  {"a"}
                </tspan>
                <tspan className="prefix__cls-24" x={65.12} y={0}>
                  {"t"}
                </tspan>
                <tspan x={72.38} y={0}>
                  {"e"}
                </tspan>
              </text>
              <circle
                className="prefix__cls-25"
                cx={90.02}
                cy={238.59}
                r={10.04}
              />
              <circle
                cx={90.02}
                cy={235.5}
                r={10.04}
                fill="url(#prefix__linear-gradient-9)"
              />
              <text
                className="prefix__cls-19"
                transform="translate(226.56 414.36)"
              >
                <tspan className="prefix__cls-27">{"T"}</tspan>
                <tspan className="prefix__cls-28" x={9.27} y={0}>
                  {"o"}
                </tspan>
                <tspan className="prefix__cls-24" x={21.9} y={0}>
                  {"t"}
                </tspan>
                <tspan x={29.16} y={0}>
                  {"al Price"}
                </tspan>
              </text>
              <text
                className="prefix__cls-19"
                transform="translate(112.36 307.63)"
              >
                {"Is "}
                <tspan className="prefix__cls-27" x={22.87} y={0}>
                  {"T"}
                </tspan>
                <tspan className="prefix__cls-22" x={32.14} y={0}>
                  {"a"}
                </tspan>
                <tspan x={44.38} y={0} letterSpacing="-.05em">
                  {"x"}
                </tspan>
                <tspan x={55.71} y={0}>
                  {"-"}
                </tspan>
                <tspan x={64.35} y={0} letterSpacing="-.04em">
                  {"e"}
                </tspan>
                <tspan x={76.24} y={0} letterSpacing="-.03em">
                  {"x"}
                </tspan>
                <tspan x={87.94} y={0}>
                  {"em"}
                </tspan>
                <tspan className="prefix__cls-28" x={119.37} y={0}>
                  {"p"}
                </tspan>
                <tspan x={132.18} y={0}>
                  {"t"}
                </tspan>
              </text>
              <circle
                className="prefix__cls-25"
                cx={90.02}
                cy={302.23}
                r={10.04}
              />
              <circle
                cx={90.02}
                cy={299.14}
                r={10.04}
                fill="url(#prefix__linear-gradient-10)"
              />
              <text
                className="prefix__cls-19"
                transform="translate(112.36 359.55)"
              >
                {"Dis"}
                <tspan x={31.82} y={0} letterSpacing="-.01em">
                  {"c"}
                </tspan>
                <tspan x={44.33} y={0}>
                  {"ou"}
                </tspan>
                <tspan className="prefix__cls-28" x={70.64} y={0}>
                  {"n"}
                </tspan>
                <tspan x={83.13} y={0}>
                  {"t Code"}
                </tspan>
              </text>
              <circle
                className="prefix__cls-25"
                cx={90.02}
                cy={354.15}
                r={10.04}
              />
              <circle
                cx={90.02}
                cy={351.06}
                r={10.04}
                fill="url(#prefix__linear-gradient-11)"
              />
              <text
                className="prefix__cls-19"
                transform="translate(112.36 157.79)"
              >
                {"Su"}
                <tspan x={27.93} y={0} letterSpacing="-.03em">
                  {"b"}
                </tspan>
                <tspan className="prefix__cls-24" x={40.77} y={0}>
                  {"t"}
                </tspan>
                <tspan className="prefix__cls-28" x={48.03} y={0}>
                  {"o"}
                </tspan>
                <tspan x={60.66} y={0} letterSpacing="-.02em">
                  {"t"}
                </tspan>
                <tspan x={67.92} y={0} letterSpacing={0}>
                  {"al"}
                </tspan>
              </text>
              <circle
                className="prefix__cls-25"
                cx={90.02}
                cy={152.39}
                r={10.04}
              />
              <circle
                cx={90.02}
                cy={149.3}
                r={10.04}
                fill="url(#prefix__linear-gradient-12)"
              />
              <circle
                className="prefix__cls-25"
                cx={352.62}
                cy={410.51}
                r={10.04}
              />
              <circle
                cx={352.62}
                cy={407.42}
                r={10.04}
                fill="url(#prefix__linear-gradient-13)"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

export default TypeSafe;
