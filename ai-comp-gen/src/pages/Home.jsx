import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";
import Editor from "@monaco-editor/react";
import { IoCloseSharp, IoCopy } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { ImNewTab } from "react-icons/im";
import { FiRefreshCcw } from "react-icons/fi";
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { FiEye } from "react-icons/fi";
import { FiExternalLink } from "react-icons/fi";

function Home() {
  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind CSS" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
    { value: "html-tailwind-bootstrap", label: "HTML + Tailwind + Bootstrap" },
  ];

  //   const getResponse = () => {
  //     setLoading(true);
  //     setTimeout(() => setLoading(false), 1500);
  //   };

  const [outputScreen, setOutputScreen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [frameWork, setFrameWork] = useState(options[0]);
  const [tab, setTab] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isNewTabOpen, setIsNewTabOpen] = useState(false);
  const [code, setCode] = useState("");

  // Extract code safely
  function extractCode(response) {
    const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  }

  // The client gets the API key from the environment variable `GEMINI_API_KEY`.
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyAPs2ccViI9fuyM_IF4sEBnYMfHHsZv6cM",
  });

  async function getResponse() {
    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: ` You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components. You are highly skilled in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React, Next.js, Vue.js, Angular, and more.

Now, generate a UI component for: ${prompt}  
Framework to use: ${frameWork.value}  

Requirements:  
- The code must be clean, well-structured, and easy to understand.  
- Optimize for SEO where applicable.  
- Focus on creating a modern, animated, and responsive UI design.  
- Include high-quality hover effects, shadows, animations, colors, and typography.  
- Return ONLY the code, formatted properly in **Markdown fenced code blocks**.  
- Do NOT include explanations, text, comments, or anything else besides the code.  
- And give the whole code in a single HTML file.
      `,
    });
    console.log(response.text);
    setCode(extractCode(response.text));
    setOutputScreen(true);
    setLoading(false);
  }

  // Copy Code
  const copyCode = async () => {
    if (!code.trim()) return toast.error("No code to copy");
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy");
    }
  };

  // Download Code
  const downnloadFile = () => {
    if (!code.trim()) return toast.error("No code to download");

    const fileName = "GenUI-Code.html";
    const blob = new Blob([code], { type: "text/plain" });
    let url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("File downloaded");
  };

  useEffect(() => {
  if (isNewTabOpen) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
}, [isNewTabOpen]);


  return (
    <div className="full-dark">
      <Navbar />

      <div className="container-fluid mt-4">
        <div className="row g-4">
          {/* LEFT GREY CARD */}
          <div className="col-md-6">
            <div
              className="p-4 rounded"
              style={{
                background: "#1a1a1e",
                border: "1px solid #2c2c32",
              }}
            >
              <h3 className="text-[25px] font-semibold sp-text">
                AI Component Generator
              </h3>

              <p className="text-gray-400 mt-2 text-[16px]">
                Describe your component and let AI code it for you.
              </p>

              <p className="mt-4 fw-bold" style={{ fontSize: "20px" }}>
                Framework
              </p>

              <Select
                className="mt-2"
                options={options}
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "#000",
                    borderColor: "#333",
                    color: "#fff",
                    padding: "6px",
                    boxShadow: "none",
                    "&:hover": { borderColor: "#555" },
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#000",
                    borderColor: "#333",
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused
                      ? "#1a1a1a"
                      : state.isSelected
                      ? "#333"
                      : "#000",
                    color: "#fff",
                    cursor: "pointer",
                  }),
                  singleValue: (base) => ({ ...base, color: "#fff" }),
                  placeholder: (base) => ({ ...base, color: "#aaa" }),
                }}
                onChange={(e) => {
                  setFrameWork(e.value);
                }}
              />

              <p className="mt-4 fw-bold" style={{ fontSize: "20px" }}>
                Describe your component
              </p>

              <textarea
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
                className="textarea-purple mt-3"
                placeholder="Describe your component in detail and AI will generate it..."
              ></textarea>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <p className="text-gray-400 medium">
                  Click on generate button to get your code
                </p>

                <button
                  onClick={getResponse}
                  className="generate-btn d-flex align-items-center gap-2"
                >
                  {loading ? (
                    <ClipLoader color="white" size={18} />
                  ) : (
                    <BsStars />
                  )}
                  Generate
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT GREY CARD */}
          <div className="col-md-6">
            <div
              className="p-0 rounded"
              style={{
                background: "#1a1a1e",
                border: "1px solid #2c2c32",
                minHeight: "100%",
                height: "100%",
                overflow: "hidden",
              }}
            >
              {loading ? (
                /* RIGHT SIDE LOADING SPINNER */
                <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                  <ClipLoader color="white" size={45} />
                  <p className="text-gray-400 mt-3">
                    Generating your component...
                  </p>
                </div>
              ) : outputScreen === false ? (
                /* Default Empty State */
                <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      padding: "20px",
                      width: "70px",
                      height: "70px",
                      background: "linear-gradient(to right, #c084fc, #9333ea)",
                    }}
                  >
                    <HiOutlineCode
                      style={{ fontSize: "30px", color: "white" }}
                    />
                  </div>

                  <p className="text-gray-400 medium mt-3">
                    Your component & code will appear here!
                  </p>
                </div>
              ) : (
                <>
                  {/* TOP TABS BAR */}
                  <div
                    className="position-sticky top-0 w-100 d-flex align-items-center justify-content-between px-3 py-2"
                    style={{
                      background: "#121214",
                      zIndex: 50,
                      borderBottom: "1px solid #222",
                    }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        onClick={() => setTab(1)}
                        className={`px-3 py-2 rounded-3 d-flex align-items-center gap-2 tab-item ${
                          tab === 1 ? "active-tab" : ""
                        }`}
                        style={{ cursor: "pointer" }}
                      >
                        <span className="text-purple-300">&lt;/&gt;</span>
                        <span className="fw-semibold">Code Editor</span>
                      </div>

                      <div
                        onClick={() => setTab(2)}
                        className={`px-3 py-2 rounded-3 d-flex align-items-center gap-2 tab-item ${
                          tab === 2 ? "active-tab" : ""
                        }`}
                        style={{ cursor: "pointer" }}
                      >
                        <span className="text-light d-flex align-items-center">
                          <FiEye size={16} />
                        </span>
                        <span className="fw-semibold text-light">
                          Live Preview
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      {tab === 1 ? (
                        <>
                          <button
                            className="btn btn-dark border border-secondary px-3 py-2 rounded-3 action-btn"
                            onClick={copyCode}
                          >
                            <IoCopy size={18} />
                            <span className="ms-2">Copy</span>
                          </button>

                          <button
                            className="btn btn-dark border border-secondary px-3 py-2 rounded-3 action-btn"
                            onClick={downnloadFile}
                          >
                            <PiExportBold size={18} />
                            <span className="ms-2">Export</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-dark border border-secondary px-3 py-2 rounded-3 action-btn"
                            onClick={() => setIsNewTabOpen(true)}
                          >
                            <FiExternalLink size={18} />
                            <span className="ms-2">Open in New Tab</span>
                          </button>

                          <button
                            className="btn btn-dark border border-secondary px-3 py-2 rounded-3 action-btn"
                            onClick={() => setRefreshKey((prev) => prev + 1)}
                          >
                            <FiRefreshCcw size={18} />
                            <span className="ms-2">Refresh</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {tab === 1 ? (
                    /* CODE EDITOR */
                    <Editor
                      height="calc(100vh - 50px)"
                      theme="vs-dark"
                      defaultLanguage="html"
                      value={code}
                      onChange={(newValue) => setCode(newValue)}
                    />
                  ) : (
                    /* LIVE PREVIEW */
                    <iframe
                      key={refreshKey}
                      srcDoc={code}
                      className="w-100"
                      style={{
                        height: "calc(100vh - 50px)",
                        background: "white",
                      }}
                      sandbox="allow-scripts allow-same-origin"
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* FULLSCREEN PREVIEW OVERLAY */}
      {isNewTabOpen && (
        <div
          className="position-fixed top-0 start-0 bg-white w-100 h-100 overflow-auto"
          style={{ zIndex: 9999 }}
        >
          <div
            className="text-dark w-100 d-flex align-items-center justify-content-between px-3 py-2 bg-light"
            style={{ height: "60px" }}
          >
            <p className="fw-bold m-0">Preview</p>

            <button
              onClick={() => setIsNewTabOpen(false)}
              className="btn border rounded d-flex align-items-center justify-content-center p-0"
              style={{ width: "40px", height: "40px" }}
            >
              <IoCloseSharp />
            </button>
          </div>

          <iframe
            srcDoc={code}
            className="w-100"
            style={{ height: "calc(100vh - 60px)" }}
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default Home;





