"use client"

export function AgentInterface() {
  return (
    <section className="relative w-full lg:max-w-[71.25rem] md:mx-auto">
      <div className="border-[0.5px] rounded-xl border-zinc-800 w-full">
        <section className="flex flex-col min-h-[35rem] lg:flex-row w-full xl:min-w-[71.25rem]">
          {/* Left Panel - Code + Diagram */}
          <div className="w-full lg:max-w-[37rem] border-zinc-800 border-r-[0.5px] p-[0.62rem] overflow-hidden">
            <div className="h-full pb-10 md:pb-20 bg-gradient-to-b from-black to-zinc-900 flex flex-col gap-20 rounded-md border-zinc-800 border-[0.5px]">
              {/* Code Block */}
              <div className="truncate">
                <pre className="bg-transparent leading-5 p-6 rounded-xl shadow-lg px-3 md:px-8 overflow-x-scroll no-scrollbar">
                  <CodeSnippet />
                </pre>
              </div>

              {/* Diagram - Desktop Only */}
              <div className="hidden md:block w-full overflow-x-scroll no-scrollbar overflow-y-hidden md:overflow-hidden relative">
                <div className="px-16 relative w-[35.67rem] pl-10 mx-auto lg:mx-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="285"
                    height="4"
                    viewBox="0 0 285 4"
                    fill="none"
                    className="absolute left-1/4 top-[9%]"
                  >
                    <path
                      opacity="0.5"
                      d="M0.0390625 2.14169H284.728"
                      stroke="white"
                      strokeWidth="3"
                      strokeDasharray="4"
                    ></path>
                  </svg>

                  {/* First Row */}
                  <div className="flex gap-12 items-center">
                    <DiagramBadge text="input" icon="target" />
                    <DiagramBadge text="agent" icon="agent" active />
                    <DiagramBadge text="output" icon="target" />
                  </div>

                  {/* Second Row */}
                  <div className="mt-10">
                    <div className="flex gap-12 items-center">
                      <DiagramBadge text="llm" icon="llm" active />
                      <DiagramBadge text="memory" icon="book" />
                      <DiagramBadge text="tools" icon="tools" active />
                    </div>
                  </div>

                  {/* Third Row */}
                  <div className="mt-10">
                    <div className="flex gap-12 justify-evenly items-center">
                      <DiagramBadge text="workflow" icon="workflow" active />
                      <DiagramBadge text="rag" icon="knowledge-base" />
                    </div>
                  </div>

                  {/* Connection Lines Overlay */}
                  <svg
                    className="absolute top-5 left-[15%]"
                    width="377"
                    height="163"
                    viewBox="0 0 377 163"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.5"
                      d="M186.972 0.728607V37.701M186.972 74.117V37.701M186.972 37.701L278.612 37.1904M186.972 37.701L93.9805 37.3336M374.634 71.0705V47.648C374.634 42.1459 370.19 37.6774 364.688 37.6481L278.612 37.1904M278.612 37.1904V162.662M2.0625 68.9865V47.6611C2.0625 42.1539 6.51533 37.6832 12.0225 37.6612L93.9805 37.3336M93.9805 37.3336V147.42"
                      stroke="#343434"
                      strokeWidth="3"
                      strokeDasharray="4"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Features */}
          <div className="flex-1 relative grid md:place-items-center border-t-[0.5px] lg:border-t-0 border-zinc-800 col-start-2">
            <FeaturePanel
              icon="uapi"
              title="Unified provider API"
              description="Switch between AI providers by changing a single line of code using the AI SDK"
            />
            <FeaturePanel
              icon="book"
              title="Memory"
              description="Combine long-term memory with recent messages for more robust agent recall"
            />
            <FeaturePanel
              icon="message"
              title="Prompt tuning"
              description="Bootstrap, iterate, and eval prompts in a local playground with LLM assistance."
            />
            <FeaturePanel
              icon="tool"
              title="Tool calling"
              description="Allow agents to call your functions, interact with other systems, and trigger real-world actions"
              isLast={true}
            />
          </div>
        </section>
      </div>
    </section>
  )
}

// Sub-components

