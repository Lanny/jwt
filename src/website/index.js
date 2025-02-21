import { setupTokenEditor, setTokenEditorValue, setAlgorithmInHeader } from "../editor";
import { setupHighlighting } from "./highlighting.js";
import { setupShareJwtButton } from "../share-button.js";
import {
    publicKeyTextArea,
    debuggerSection,
    shareJwtButton,
    shareJwtTextElement,
} from "./dom-elements.js";

import queryString from "querystring";

/* For initialization, look at the end of this file */

function parseLocationQuery() {
    const source = {
        ...queryString.parse(document.location.search.substr(1)),
        ...queryString.parse(document.location.hash.substr(1))
    }

    const keys = [
        "id_token",
        "access_token",
        "value",
        "token",
        "debugger-io?token"
    ];
    for (const key of keys) {
        const token = source[key];

        if (token) {
            if (source.publicKey) {
                publicKeyTextArea.value = source.publicKey;
            }

            setTokenEditorValue(token);
            break;
        }
    }

  if (source.algo) {
    setAlgorithmInHeader(source.algo)
  }
}

// Initialization
setupTokenEditor();
parseLocationQuery();
setupHighlighting();
setupShareJwtButton(shareJwtButton, shareJwtTextElement);
