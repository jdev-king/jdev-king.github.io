import{a as xe,b as X,f as re,g as T,i as w,j as W,k as H,l as $}from"./chunk-AAWBJ2KS.js";import{$a as V,Aa as _,Fa as I,Ga as me,Ha as Y,Ia as pe,J as ce,Ja as de,Ka as y,L as B,La as D,Ma as P,Na as f,Oa as h,Pa as r,Q as G,Qa as o,R as N,Ra as c,Sa as b,Ta as x,Ua as m,Va as ge,Wa as l,X as g,Xa as d,Y as u,Ya as M,Za as q,_a as ue,a as j,ab as U,b as F,ga as ne,m as z,nb as fe,ob as he,pa as R,pb as C,q as E,qa as a,s as le,v as se,x as O,xa as v}from"./chunk-XAC3UF5U.js";var be=re("slideAnimation",[W(":increment",[H(":enter",[w({transform:"translateX(100%)",opacity:0}),$(100,[T("400ms ease-out",w({transform:"translateX(0)",opacity:1}))])],{optional:!0}),H(":leave",[$(100,[T("400ms ease-out",w({transform:"translateX(-100%)",opacity:0}))])],{optional:!0})]),W(":decrement",[H(":enter",[w({transform:"translateX(-100%)",opacity:0}),$(100,[T("400ms ease-out",w({transform:"translateX(0)",opacity:1}))])],{optional:!0}),H(":leave",[$(100,[T("400ms ease-out",w({transform:"translateX(100%)",opacity:0}))])],{optional:!0})])]),ve=re("fadeAnimation",[W(":enter",[w({opacity:0,transform:"scale(0.95)"}),T("300ms ease-out",w({opacity:1,transform:"scale(1)"}))]),W(":leave",[T("300ms ease-in",w({opacity:0,transform:"scale(0.95)"}))])]);function we(i,t){if(i&1&&(r(0,"span",17),l(1),o()),i&2){let e=t.$implicit;a(),M(" ",e," ")}}function Pe(i,t){if(i&1&&(r(0,"div",16),f(1,we,2,1,"span",17,D),o()),i&2){let e=m().$implicit;a(),h(e.tools)}}function Se(i,t){if(i&1&&(r(0,"div",10)(1,"div",11)(2,"span",12),l(3),o(),r(4,"span",13),l(5),o()(),r(6,"div",14),c(7,"div",15),o(),_(8,Pe,3,0,"div",16),o()),i&2){let e=t.$implicit;a(3),d(e.name),a(2),d(e.level),a(2),me("width",e.proficiency,"%"),a(),y(e.tools.length?8:-1)}}function Ee(i,t){if(i&1&&(r(0,"div",6)(1,"div",7)(2,"div",8),c(3,"i"),r(4,"h3"),l(5),o()(),r(6,"div",9),f(7,Se,9,5,"div",10,D),o()()()),i&2){let e=t.$implicit;a(3),de(e.icon),a(2),d(e.title),a(2),h(e.skills)}}var J=class i{skillsData=[{title:"AI & Machine Learning",icon:"fas fa-brain",skills:[{name:"LLMs & NLP",level:"Intermediate",proficiency:55,tools:["LangChain","LangGraph","LangSmith","Flowise"]},{name:"AI APIs",level:"Advance",proficiency:85,tools:["OpenAI","Anthropic","Google Gemini","Hugging Face"]},{name:"Deep Learning",level:"Begginer",proficiency:25,tools:["TensorFlow"]}]},{title:"Database & Storage",icon:"fas fa-database",skills:[{name:"Vector & Graph Databases",level:"Intermediate",proficiency:55,tools:["Pinecone","Neo4j"]}]},{title:"Automation",icon:"fas fa-bolt",skills:[{name:"Workflow",level:"Intermediate",proficiency:60,tools:["N8N","Make"]}]},{title:"Cloud & DevOps",icon:"fas fa-cloud",skills:[{name:"Cloud Platforms",level:"Intermediate",proficiency:60,tools:["GCP","AWS"]}]},{title:"Programming",icon:"fas fa-code",skills:[{name:"Languages",level:"Advance",proficiency:80,tools:["Python","TypeScript","Java"]}]},{title:"Web Development",icon:"fas fa-laptop-code",skills:[{name:"Frontend",level:"Advanced",proficiency:85,tools:["Angular","PrimeNG","TailwindCSS"]},{name:"Backend",level:"Intermediate",proficiency:60,tools:["Spring Boot","Flask","FastAPI"]}]}];static \u0275fac=function(e){return new(e||i)};static \u0275cmp=v({type:i,selectors:[["app-skills"]],decls:8,vars:1,consts:[[1,"skills-section"],[1,"section-header"],[1,"title"],[1,"subtitle"],[1,"skills-grid"],["class","skill-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl",4,"ngFor","ngForOf"],[1,"skill-card","transition-all","duration-300","hover:-translate-y-2","hover:shadow-xl"],[1,"card-content"],[1,"card-header"],[1,"skills-list"],["lass","skill-item"],[1,"skill-header"],[1,"skill-name"],[1,"skill-level"],[1,"progress-bar"],[1,"progress-fill"],[1,"tools-list"],[1,"tool-tag"]],template:function(e,n){e&1&&(r(0,"div",0)(1,"div",1)(2,"h2",2),l(3,"Skills & Expertise"),o(),r(4,"p",3),l(5,"Specialized in AI, Cloud Computing, and Full-Stack Development"),o()(),r(6,"div",4),_(7,Ee,9,3,"div",5),o()()),e&2&&(a(7),I("ngForOf",n.skillsData))},dependencies:[C,fe],styles:[".section-header[_ngcontent-%COMP%]{margin-bottom:2rem}.title[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:700;color:#fff;margin-bottom:.5rem}.subtitle[_ngcontent-%COMP%]{color:#94a3b8}.skills-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem}.skill-card[_ngcontent-%COMP%]{background-color:var(--color-gray-900);border-radius:.5rem}.card-content[_ngcontent-%COMP%]{padding:1.5rem}.card-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem;margin-bottom:1rem}.card-header[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:var(--color-gray-400);font-size:1.25rem}.card-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#fff;font-size:1.125rem;font-weight:600}.skills-list[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1rem}.skill-item[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.5rem}.skill-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.skill-name[_ngcontent-%COMP%]{color:#cbd5e1;font-size:.875rem}.skill-level[_ngcontent-%COMP%]{color:#94a3b8;font-size:.75rem}.progress-bar[_ngcontent-%COMP%]{height:6px;background-color:#334155;border-radius:9999px;overflow:hidden}.progress-fill[_ngcontent-%COMP%]{height:100%;background:var(--color-gray-300);border-radius:9999px;transition:width .5s ease}.tools-list[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:.25rem;margin-top:.25rem}.tool-tag[_ngcontent-%COMP%]{background-color:#1e293b;color:#94a3b8;font-size:.75rem;padding:.25rem .5rem;border-radius:9999px}@media (max-width: 768px){.skills-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}}"]})};var Ie=()=>({gap:"1rem"}),K=class i{static \u0275fac=function(e){return new(e||i)};static \u0275cmp=v({type:i,selectors:[["app-hero-section"]],decls:19,vars:3,consts:[[1,"flex","sm:flex-row","sm:justify-between","flex-col","justify-center"],[1,"text-6xl","font-mono","mb-4"],[1,"text-gray-400","max-w-lg"],[1,"flex","mt-6","items-center"],["href","https://github.com/jdev-king","target","_blank",1,"text-gray-400","hover:text-white"],[1,"fa-brands","fa-github","fa-xl"],["href","https://www.linkedin.com/in/jesusdiezp/","target","_blank",1,"text-gray-400","hover:text-white"],[1,"fa-brands","fa-linkedin","fa-xl"],["href","https://www.instagram.com/jdev_king/","target","_blank",1,"text-gray-400","hover:text-white"],[1,"fa-brands","fa-instagram","fa-xl"],["href","https://jdev-king.medium.com","target","_blank",1,"text-gray-400","hover:text-white"],[1,"fa-brands","fa-medium","fa-xl"],[1,"flex"],["src","imgs/black_background.jpg","alt","Hero background",1,"sm:w-[50dvw]","w-[100dvw]","h-90","rounded-lg","object-cover","sm:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_100%)]","sm:mt-0","mt-8"]],template:function(e,n){e&1&&(r(0,"div",0)(1,"div")(2,"h1",1),l(3,"AI"),c(4,"br"),l(5,"Developer"),o(),r(6,"p",2),l(7," I design and implement end-to-end AI solutions that optimize system performance, automate complex workflows, and drive efficiency. "),o(),r(8,"div",3)(9,"a",4),c(10,"i",5),o(),r(11,"a",6),c(12,"i",7),o(),r(13,"a",8),c(14,"i",9),o(),r(15,"a",10),c(16,"i",11),o()()(),r(17,"div",12),c(18,"img",13),o()()),e&2&&(a(8),pe(ue(2,Ie)))},dependencies:[C],encapsulation:2})};var Q=class i{constructor(t){this.http=t;this.headers=new xe({Accept:"application/vnd.github.v3+json"})}BASE_URL="https://api.github.com";headers;cachedReposWithImages={};getUserRepos(t){return this.http.get(`${this.BASE_URL}/users/${t}/repos`,{headers:this.headers}).pipe(O(e=>{throw console.error("Error fetching GitHub repos:",e),e}))}getRepo(t,e){return this.http.get(`${this.BASE_URL}/repos/${t}/${e}`,{headers:this.headers}).pipe(O(n=>{throw console.error("Error fetching GitHub repo:",n),n}))}getReadmeFirstImage(t,e){return this.http.get(`${this.BASE_URL}/repos/${t}/${e}/readme`,{headers:this.headers}).pipe(E(n=>{let s=atob(n.content),p=/<img[^>]+src=["'](https?:\/\/[^"']+)["']/i,k=s.match(p);return k?k[1]:null}),O(n=>{throw console.error("Error fetching README:",n),n}))}getUserReposWithReadmeImage(t){return this.cachedReposWithImages[t]?z(this.cachedReposWithImages[t]):this.getUserRepos(t).pipe(le(e=>{if(e.length===0)return z([]);let n=e.filter(s=>s.name!=="jdev-king"&&s.name!=="jdev-king.github.io").map(s=>this.getReadmeFirstImage(t,s.name).pipe(E(p=>s.name=="n8n"?F(j({},s),{readmeImageUrl:"/imgs/n8n-screenshot-readme.png"}):s.name=="web-ui"?F(j({},s),{readmeImageUrl:"/imgs/web-ui.png"}):F(j({},s),{readmeImageUrl:p})),O(()=>z(F(j({},s),{readmeImageUrl:null})))));return se(n)}),ce(e=>{this.cachedReposWithImages[t]=e}))}static \u0275fac=function(e){return new(e||i)(G(X))};static \u0275prov=B({token:i,factory:i.\u0275fac,providedIn:"root"})};function Me(i,t){if(i&1){let e=b();r(0,"button",5),x("click",function(){g(e);let s=m();return u(s.toggleView())}),l(1," Show More "),c(2,"i",6),o()}}function je(i,t){if(i&1){let e=b();r(0,"div",3)(1,"button",7),x("click",function(){g(e);let s=m();return u(s.navigateProjects("prev"))}),l(2," \u2190 "),o(),r(3,"button",7),x("click",function(){g(e);let s=m();return u(s.navigateProjects("next"))}),l(4," \u2192 "),o()()}if(i&2){let e=m();a(),I("disabled",e.currentProjectIndex===0),a(2),I("disabled",e.currentProjectIndex>=e.gitHubRepos.length-e.projectsToShow)}}function Te(i,t){if(i&1){let e=b();r(0,"div",10)(1,"div",13),c(2,"img",14),r(3,"h3",15),l(4),o(),r(5,"p",16),l(6),o(),r(7,"button",5),x("click",function(){let s=g(e).$implicit,p=m(2);return u(p.openExternalLink(s.html_url))}),l(8," Read more \u2192 "),o()()()}if(i&2){let e=t.$implicit;a(2),I("src",e.readmeImageUrl,R)("alt",e.name),a(2),d(e.name),a(2),d(e.description)}}function Ae(i,t){if(i&1){let e=b();r(0,"div",10)(1,"div",13),c(2,"img",14),r(3,"h3",15),l(4),o(),r(5,"p",16),l(6),o(),r(7,"button",5),x("click",function(){let s=g(e).$implicit,p=m(2);return u(p.openExternalLink(s.html_url))}),l(8," Read more \u2192 "),o()()()}if(i&2){let e=t.$implicit;a(2),I("src",e.readmeImageUrl,R)("alt",e.name),a(2),d(e.name),a(2),d(e.description)}}function Re(i,t){i&1&&(r(0,"div",12)(1,"p",17),l(2,"Loading projects..."),o()())}function Fe(i,t){if(i&1&&(r(0,"div",4)(1,"div",8)(2,"div",9),f(3,Te,9,4,"div",10,P),o(),r(5,"div",11),f(6,Ae,9,4,"div",10,P),o()(),_(8,Re,3,0,"div",12),o()),i&2){let e=m();a(3),h(e.gitHubRepos),a(3),h(e.gitHubRepos),a(2),y(e.gitHubRepos.length?-1:8)}}function Oe(i,t){if(i&1){let e=b();r(0,"div",19)(1,"div",23),c(2,"img",24),r(3,"h3",25),l(4),o(),r(5,"p",26),l(6),o(),r(7,"button",27),x("click",function(){let s=g(e).$implicit,p=m(2);return u(p.openExternalLink(s.html_url))}),l(8," Read more \u2192 "),o()()()}if(i&2){let e=t.$implicit;a(2),I("src",e.readmeImageUrl,R)("alt",e.name),a(2),d(e.name),a(2),d(e.description)}}function Ve(i,t){if(i&1){let e=b();r(0,"div",18),f(1,Oe,9,4,"div",19,P),o(),r(3,"div",20)(4,"button",21),x("click",function(){g(e);let s=m();return u(s.toggleView())}),l(5," Show Less "),c(6,"i",22),o()()}if(i&2){let e=m();a(),h(e.visibleProjects)}}var Z=class i{gitHubService=N(Q);isGridView=!1;currentProjectIndex=0;projectsToShow=8;gitHubRepos=[];ngOnInit(){this.gitHubService.getUserReposWithReadmeImage("jdev-king").pipe(E(t=>t.filter(e=>!e.fork))).subscribe(t=>{this.gitHubRepos=t,console.log(this.gitHubRepos)})}toggleView(){this.isGridView=!this.isGridView}get visibleProjects(){let t=[];for(let e=0;e<this.projectsToShow;e++){let n=this.currentProjectIndex+e;n<this.gitHubRepos.length&&t.push(this.gitHubRepos[n])}return t}navigateProjects(t){t==="next"?this.currentProjectIndex=(this.currentProjectIndex+8)%this.gitHubRepos.length:t==="prev"&&(this.currentProjectIndex=(this.currentProjectIndex-8+this.gitHubRepos.length)%this.gitHubRepos.length)}openExternalLink(t){window.open(t,"_blank")}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=v({type:i,selectors:[["app-projects"]],decls:7,vars:3,consts:[[1,"flex","justify-between","items-center","mb-8"],[1,"text-4xl","font-mono"],[1,"text-white","border","border-gray-700","px-4","py-2","rounded-full","hover:bg-gray-800","transition-colors"],[1,"flex","space-x-4"],[1,"w-full","inline-flex","flex-nowrap","overflow-hidden","p-[0.5rem]","[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]"],[1,"text-white","border","border-gray-700","px-4","py-2","rounded-full","hover:bg-gray-800","transition-colors",3,"click"],[1,"fa-solid","fa-plus"],[1,"p-2","rounded-full","border","border-gray-700","hover:bg-gray-800","transition-colors","disabled:opacity-50","disabled:cursor-not-allowed",3,"click","disabled"],[1,"flex","whitespace-nowrap","animate-marquee","hover:pause"],[1,"flex","shrink-0"],[1,"w-[400px]","mx-4"],["aria-hidden","true",1,"flex","shrink-0"],[1,"flex","justify-center","items-center","h-48"],[1,"bg-gray-900","rounded-lg","p-6","transition-all","duration-300","hover:scale-105","hover:shadow-xl"],[1,"rounded-lg","mb-4","w-full","h-48","object-contain",3,"src","alt"],[1,"text-xl","mb-2"],[1,"text-gray-400","mb-4","text-wrap"],[1,"text-gray-400"],[1,"mb-8","grid","grid-cols-1","sm:grid-cols-2","md:grid-cols-3","lg:grid-cols-4","gap-4","md:gap-6"],[1,"w-full"],[1,"flex","justify-center","mb-8"],[1,"text-white","border","border-gray-700","px-6","py-3","rounded-full","hover:bg-gray-800","transition-colors",3,"click"],[1,"fa-solid","fa-chevron-up"],[1,"bg-gray-900","rounded-lg","p-4","md:p-6","transition-all","duration-300","hover:scale-105","hover:shadow-xl"],[1,"rounded-lg","mb-3","md:mb-4","w-full","h-36","sm:h-48","object-contain",3,"src","alt"],[1,"text-lg","md:text-xl","mb-2"],[1,"text-gray-400","text-sm","md:text-base","mb-3","md:mb-4"],[1,"w-full","sm:w-auto","text-white","border","border-gray-700","px-3","md:px-4","py-2","rounded-full","hover:bg-gray-800","transition-colors","text-sm","md:text-base",3,"click"]],template:function(e,n){e&1&&(r(0,"div",0)(1,"h2",1),l(2,"Projects"),o(),_(3,Me,3,0,"button",2)(4,je,5,2,"div",3),o(),_(5,Fe,9,1,"div",4)(6,Ve,7,0)),e&2&&(a(3),y(n.isGridView?4:3),a(2),y(n.isGridView?-1:5),a(),y(n.isGridView?6:-1))},dependencies:[C],styles:["@keyframes _ngcontent-%COMP%_marquee{0%{transform:translate(0)}to{transform:translate(-50%)}}.animate-marquee[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_marquee 20s linear infinite}.animate-marquee[_ngcontent-%COMP%]:hover{animation-play-state:paused}.project-enter[_ngcontent-%COMP%]{opacity:0;transform:translate(20px)}.project-enter-active[_ngcontent-%COMP%]{opacity:1;transform:translate(0);transition:opacity .3s,transform .3s}"]})};function Ue(i,t){if(i&1){let e=b();r(0,"div",7),x("click",function(){let s=g(e).$implicit,p=m();return u(p.openSidebar(s))}),r(1,"div")(2,"div",8),l(3),V(4,"date"),V(5,"date"),o(),r(6,"p",9),l(7),o()(),r(8,"div")(9,"a",10),l(10),c(11,"i",11),o()(),r(12,"div"),l(13),o()()}if(i&2){let e=t.$implicit,n=m();a(3),q(" ",U(4,7,e.startDate,"YYYY")," - ",e.endDate.getUTCDay()==n.currentDate.getUTCDay()?"Currently":U(5,10,e.endDate,"YYYY")," "),a(4),M(" ",n.calculateDuration(e.startDate,e.endDate)," "),a(2),ge("href",e.companyUrl,R),a(),d(e.company),a(3),q("",e.position," | ",e.tech.join(", "),"")}}function We(i,t){if(i&1&&(r(0,"span",18),l(1),o()),i&2){let e=t.$implicit;a(),M(" ",e," ")}}function He(i,t){if(i&1&&(r(0,"li"),l(1),o()),i&2){let e=t.$implicit;a(),d(e)}}function $e(i,t){if(i&1){let e=b();r(0,"div",5)(1,"div",12)(2,"h3",13),l(3),o(),r(4,"button",14),x("click",function(){g(e);let s=m();return u(s.closeSidebar())}),l(5,"\u2715"),o()(),r(6,"div",2)(7,"div")(8,"h4",15),l(9,"Position"),o(),r(10,"p",16),l(11),o()(),r(12,"div")(13,"h4",15),l(14,"Duration"),o(),r(15,"p",16),l(16),V(17,"date"),V(18,"date"),o()(),r(19,"div")(20,"h4",15),l(21,"Technologies"),o(),r(22,"div",17),f(23,We,2,1,"span",18,P),o()(),r(25,"div")(26,"h4",15),l(27,"Description"),o(),r(28,"p",16),l(29),o()(),r(30,"div")(31,"h4",15),l(32,"Key Responsibilities"),o(),r(33,"ul",19),f(34,He,2,1,"li",null,P),o()()()()}if(i&2){let e,n,s,p,k,ae,S=m();a(3),d((e=S.selectedWork())==null?null:e.company),a(8),d((n=S.selectedWork())==null?null:n.position),a(5),q(" ",U(17,5,(s=S.selectedWork())==null?null:s.startDate,"MMM YYYY")," - ",(s=S.selectedWork())!=null&&s.endDate?U(18,8,(s=S.selectedWork())==null?null:s.endDate,"MMM YYYY"):"Present"," "),a(7),h((p=S.selectedWork())==null?null:p.tech),a(6),d((k=S.selectedWork())==null?null:k.description),a(5),h((ae=S.selectedWork())==null?null:ae.responsibilities)}}function Le(i,t){if(i&1){let e=b();r(0,"div",20),x("click",function(){g(e);let s=m();return u(s.closeSidebar())}),o()}}var ee=class i{sidebarVisible=ne(!1);selectedWork=ne(null);currentDate=new Date;workExperience=[{startDate:new Date("2024-07"),endDate:new Date,company:"Sintad",companyUrl:"https://www.sintad.pe/",position:"Full Stack Developer (Semi-Senior) & AI Specialist",tech:["Flask","Pinecone","Flowise","Vertex AI","Angular"],description:"Leading the design, development, and implementation of AI-driven solutions to optimize business processes and enhance system efficiency. Spearheading the integration of machine learning models, automation tools, and AI-assisted development workflows to improve performance, reduce manual effort, and drive innovation across multiple ERP modules.",responsibilities:["Designed and deployed a scalable OCR service using Google Cloud Document AI, reducing manual processing time by 40%.","Developed and implemented an automated customer service solution with LLM\xB4s & RAG, achieving a 60% reduction in human intervention.","Integrated Aider Chat for AI-assisted pair programming across all ERP modules, enhancing development efficiency and code quality by 40%.","Migrated company products to Angular 17, improving system performance by 20% and reducing technical debt.","Refactored production systems, achieving a 90% issue resolution rate and minimizing downtime."]},{startDate:new Date("2024-04"),endDate:new Date("2024-10"),company:"Hebrax IMS",companyUrl:"https://hebrax-ims.com/",position:"Co-Founder & CTO",tech:["FastAPI","LLM\xB4s","Angular","Firebase"],description:"Driving the development of AI-powered solutions and scalable web architectures to enhance automation, system performance, and user experience. Leading the design and deployment of GPT-4 conversational agents, optimizing customer interactions through seamless integration. Architecting high-performance web platforms with modern frameworks, ensuring efficiency and accelerated delivery. Enhancing UI/UX processes with prototyping tools to streamline development and improve client satisfaction. Establishing robust code quality standards to increase maintainability and reduce defects across development workflows.",responsibilities:["Built GPT-4-powered conversational agents, automating 30% of customer interactions with seamless system integration.","Designed the architecture for a scalable dermatological web platform, delivering the project 20% ahead of schedule.","Integrated Angular 17, FastAPI, and GCP to enhance system performance by 15%.","Prototyped UI designs in Figma, reducing development revisions by 25% and increasing client satisfaction.","Established code quality standards using Husky, Prettier, and ESLint, improving maintainability and reducing defects by 30%."]},{startDate:new Date("2022-12"),endDate:new Date("2024-06"),company:"Sintad",companyUrl:"https://www.sintad.pe/",position:"Full Stack Developer (Junior)",tech:["Angular","Kotlin","SpringBoot"],description:"Leading the development and optimization of backend and frontend functionalities to enhance system performance and user experience. Implementing robust testing strategies with Mockito and Jest, achieving 90% code coverage and reducing production bugs. Driving codebase refactoring efforts to minimize technical debt and improve maintainability. Designing and developing mobile applications with Kotlin, streamlining operational workflows and increasing efficiency.",responsibilities:["Developed and enhanced backend and frontend functionalities, improving system efficiency and user experience.","Created unit tests with Mockito and Jest, achieving 90% code coverage and reducing production bugs by 20%.","Refactored the codebase, reducing technical debt by 25%.","Designed and implemented a mobile app with Kotlin, streamlining driver tasks and improving operational efficiency."]},{startDate:new Date("2021-12"),endDate:new Date("2022-03"),company:"Sintad",companyUrl:"https://www.sintad.pe/",position:"Full Stack Developer (Junior)",tech:["Angular","SpringBoot"],description:"Development and optimization of backend and frontend functionalities to enhance system performance and user experience",responsibilities:["Developed key functionalities, including trip tracking, trip incident management, and the creation and editing of transport orders, improving operational efficiency by 15%."]}];calculateDuration(t,e){let n=new Date,s=((e.getUTCDay()===n.getUTCDay()?n.getTime():e.getTime())-t.getTime())/(1e3*60*60*24*30.44),p=Math.floor(s/12),k=Math.floor(s%12);return p>0?`${p} year${p>1?"s":""}${k>0?` ${k} month${k>1?"s":""}`:""}`:`${k} month${k>1?"s":""}`}openSidebar(t){this.selectedWork.set(t),this.sidebarVisible.set(!0)}closeSidebar(){this.sidebarVisible.set(!1),setTimeout(()=>{this.selectedWork.set(null)},300)}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=v({type:i,selectors:[["app-work"]],decls:9,vars:6,consts:[[1,"relative"],[1,"text-4xl","font-mono","mb-8"],[1,"space-y-4"],[1,"grid","grid-cols-[0.5fr_1fr_1fr]","gap-4","border-b","border-gray-800","pb-4","rounded-lg","hover:bg-gray-200","hover:text-gray-900","transition-colors","group"],[1,"fixed","top-0","right-0","h-full","w-full","md:w-[60dvw]","lg:w-[40dvw]","bg-gray-900","transform","transition-transform","duration-300","ease-in-out","z-50","overflow-y-auto"],[1,"p-6"],[1,"fixed","inset-0","backdrop-blur-sm","bg-black/30","transition-opacity","z-40"],[1,"grid","grid-cols-[0.5fr_1fr_1fr]","gap-4","border-b","border-gray-800","pb-4","rounded-lg","hover:bg-gray-200","hover:text-gray-900","transition-colors","group",3,"click"],[1,"text-gray-400","group-hover:text-gray-900","pl-2"],[1,"text-sm","text-gray-500","group-hover:text-gray-900","pl-2"],["target","_blank",1,"hover:text-blue-900",3,"href"],[1,"fa-regular","fa-share-from-square","ml-2"],[1,"flex","justify-between","items-center","mb-6"],[1,"text-2xl","font-mono"],[1,"text-gray-400","hover:text-white",3,"click"],[1,"text-gray-400","pb-1"],[1,"text-white"],[1,"flex","flex-wrap","gap-2","mt-2"],[1,"px-2","py-1","bg-gray-800","rounded-md","text-sm"],[1,"list-disc","list-inside","text-white","space-y-2"],[1,"fixed","inset-0","backdrop-blur-sm","bg-black/30","transition-opacity","z-40",3,"click"]],template:function(e,n){e&1&&(r(0,"div",0)(1,"h2",1),l(2,"Work"),o(),r(3,"div",2),f(4,Ue,14,13,"div",3,D),o(),r(6,"div",4),_(7,$e,36,11,"div",5),o(),_(8,Le,1,0,"div",6),o()),e&2&&(a(4),h(n.workExperience),a(2),Y("translate-x-0",n.sidebarVisible())("translate-x-full",!n.sidebarVisible()),a(),y(n.selectedWork()?7:-1),a(),y(n.sidebarVisible()?8:-1))},dependencies:[C,he],styles:["[_nghost-%COMP%]{display:block}.sidebar[_ngcontent-%COMP%]{z-index:2000}.overlay[_ngcontent-%COMP%]{z-index:40}"]})};var te=class i{constructor(t){this.http=t}MEDIUM_FEED_URL="https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/";getUserPosts(t){return this.http.get(`${this.MEDIUM_FEED_URL}@${t}`).pipe(E(e=>e.items.map(n=>({title:n.title,author:n.author,pubDate:new Date(n.pubDate),link:n.link,content:n.content,thumbnail:n.thumbnail,categories:n.categories}))))}getPublicationPosts(t){return this.http.get(`${this.MEDIUM_FEED_URL}${t}`).pipe(E(e=>e.items.map(n=>({title:n.title,author:n.author,pubDate:new Date(n.pubDate),link:n.link,content:n.content,thumbnail:n.thumbnail,categories:n.categories}))))}getMultipleUsersPosts(t){return t.map(e=>this.getUserPosts(e))}static \u0275fac=function(e){return new(e||i)(G(X))};static \u0275prov=B({token:i,factory:i.\u0275fac,providedIn:"root"})};var _e={production:!0,apiUrl:"http://localhost:3000/api",featureFlags:{enableNewUI:!1,enableAnalytics:!1},version:"1.0.0",defaultLanguage:"en",mediumUser:"jdev-king"};function oe(i,t){let e=j({},i);for(let n in t)t.hasOwnProperty(n)&&(t[n]&&typeof t[n]=="object"&&!Array.isArray(t[n])&&typeof i[n]=="object"?e[n]=oe(i[n],t[n]):e[n]=t[n]);return e}var ze={apiUrl:"http://dev-api.example.com",featureFlags:{enableNewUI:!0}},ye=oe(_e,ze);function Be(i,t){if(i&1){let e=b();r(0,"button",5),x("click",function(){let s=g(e).$index,p=m();return u(p.setArticlePage(s+1))}),l(1),o()}if(i&2){let e=t.$index,n=m();Y("text-white",n.currentArticlePage===e+1)("text-gray-500",n.currentArticlePage!==e+1)("bg-gray-800",n.currentArticlePage===e+1),a(),M(" ",e+1," ")}}function Ge(i,t){if(i&1&&(r(0,"span",11),l(1),o()),i&2){let e=t.$implicit;a(),M(" ",e," ")}}function Ne(i,t){if(i&1&&(r(0,"div",8),f(1,Ge,2,1,"span",11,D),o()),i&2){let e=m().$implicit;a(),h(e.categories)}}function Ye(i,t){if(i&1){let e=b();r(0,"div",4)(1,"h3",6),l(2),o(),r(3,"p",7),l(4,"EXAMPLE DESCRIPTION TEMPORARY"),o(),_(5,Ne,3,0,"div",8),r(6,"div",9)(7,"button",10),x("click",function(){let s=g(e).$implicit,p=m();return u(p.openExternalLink(s.link))}),l(8," Read more \u2192 "),o()()()}if(i&2){let e=t.$implicit;a(2),d(e.title),a(3),y(e.categories.length?5:-1)}}var ie=class i{mediumService=N(te);currentArticlePage=1;articlesPerPage=4;articles=[];ngOnInit(){this.mediumService.getUserPosts(ye.mediumUser).subscribe(t=>{this.articles=t})}get visibleArticles(){let t=(this.currentArticlePage-1)*this.articlesPerPage;return this.articles.slice(t,t+this.articlesPerPage)}getPageNumbers(){let t=Math.ceil(this.articles.length/this.articlesPerPage);return Array.from({length:t},(e,n)=>n+1)}setArticlePage(t){this.currentArticlePage=t}openExternalLink(t){window.open(t,"_blank")}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=v({type:i,selectors:[["app-articles"]],decls:8,vars:0,consts:[[1,"text-4xl","font-mono","mb-12","text-right"],[1,"flex","gap-4","mb-8"],[1,"w-8","h-8","rounded-full","border","border-gray-700","flex","items-center","justify-center","transition-colors","hover:text-white","hover:bg-gray-800",3,"text-white","text-gray-500","bg-gray-800"],[1,"grid","grid-cols-2","gap-6"],[1,"bg-[#111111]","rounded-3xl","p-8","flex","flex-col","transform","transition-all","duration-300","hover:scale-105"],[1,"w-8","h-8","rounded-full","border","border-gray-700","flex","items-center","justify-center","transition-colors","hover:text-white","hover:bg-gray-800",3,"click"],[1,"text-xl","font-mono","mb-4"],[1,"text-gray-400","mb-2","flex-grow"],[1,"article-list"],[1,"flex","items-center","justify-end"],[1,"text-white","bg-transparent","hover:bg-gray-800","transition-colors","px-6","py-2","rounded-full","border","border-gray-700",3,"click"],[1,"article-tag"]],template:function(e,n){e&1&&(r(0,"h2",0),l(1,"Articles"),o(),r(2,"div",1),f(3,Be,2,7,"button",2,D),o(),r(5,"div",3),f(6,Ye,9,2,"div",4,P),o()),e&2&&(a(3),h(n.getPageNumbers()),a(3),h(n.visibleArticles))},dependencies:[C],styles:[".article-list[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:.25rem;margin-bottom:.5rem}.article-tag[_ngcontent-%COMP%]{background-color:#1e293b;color:#94a3b8;font-size:.75rem;padding:.25rem .5rem;border-radius:9999px}"]})};var Ce=class i{static \u0275fac=function(e){return new(e||i)};static \u0275cmp=v({type:i,selectors:[["app-home"]],decls:11,vars:0,consts:[[1,"min-h-screen","bg-black","text-white","p-8"],["id","hero-section",1,"mb-16"],["id","projects",1,"mb-16"],["id","skills",1,"mb-16"],["id","experience",1,"mb-16"],["id","articles",1,"mt-16"]],template:function(e,n){e&1&&(r(0,"div",0)(1,"section",1),c(2,"app-hero-section"),o(),r(3,"section",2),c(4,"app-projects"),o(),r(5,"section",3),c(6,"app-skills"),o(),r(7,"section",4),c(8,"app-work"),o(),r(9,"section",5),c(10,"app-articles"),o()())},dependencies:[C,K,Z,J,ee,ie],encapsulation:2,data:{animation:[be,ve]}})};export{Ce as HomeComponent};