function CodeSnippet() {
  return (
    <>
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="table-row">
          <span className="table-cell font-mono pr-4 text-xs text-[#707070] text-right select-none">{index + 1}</span>
          <div className="token-line" style={{ color: "rgb(156, 220, 254)" }}>
            {index === 0 && (
              <>
                <span className="token keyword text-xs font-mono" style={{ color: "rgb(86, 156, 214)" }}>
                  <span>const</span>
                </span>
                <span className="token plain text-xs font-mono">
                  <span> chefAgent </span>
                </span>
                <span className="token operator text-xs font-mono" style={{ color: "rgb(212, 212, 212)" }}>
                  <span>=</span>
                </span>
                <span className="token plain text-xs font-mono">
                  <span> </span>
                </span>
                <span className="token keyword text-xs font-mono" style={{ color: "rgb(86, 156, 214)" }}>
                  <span>new</span>
                </span>
                <span className="token plain text-xs font-mono">
                  <span> </span>
                </span>
                <span className="token class-name text-xs font-mono" style={{ color: "rgb(78, 201, 176)" }}>
                  <span>Agent</span>
                </span>
                <span className="token punctuation text-xs font-mono" style={{ color: "rgb(212, 212, 212)" }}>
                  <span>(</span>
                </span>
                <span className="token punctuation text-xs font-mono" style={{ color: "rgb(212, 212, 212)" }}>
                  <span>{"{"}</span>
                </span>
              </>
            )}
            {index === 1 && (
              <>
                <span className="token plain text-xs font-mono">
                  <span> name</span>
                </span>
                <span className="token operator text-xs font-mono" style={{ color: "rgb(212, 212, 212)" }}>
                  <span>:</span>
                </span>
                <span className="token plain text-xs font-mono">
                  <span> </span>
                </span>
                <span className="token string text-xs font-mono" style={{ color: "rgb(206, 145, 120)" }}>
                  <span>'Chef Agent'</span>
                </span>
                <span className="token punctuation text-xs font-mono" style={{ color: "rgb(212, 212, 212)" }}>
                  <span>,</span>
                </span>
              </>
            )}
            {index === 2 && (
              <>
                <span className="token plain text-xs font-mono">
                  <span> instructions</span>
                </span>
                <span className="token operator text-xs font-mono" style={{ color: "rgb(212, 212, 212)" }}>
                  <span>:</span>
                </span>
                <span className="token plain text-xs font-mono">
                  <span> </span>
                </span>
              </>
            )}
            {index === 3 && (
              <>
                <span className="token plain text-xs font-mono">
                  <span> </span>
                </span>
                <span className="token string text-xs font-mono" style={{ color: "rgb(206, 145, 120)" }}>
                  <span>"You are Michel, a practical and experienced home chef"</span>
                </span>
                <span className="token plain text-xs font-mono">
                  <span> </span>
                </span>
                <span className="token operator text-xs font-mono" style={{ color: "rgb(212, 212, 212)" }}>
                  <span>+</span>
                </span>
              </>
            )}
            {index === 4 && (
              <>
                <span className="token plain text-xs font-mono">
                  <span> </span>
                </span>
                <span className="token string text-xs font-mono" style={{ color: "rgb(206, 145, 120)" }}>
                  <span>"who helps people cook great meals."</span>
                </span>
              </>
            )}
            {index === 5 && (
              <>
                <span className="token plain text-xs font-mono">
                  <span> model</span>
                </span>
                <span className="token operator text-xs font-mono" style={{ color: "rgb(212, 212, 212)" }}>
                  <span>:</span>
                </span>
                <span className="token plain text-xs font-mono">
                  <span> </span>
                </span>
                <span className="token function text-xs font-mono" style={{ color: "rgb(220, 220, 170)" }}>
                  <span>openai</span>
                </span>
                <span className="token punctuation text-xs font-mono" style={{ color: "rgb(212, 212, 212)" }}>
                  <span>(</span>
                </span>
                <span className="token string text-xs font-mono" style={{ color: "rgb(206, 145, 120)" }}>
                  <span>'gpt-4o-mini'</span>
                </span>
                <span className="token punctuation text-xs font-mono" style={{ color: "rgb(212, 212, 212)" }}>
                  <span>)</span>
                </span>
                <span className="token punctuation text-xs font-mono" style={{ color: "rgb(212, 212, 212)" }}>
                  <span>,</span>
                </span>
              </>
            )}
            {index === 6 && (
              <>
                <span className="token plain text-xs font-mono">
                  <span> memory</span>
                </span>
                <span className="token punctuation text-xs font-mono" style={{ color: "rgb(212, 212, 212)" }}>
                  <span>,</span>
                </span>
              </>
            )}
            {index === 7 && (
              <>
                <span className="token plain text-xs font-mono">
                  <span> workflow</span>
                </span>
                <span className="token operator text-xs font-mono" style={{ color: "rgb(212, 212, 212)" }}>
                  <span>:</span>
                </span>
                <span className="token plain text-xs font-mono">
                  <span> </span>
                </span>
                <span className="token punctuation text-xs font-mono" style={{ color: "rgb(212, 212, 212)" }}>
                  <span>{"{"}</span>
                </span>
                <span className="token plain text-xs font-mono">
                  <span> chefWorkflow </span>
                </span>
                <span className="token punctuation text-xs font-mono" style={{ color: "rgb(212, 212, 212)" }}>
                  <span>{"}"}</span>
                </span>
              </>
            )}
            {index === 8 && (
              <>
                <span className="token punctuation text-xs font-mono" style={{ color: "rgb(212, 212, 212)" }}>
                  <span>{"}"}</span>
                </span>
                <span className="token punctuation text-xs font-mono" style={{ color: "rgb(212, 212, 212)" }}>
                  <span>)</span>
                </span>
                <span className="token punctuation text-xs font-mono" style={{ color: "rgb(212, 212, 212)" }}>
                  <span>;</span>
                </span>
              </>
            )}
          </div>
        </div>
      ))}
    </>
  )
}

