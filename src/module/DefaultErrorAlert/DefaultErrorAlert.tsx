import React, { ReactNode } from "react";
import { ErrorStatus } from "..";
import "./style.css";

export interface ErrorAlertProps {
  status: ErrorStatus;
  language: "sv-SE" | "en-US";
  onClose: () => void;
}

type ContentStrings = Record<
  "title" | "close_label" | "status_failed" | "status_sending" | "status_sent",
  string
> & {
  body: string[];
};

function renderSVGBody(): ReactNode {
  return (
    <g>
      <path
        d="M289.890736,159.267244 C319.088977,154.994876 347.02143,161.525358 373.688097,178.858691 C413.688097,204.858691 422,223.633622 409,239 C400.333333,249.244252 365.896032,263.333333 305.688097,281.267244 L289.890736,159.267244 Z"
        fill="url(#linearGradient-1)"
      />
      <polygon
        fill="#F9C08B"
        points="122 91 109 17 127 10 273 98 286 128 300 278 295 281 214 254 251 237 249 198 201 114 151 78 127 91"
      />
      <polygon fill="#F9C08B" points="15 276 50.5 286 86 276 43 211 15 248" />
      <polygon
        fill="#F9C08B"
        points="74 164 113 195 147 263 192 252 192 195 139 137 98 127 85 141"
      />
      <g
        transform="translate(142.132960, 186.591447) rotate(-124.000000) translate(-142.132960, -186.591447) translate(-28.867040, 20.591447)"
        fillRule="nonzero"
        fill="#285176"
      >
        <path d="M291.333722,204.680587 C286.732647,202.800427 281.485871,204.986987 279.59222,209.555156 C277.71243,214.123103 279.914869,219.346008 284.516145,221.212121 L315.251982,233.509782 C321.466592,236.002757 323.795141,238.816116 323.86517,240.111414 C323.93531,241.392735 321.929285,244.428716 316.289845,247.242146 L193.373072,308.241996 C178.545274,316.124665 153.50332,316.124665 138.423777,308.241996 L15.8158491,247.630771 C9.92408947,244.385717 7.98806141,241.36357 7.98806141,240.082178 C7.98806141,238.800785 -8.42493873,254.886626 7.52515283,263.368276 L130.089986,323.96524 C141.242527,329.4666 153.559343,332.210149 166.002211,331.987314 C178.305021,332.210149 190.495426,329.494339 201.521556,324.076479 L324.704079,263.215678 C340.401672,254.873435 342.267312,244.539221 341.972832,239.107742 C341.692268,233.690168 338.662156,223.606599 322.109062,216.977514 L291.333722,204.680587 Z" />
        <path d="M131.859922,24.1332478 L63.6382761,210.743937 C60.8839542,218.123749 61.632559,226.365643 65.6580953,233.137437 C78.3138307,253.989903 118.624156,268 165.999997,268 C213.375839,268 253.686164,253.989903 266.3419,233.151552 L266.3419,233.137416 C270.367508,226.365621 271.116005,218.123728 268.361719,210.743916 L200.027979,24.1042728 C194.914701,9.65589621 181.25627,0 165.944999,0 C150.633729,0 136.9894,9.65589621 131.862019,24.1042728 L131.859922,24.1332478 Z M215.745752,119.671609 C206.494048,125.538616 188.810008,130.529064 165.9834,130.529064 C143.17198,130.529064 125.445272,125.312419 116.192121,119.459527 L129.497638,83.2680118 L129.511762,83.2680118 C141.334027,86.8447469 153.636848,88.6120509 165.996439,88.5270009 C178.341567,88.6259593 190.615822,86.8870909 202.437726,83.3385853 L215.745752,119.671609 Z M234.701151,171.443571 C226.169739,181.254729 199.516399,190.698543 165.998587,190.698543 C132.480776,190.698543 105.800678,181.212385 97.2960236,171.415342 L109.909453,136.920485 C123.681062,144.413215 144.006535,148.824236 166.028599,148.824236 C188.048856,148.824236 208.331299,144.413215 222.118819,136.920485 L234.701151,171.443571 Z M250.859994,223.780121 C243.204359,236.433037 210.831711,249.906052 165.997864,249.906052 C121.164017,249.906052 88.7906462,236.447151 81.1357343,223.737777 C79.9775175,221.659588 79.7939009,219.185608 80.627263,216.965983 L90.6415656,189.610264 C106.517643,201.44308 134.426794,208.822892 165.99743,208.822892 C197.568066,208.822892 225.446843,201.584589 241.353295,189.610264 L251.339393,216.965983 C252.172755,219.199687 252.003241,221.673775 250.859162,223.766007 L250.859994,223.780121 Z M165.997864,18.310033 C173.653499,18.2817566 180.51797,23.074284 183.102994,30.2984723 L196.295333,66.3061345 C186.450256,69.1194457 176.238162,70.505074 165.997864,70.4341387 C155.757566,70.5048243 145.545472,69.1193733 135.700395,66.3061345 L148.864529,30.3267017 C151.435235,23.0883987 158.314025,18.2676889 165.997864,18.310033 Z" />
      </g>
    </g>
  );
}

