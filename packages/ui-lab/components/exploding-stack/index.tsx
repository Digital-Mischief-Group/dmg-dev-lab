export const ExplodingStack = () => {
  return (
    
<main>
      <div className="shadow shadow--main">
        <div></div>
      </div>
      
      <section className="layer">
        
        <div className="mover">
          <div className="shadow shadow--table">
            <div></div>
          </div>
          
          <div className="content content--main">
            
            <p className="heading">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M6 3h12l4 6-10 13L2 9Z" />
                <path d="M11 3 8 9l4 13 4-13-3-6" />
                <path d="M2 9h20" />
              </svg>
              <span>the craft of ui</span>
            </p>
            <div className="table-slot"></div>
          </div>
        </div>
        
        <div className="layer table--layer">
          <div className="mover mover--nested">
            <div className="shadow shadow--status">
              <div></div>
            </div>
            
            <div className="content content--table">
              <div className="heading">
                <span>Subscribers</span>
                <span className="badge">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"
                    />
                  </svg>
                  <span>Database</span>
                </span>
                <button aria-label="Open database options">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-ellipsis"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                </button>
              </div>
              <div className="table">
                <table>
                  <thead>
                    <td>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"
                          />
                        </svg>
                        <span>id</span>
                      </span>
                    </td>
                    <td>email</td>
                    <td>name</td>
                    <td>paid</td>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"
                            />
                          </svg>
                          <span>1</span>
                        </span>
                      </td>
                      <td>john.doe@me.com</td>
                      <td><span>John Doe</span></td>
                      <td className="true">true</td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"
                            />
                          </svg>
                          <span>2</span>
                        </span>
                      </td>
                      <td>emhoff3245@msn.com</td>
                      <td><span>Emily Hoffmann</span></td>
                      <td className="true">true</td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"
                            />
                          </svg>
                          <span>3</span>
                        </span>
                      </td>
                      <td>michel@lewin.dev</td>
                      <td><span>Michel Lewin</span></td>
                      <td>false</td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"
                            />
                          </svg>
                          <span>4</span>
                        </span>
                      </td>
                      <td>grau@gmail.com</td>
                      <td><span>Niels Grau</span></td>
                      <td className="true">true</td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"
                            />
                          </svg>
                          <span>5</span>
                        </span>
                      </td>
                      <td>tessa@pixelcraft.com</td>
                      <td>
                        <span>Tessa Dietrich</span>
                      </td>
                      <td className="true">true</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="layer layer--status">
            <div className="mover mover--nested">
              <div className="content content--status">
                <dl className="status">
                  <dt>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="4 7 4 4 20 4 20 7" />
                      <line x1="9" x2="15" y1="20" y2="20" />
                      <line x1="12" x2="12" y1="4" y2="20" />
                    </svg>
                    <span>Name</span>
                  </dt>
                  <dd>Course Waitlist</dd>
                  <dt>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path
                        d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
                      />
                      <path d="M2 12h20" />
                    </svg>
                    <span>Domain</span>
                  </dt>
                  <dd>course.craftofui.com</dd>
                  <dt>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M16 8.9V7H8l4 5-4 5h8v-1.9" />
                    </svg>
                    <span>Count</span>
                  </dt>
                  <dd>23,602</dd>
                  <dt>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                      <path d="M12 18V6" />
                    </svg>
                    <span>Prepaid</span>
                  </dt>
                  <dd>
                    <span className="prepaid">16,280</span>
                  </dd>
                </dl>
              </div>
              <div className="shadow-wrap">
                <div className="shadow shadow--dialog">
                  <div></div>
                </div>
              </div>
            </div>
            <div className="layer layer--dialog">
              <div className="mover">
                <div className="content">
                  <dialog className="dialog">
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44"
                        />
                        <path d="m13.56 11.747 4.332-.924" />
                        <path d="m16 21-3.105-6.21" />
                        <path
                          d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z"
                        />
                        <path d="m6.158 8.633 1.114 4.456" />
                        <path d="m8 21 3.105-6.21" />
                        <circle cx="12" cy="13" r="2" />
                      </svg>
                      <span>Explore</span>
                    </button>
                    <hr />
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M12 3v12" />
                        <path d="m8 11 4 4 4-4" />
                        <path
                          d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"
                        />
                      </svg>
                      <span>Import</span>
                    </button>
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M4.9 16.1C1 12.2 1 5.8 4.9 1.9" />
                        <path d="M7.8 4.7a6.14 6.14 0 0 0-.8 7.5" />
                        <circle cx="12" cy="9" r="2" />
                        <path d="M16.2 4.8c2 2 2.26 5.11.8 7.47" />
                        <path d="M19.1 1.9a9.96 9.96 0 0 1 0 14.1" />
                        <path d="M9.5 18h5" />
                        <path d="m8 22 4-11 4 11" />
                      </svg>
                      <span>Broadcast</span>
                    </button>
                  </dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <a
  className = 'bear-link';
  href = 'https://twitter.com/intent/follow?screen_name=jh3yy';
  target = '_blank';
  rel =
    (
      <svg
        className="w-9"
        viewBox="0 0 969 955"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="161.191"
          cy="320.191"
          r="133.191"
          stroke="currentColor"
          stroke-width="20"
        ></circle>
        <circle
          cx="806.809"
          cy="320.191"
          r="133.191"
          stroke="currentColor"
          stroke-width="20"
        ></circle>
        <circle
          cx="695.019"
          cy="587.733"
          r="31.4016"
          fill="currentColor"
        ></circle>
        <circle
          cx="272.981"
          cy="587.733"
          r="31.4016"
          fill="currentColor"
        ></circle>
        <path
          d="M564.388 712.083C564.388 743.994 526.035 779.911 483.372 779.911C440.709 779.911 402.356 743.994 402.356 712.083C402.356 680.173 440.709 664.353 483.372 664.353C526.035 664.353 564.388 680.173 564.388 712.083Z"
          fill="currentColor"
        ></path>
        <rect
          x="310.42"
          y="448.31"
          width="343.468"
          height="51.4986"
          fill="#FF1E1E"
        ></rect>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M745.643 288.24C815.368 344.185 854.539 432.623 854.539 511.741H614.938V454.652C614.938 433.113 597.477 415.652 575.938 415.652H388.37C366.831 415.652 349.37 433.113 349.37 454.652V511.741L110.949 511.741C110.949 432.623 150.12 344.185 219.845 288.24C289.57 232.295 384.138 200.865 482.744 200.865C581.35 200.865 675.918 232.295 745.643 288.24Z"
          fill="currentColor"
        ></path>
      </svg>
    ) < 'noreferrer noopener';
  </a>




  )
};