function DiagramBadge({ text, icon, active = false }: { text: string; icon: string; active?: boolean }) {
  return (
    <div className="relative z-10">
      <div
        className={`flex relative w-32 h-10 rounded-[4px] ${!active ? "border-zinc-800 bg-[#171717] backdrop-blur-[49px] border-[0.5px]" : "border-zinc-800 bg-[#171717] backdrop-blur-[49px] border-[0.5px]"}`}
      >
        <div className="flex items-center justify-center h-10 w-10 border-r-[0.5px] border-zinc-800">
          <svg className={`h-4 w-4 ${active ? "text-[#1AFB6F]" : ""}`}>
            <use href={`/icons/sprite.svg#${icon}`}></use>
          </svg>
        </div>
        <div className="pl-2.5 flex items-center">
          <p className="font-medium text-zinc-300 text-[0.8rem]">{text}</p>
        </div>
      </div>
    </div>
  )
}

function FeaturePanel({
  icon,
  title,
  description,
  isLast = false,
}: {
  icon: string
  title: string
  description: string
  isLast?: boolean
}) {
  return (
    <div
      className={`flex border-b-[0.5px] w-[calc(100%-1.8px)] h-full first:rounded-tr-xl last:rounded-br-xl border-zinc-800 last:border-0 relative items-center justify-between overflow-hidden transition-colors md:hover:bg-[#0F0F0F] [&_span_svg_path]:hover:stroke-[#1AFB6F] [&_span_svg_path.changeFill]:hover:stroke-[transparent] [&_span_svg_path.changeFill]:hover:fill-[#1AFB6F] [&_span_svg_rect]:hover:stroke-[#1AFB6F] [&_span_svg_circle]:hover:stroke-[#1AFB6F] [&_span_svg_circle.changeFill]:hover:stroke-[transparent] [&_span_svg_circle.changeFill]:hover:fill-[#1AFB6F]`}
    >
      <div className="flex px-[1.38rem] py-6 flex-col items-start gap-2">
        <span className="inline-flex items-center gap-2">
          <svg className="h-4 w-4 text-zinc-500">
            <use href={`/icons/sprite.svg#${icon}`}></use>
          </svg>
          <span className="text-sm">{title}</span>
        </span>
        <p className="text-zinc-500 text-sm w-[75%]">{description}</p>
      </div>
      <span className="absolute right-0 bottom-0">
        <FeatureGraphic />
      </span>
    </div>
  )
}

