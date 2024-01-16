import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeFormater({ code, language }) {
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          color: "white",
          backgroundColor: "#1e1e1e",
          paddingLeft: 15,
          paddingBlock: 5,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      >
        {language}
      </div>
      <SyntaxHighlighter language={language} style={vscDarkPlus}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeFormater;