const content: { "sv-SE": ContentStrings; "en-US": ContentStrings } = {
  "sv-SE": {
    title: "Kritiskt fel",
    body: [
      "Ett kritiskt fel har uppstått.",
      "Vänligen vänta tills rapporten är skickad.",
      "Om detta sker fler gånger kontakta supporten support@allbinary.se.",
    ],
    close_label: "Ladda om",
    status_failed:
      "Det gick inte att skicka rapporten. Vänligen kontakta support@allbinary.se",
    status_sending: "Felrapport skickas... vänligen vänta.",
    status_sent: "Rapporten är skickad!",
  },
  "en-US": {
    title: "Critial error",
    body: [
      "A critical error has occured.",
      "Please wait until error report has been sent.",
      "If this happends multiple times please contant support at support@allbinary.se",
    ],
    close_label: "Reload",
    status_failed:
      "Error report could not be sent. Please contant support@allbinary.se",
    status_sending: "Error report is being sent... please wait.",
    status_sent: "Error report has been sent!",
  },
};

function getStatusMessage(
  status: ErrorStatus,
  language: "sv-SE" | "en-US"
): string {
  switch (status) {
    case "sent": {
      return content[language].status_sent;
    }
    case "failed": {
      return content[language].status_failed;
    }
    case "detected": {
      return content[language].status_sending;
    }
    default: {
      return "Sending error report.";
    }
  }
}

export const DefaultErrorAlert: React.FunctionComponent<ErrorAlertProps> = ({
  status,
  onClose,
  language = "sv-SE",
}) => {
  const { title, body, close_label } = content[language];

  return (
    <div className="container_style">
      <div className="layout_base">
        <div className="layout_graphic">
          <svg
            width="495px"
            height="300px"
            viewBox="0 0 495 300"
            className="graphic"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <linearGradient
                x1="71.0335121%"
                y1="20.8630174%"
                x2="14.2819663%"
                y2="97.4135166%"
                id="linearGradient-1"
              >
                <stop stopColor="#E8F3FA" offset="0%" />
                <stop stopColor="#D0E3EF" offset="100%" />
              </linearGradient>
            </defs>
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              {renderSVGBody()}
            </g>
          </svg>
        </div>
        <div className="layout_text">
          <div className="title_with_divider">
            <div className="main_title">{title ? title : "Error"}</div>
            <div className="divider" />
          </div>

          <div className="main_body">
            {body.map((sentence) => (
              <p key={sentence}>{sentence}</p>
            ))}
          </div>
          <div className="status_bar">
            <span className={`status ${status}`}>
              {getStatusMessage(status, language)}
            </span>
          </div>

          <div className="actions">
            {onClose ? (
              <a
                className="btn"
                onClick={(): void => {
                  onClose();
                }}
              >
                {close_label}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