function FeatureGraphic() {
  return (
    <svg width="138" height="139" viewBox="0 0 138 139" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_757_20370)">
        <path d="M133.61 163.009L131.912 132.026C131.201 119.04 122.111 108.032 109.493 104.878V104.878C98.0185 102.009 89.7536 91.9968 89.1116 80.1865L87.8797 57.5266C87.2658 52.2388 88.0084 48.828 85.5581 44.9483C83.002 40.9013 76.9865 36.7825 71.1056 36.7199C62.2524 36.6258 57.8024 39.2994 53.9201 43.469C50.1385 47.5304 48.4987 52.4183 48.1431 55.8142L47.5327 61.0086L46.0715 73.4436C46.0196 73.885 46.4168 74.2465 46.8507 74.1502C48.0157 73.8914 49.4979 73.5455 50.7801 73.2094C51.1474 73.1132 51.5215 73.3464 51.5919 73.7195L54.0142 86.5701C54.081 86.9248 54.4244 87.1567 54.7785 87.0867C56.6894 86.7088 58.7432 86.3111 61.0223 85.8323M21.207 183.797L28.5515 129.065C29.6112 121.168 35.0046 114.538 42.1043 110.922C49.3342 107.239 56.8073 102.768 61.0409 99.4759" stroke="#343434" strokeWidth="0.747689"></path>
        <path d="M119.324 57.4416L119.352 65.9682C119.355 66.6417 120.204 66.7712 120.375 66.12C120.725 64.7965 121.028 63.3815 121.105 62.2782C121.26 60.0599 120.806 48.4229 120.559 42.8817M119.324 57.4416L119.3 50.1537C119.299 50.0693 119.317 49.9863 119.35 49.9087C120.053 48.2727 120.698 45.6938 120.559 42.8817M119.324 57.4416C119.319 56.0186 116.741 53.5115 115.263 52.2709C115.124 52.1544 115.044 51.984 115.044 51.8028L115.104 33.9157C115.105 33.4264 115.657 33.1512 116.029 33.4694C119.243 36.2205 120.403 39.7003 120.559 42.8817M10.3371 57.7601C9.73446 59.4502 9.16831 61.9914 9.17544 64.6606M9.17544 64.6606C9.18542 68.401 10.3212 72.3926 14.0599 74.6454C14.2448 74.7568 14.3638 74.9554 14.3655 75.1713C14.4302 83.4166 14.4032 90.4115 14.3745 93.7695C14.3704 94.2416 13.8594 94.5014 13.5074 94.1868C11.8523 92.7076 9.46537 89.5417 8.8117 84.7451C8.80703 84.7108 8.80538 84.6759 8.80677 84.6413C9.11171 77.0615 9.17964 68.1671 9.17544 64.6606ZM68.1321 36.7001L68.1321 26.4639C68.1321 26.0903 67.7979 25.8069 67.4304 25.874C62.0343 26.8593 52.0472 28.9143 49.161 30.3776C48.9739 30.4724 48.8669 30.6654 48.8669 30.8752C48.8669 34.8335 48.8669 44.1907 48.8669 49.2987C48.8669 49.7482 49.343 50.038 49.7423 49.8316L49.8048 49.7993M82.7532 41.7392L82.4254 25.025C82.4188 24.6861 82.691 24.4088 83.0299 24.4149C88.134 24.5074 97.9741 25.0051 101.955 26.3684C102.194 26.4503 102.344 26.6808 102.336 26.9332C102.14 33.4193 102.238 41.4347 102.329 45.4088C102.338 45.824 101.934 46.1241 101.535 46.011C98.6416 45.1919 92.5121 43.9819 84.9788 43.9378M19.1375 64.7874C19.0755 59.2283 18.9929 49.7548 19.0529 46.7008C19.0561 46.5385 19.1245 46.389 19.2449 46.2801C23.7329 42.2209 30.9727 38.2017 34.781 36.3225C35.1781 36.1265 35.635 36.4217 35.6307 36.8645L35.4523 55.2464C35.4499 55.4911 35.2989 55.7095 35.0719 55.8013C28.6903 58.3808 23.0285 62.6853 20.1832 65.2321C19.7889 65.585 19.1434 65.3165 19.1375 64.7874ZM110.51 62.4316C110.465 65.9328 110.401 72.7386 110.4 80.296C110.4 80.445 110.347 80.5873 110.245 80.6959C106.879 84.2824 99.0343 88.8165 94.7607 91.0444C94.3634 91.2515 93.893 90.96 93.8945 90.512L93.9545 72.2641C93.9553 72.0335 94.0887 71.8238 94.2962 71.7233C100.968 68.4935 106.656 64.3171 109.485 61.9566C109.888 61.6204 110.517 61.9069 110.51 62.4316ZM80.6115 77.9256C80.6299 81.5724 80.6376 89.1725 80.5475 96.3154C80.5445 96.5574 80.3978 96.7735 80.1714 96.8589C75.9464 98.4527 66.7079 100.348 61.8977 101.231C61.5301 101.298 61.1961 101.014 61.1961 100.641V82.3604C61.1961 82.0524 61.4295 81.7949 61.7353 81.7582C67.0755 81.1174 75.5127 78.7169 79.8286 77.3584C80.2154 77.2366 80.6095 77.5201 80.6115 77.9256ZM46.8166 83.6977C46.8225 85.6083 46.8523 91.0392 46.9396 101.928C46.9422 102.253 46.6818 102.527 46.3563 102.536C36.2981 102.807 29.8282 101.443 27.4534 100.597C27.2241 100.515 27.0799 100.296 27.0799 100.053V81.769C27.0799 81.336 27.5259 81.038 27.938 81.1705C32.1232 82.5161 41.3589 83.0078 46.2257 83.0984C46.554 83.1045 46.8156 83.3693 46.8166 83.6977Z" stroke="#343434" strokeWidth="0.7" strokeLinecap="round"></path>
        <path d="M67.925 91.6856L69.9973 90.4384L70.0319 90.3297L69.9973 90.2697H69.8959L69.5492 90.2468L68.3651 90.2125L67.3383 90.1667L66.3435 90.1095L66.0928 90.0523L65.8582 89.7204L65.8822 89.5545L66.0928 89.4029L66.3942 89.4315L67.0609 89.4802L68.0611 89.5545L68.7865 89.6003L69.8612 89.7204H70.0319L70.0559 89.6461L69.9973 89.6003L69.9519 89.5545L68.9171 88.8022L67.797 88.007L67.2103 87.5493L66.8929 87.3176L66.7329 87.1002L66.6636 86.6253L66.9516 86.2849L67.3383 86.3135L67.437 86.3421L67.829 86.6654L68.6664 87.3605L69.7599 88.2244L69.9199 88.3674L69.9839 88.3188L69.9919 88.2844L69.9199 88.1557L69.3252 87.0029L68.6904 85.8301L68.4078 85.3438L68.3331 85.052C68.3064 84.9319 68.2877 84.8318 68.2877 84.7088L68.6158 84.231L68.7971 84.1681L69.2345 84.231L69.4185 84.4027L69.6906 85.0692L70.1306 86.119L70.8133 87.5464L71.0134 87.9698L71.12 88.3617L71.16 88.4818H71.2294V88.4132L71.2854 87.6094L71.3894 86.6225L71.4907 85.3524L71.5254 84.9948L71.6908 84.5657L72.0188 84.334L72.2748 84.4656L72.4855 84.7889L72.4562 84.9977L72.3308 85.8701L72.0855 87.2375L71.9255 88.1529H72.0188L72.1255 88.0384L72.5575 87.4234L73.2829 86.4508L73.603 86.0647L73.9763 85.6384L74.2164 85.4353H74.6697L75.0031 85.9674L74.8538 86.5166L74.387 87.1517L74.0003 87.6894L73.4456 88.4904L73.0989 89.1312L73.1309 89.1827L73.2136 89.1741L74.467 88.888L75.1445 88.7564L75.9525 88.6077L76.3179 88.7908L76.3579 88.9767L76.2139 89.3571L75.3498 89.586L74.3364 89.8034L72.8269 90.1867L72.8082 90.201L72.8295 90.2296L73.5096 90.2983L73.8003 90.3154H74.5124L75.8379 90.4213L76.1846 90.6673L76.3926 90.9676L76.3579 91.1965L75.8245 91.4883L75.1044 91.3052L73.4243 90.8761L72.8482 90.7216H72.7682V90.7731L73.2483 91.2766L74.1283 92.129L75.2298 93.2275L75.2858 93.4992L75.1445 93.7138L74.9951 93.6909L74.027 92.91L73.6536 92.5581L72.8082 91.7943H72.7522V91.8744L72.9469 92.1805L73.9763 93.8396L74.0297 94.3488L73.955 94.5147L73.6883 94.6148L73.3949 94.5576L72.7922 93.6508L72.1708 92.6296L71.6694 91.7142L71.6081 91.7514L71.3121 95.1698L71.1734 95.3443L70.8533 95.4759L70.5866 95.2585L70.4453 94.9066L70.5866 94.2115L70.7573 93.3047L70.896 92.5\
