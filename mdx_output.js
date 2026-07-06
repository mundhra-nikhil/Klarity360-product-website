import {Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs} from "react/jsx-runtime";
function _createMdxContent(props) {
  const _components = {
    a: "a",
    br: "br",
    em: "em",
    h2: "h2",
    h3: "h3",
    img: "img",
    li: "li",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return _jsxs(_Fragment, {
    children: [_jsxs(_components.p, {
      children: ["| ", _jsx(_components.strong, {
        children: "Document Information"
      }), "  | ", _jsx(_components.strong, {
        children: "Details"
      }), "  |\n| --- | --- |\n| Document No.  | White Paper/Klarity360/02/2026/1  |\n| Document Description  | Klarity360 – White Paper |\n| Version No.  | 1.0  |\n| Prepared By  | Kanerika Technical Team  |\n| Reviewed By  | Kanerika Business Team |\n| Release Date  | February 2026  |"]
    }), "\n", _jsx(_components.h2, {
      children: "Contact Details "
    }), "\n", _jsxs(_components.p, {
      children: ["| ", _jsx(_components.strong, {
        children: "Information"
      }), "  | ", _jsx(_components.strong, {
        children: "Details"
      }), "  |\n| --- | --- |\n| Address  | Kanerika Inc., Summit Executive Centre 13706 Research Blvd, Suite 211 D Austin, TX – 78750  |\n| Phone  | +1 224.383.7877  |\n| Website  | ", _jsx(_components.a, {
        href: "https://www.kanerika.com/",
        children: "www.kanerika.com"
      }), "  |\n| Sales E-mail ID  | sales@kanerika.com  |"]
    }), "\n", _jsx(_components.h2, {
      children: _jsx(_components.strong, {
        children: "Klarity360 – Insight Agent"
      })
    }), "\n", _jsx(_components.p, {
      children: "AI-Driven, On-the-Go Analysis and Dashboarding for Everyone"
    }), "\n", _jsx(_components.h2, {
      children: _jsx(_components.strong, {
        children: "Abstract"
      })
    }), "\n", _jsxs(_components.p, {
      children: ["In today’s fast-paced, data-driven world, decision-makers are often restricted by the technical limitations of traditional data analysis tools. ", _jsx(_components.em, {
        children: "Klarity360 – Insight Agent"
      }), " addresses these limitations with an intelligent, intuitive system that allows users to perform powerful data analysis and visualization using only natural language. Klarity360 removes the need for SQL knowledge or coding experience, eliminating the steep learning curve and empowering all stakeholders to access insights instantly. This document mainly outlines Klarity360's architecture, capabilities, and cost-effective advantages over conventional methods."]
    }), "\n", _jsx(_components.h2, {
      children: _jsx(_components.strong, {
        children: "1. Problem Statement"
      })
    }), "\n", _jsx(_components.p, {
      children: "Modern enterprises require quick, flexible access to data insights, yet traditional tools demand SQL expertise, deep dashboard configuration skills, and complex workflows. Business users, analysts, and domain experts struggle to interact directly with their data."
    }), "\n", _jsxs(_components.p, {
      children: [_jsx(_components.strong, {
        children: "Klarity360"
      }), " resolves this gap by offering:"]
    }), "\n", _jsxs(_components.ul, {
      children: ["\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "On-the-go analysis and dashboarding"
        }), " via natural language"]
      }), "\n", _jsx(_components.li, {
        children: "Elimination of the \"understanding layer\" needed to create visualizations"
      }), "\n", _jsx(_components.li, {
        children: "A unified, modular AI-powered platform accessible to everyone"
      }), "\n"]
    }), "\n", _jsx(_components.p, {
      children: _jsx(_components.img, {
        src: "/images/extracted/img_46d24b4a.png",
        alt: ""
      })
    }), "\n", _jsx(_components.h2, {
      children: _jsx(_components.strong, {
        children: "2. System Overview"
      })
    }), "\n", _jsxs(_components.p, {
      children: [_jsx(_components.em, {
        children: "Klarity360 – Insight Agent"
      }), " is an enterprise-grade AI analytics platform that enables natural language–driven data analysis, visualization, and insights generation over governed enterprise data. The system is designed with a modular, secure, and scalable architecture, leveraging Microsoft Fabric as the central data and analytics backbone. It integrates:"]
    }), "\n", _jsxs(_components.ul, {
      children: ["\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Natural Language–driven analytics orchestration"
        }), " using large language models for intent understanding and reasoning."]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Semantic retrieval and context-aware processing"
        }), " to enrich user queries with relevant data and historical context."]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Dynamic workflow orchestration"
        }), ", where the backend determines the appropriate execution path based on user intent."]
      }), "\n"]
    }), "\n", _jsx(_components.p, {
      children: _jsx(_components.img, {
        src: "/images/extracted/img_b43b22c3.png",
        alt: ""
      })
    }), "\n", _jsx(_components.h2, {
      children: _jsx(_components.strong, {
        children: "3. Available Components"
      })
    }), "\n", _jsx(_components.h3, {
      children: _jsx(_components.strong, {
        children: "3.1 NL2SQL Engine"
      })
    }), "\n", _jsxs(_components.ul, {
      children: ["\n", _jsxs(_components.li, {
        children: ["A trained model using ", _jsx(_components.strong, {
          children: "Retrieval-Augmented Generation (RAG)"
        }), " based approach is used to translate natural language into SQL."]
      }), "\n", _jsx(_components.li, {
        children: "Executes queries on the client’s Lakehouse / warehouse using OneLake capabilities and stores the resultant temporary tables in client’s environment for further drill downs."
      }), "\n"]
    }), "\n", _jsx(_components.p, {
      children: _jsx(_components.img, {
        src: "/images/extracted/img_737f3cbe.png",
        alt: ""
      })
    }), "\n", _jsx(_components.h3, {
      children: _jsx(_components.strong, {
        children: "3.2 Dynamic Workflow Orchestration"
      })
    }), "\n", _jsx(_components.p, {
      children: "Based on the nature of the request, the system intelligently routes execution to one of the following paths:"
    }), "\n", _jsxs(_components.ul, {
      children: ["\n", _jsx(_components.li, {
        children: "Interactive chart and visualization generation"
      }), "\n", _jsx(_components.li, {
        children: "Structured question answering over the datasets"
      }), "\n", _jsx(_components.li, {
        children: "Analytical and statistical analysis using fabric capacity backed data execution."
      }), "\n"]
    }), "\n", _jsx(_components.p, {
      children: _jsx(_components.img, {
        src: "/images/extracted/img_d5978f84.png",
        alt: ""
      })
    }), "\n", _jsx(_components.h2, {
      children: _jsx(_components.strong, {
        children: "4. Dynamic Workflow Modules"
      })
    }), "\n", _jsx(_components.h3, {
      children: _jsx(_components.strong, {
        children: "4.1 Visualization Module"
      })
    }), "\n", _jsxs(_components.ul, {
      children: ["\n", _jsxs(_components.li, {
        children: ["Leverages LLMs to generate code in ", _jsx(_components.strong, {
          children: "Plotly"
        }), ", ", _jsx(_components.strong, {
          children: "Matplotlib"
        }), ", ", _jsx(_components.strong, {
          children: "Seaborn"
        }), ", and more."]
      }), "\n", _jsxs(_components.li, {
        children: ["The Chart Generation and Explanation Process in Klarity360 begins by interpreting the user's query to decide the appropriate workflow. Once the flow is determined, the system ", _jsx(_components.strong, {
          children: "creates the chart"
        }), " using suitable libraries."]
      }), "\n", _jsxs(_components.li, {
        children: ["Simultaneously, it leverages LLM to ", _jsx(_components.strong, {
          children: "generate a natural-language explanation"
        }), " that summarizes the insights depicted in the chart. Finally, both the chart and its explanation are returned to the user, enabling a seamless and intuitive experience from query to visual insight - without requiring any technical expertise."]
      }), "\n"]
    }), "\n", _jsx(_components.p, {
      children: _jsx(_components.img, {
        src: "/images/extracted/img_0af2de25.png",
        alt: ""
      })
    }), "\n", _jsx(_components.h3, {
      children: _jsx(_components.strong, {
        children: "4.2 Data Discovery Module"
      })
    }), "\n", _jsx(_components.p, {
      children: "Klarity360 allows you to ask questions about your data just like talking to a human and get answers without writing any code. Here's how it works behind the scenes:"
    }), "\n", _jsxs(_components.ul, {
      children: ["\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Bringing in Your Data"
        }), ": Klarity360 can read data from sources like user’s lakehouses/warehouses and uses it for analysis by creating temporary tables and enable on-the-go code executions on the data."]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Understanding Your Question"
        }), ": When you type your question (like ", _jsx(_components.em, {
          children: "“What were the sales in Q3?”"
        }), "), Klarity360 understands exactly what you are asking and which parts of the data it should look at."]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Generating the Answer"
        }), ": Based on your question, Klarity360 writes the necessary code (in Python). It runs this code safely behind the scenes on the user’s Lakehouse to avoid any data movement out of fabric."]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Showing Results Clearly"
        }), ": Klarity360 then shows you the answer in an easy-to-understand format either a table or points to effectively communicate the findings to the user."]
      }), "\n"]
    }), "\n", _jsx(_components.p, {
      children: _jsx(_components.img, {
        src: "/images/extracted/img_f418b6df.png",
        alt: ""
      })
    }), "\n", _jsx(_components.h3, {
      children: _jsx(_components.strong, {
        children: "4.3 Analytical and Statistical Analysis Module"
      })
    }), "\n", _jsx(_components.p, {
      children: "Klarity360 helps you make sense of complex data - like sales numbers, campaign results, or customer segments - by turning your natural language questions into deep, data-driven insights. Here’s how the analysis process works in simple terms:"
    }), "\n", _jsxs(_components.ul, {
      children: ["\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Understands What You Want to Analyse"
        }), _jsx(_components.br, {}), "\n", "When you ask a question (like ", _jsx(_components.em, {
          children: "“How did Q3 2023 sales perform?”"
        }), "), Klarity360 figures out which part of the data you’re focusing on - such as the ", _jsx(_components.em, {
          children: "sales"
        }), " column or ", _jsx(_components.em, {
          children: "regions"
        }), " - to begin the analysis."]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Finds What’s Related"
        }), _jsx(_components.br, {}), "\n", "Klarity360 doesn’t just look at one column, it automatically finds other related data points (e.g., product type, channel, region) that might influence the results. This helps uncover hidden patterns or connections."]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Compares Different Time Periods"
        }), _jsx(_components.br, {}), "\n", "To give you context, Klarity360 compares your focus area (like ", _jsx(_components.em, {
          children: "Q3 2023"
        }), ") with a related period (like ", _jsx(_components.em, {
          children: "Q2 2023"
        }), "). This way, you can see trends - what improved, what dropped, and by how much."]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Summarizes the Numbers Smartly"
        }), _jsx(_components.br, {}), "\n", "Instead of dumping raw data, Klarity360 gives you clean summaries - like averages, highs/lows, and trends - so you quickly grasp the story without sifting through rows and columns."]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Digs into Non-Numeric Insights Too"
        }), _jsx(_components.br, {}), "\n", "It doesn't stop at numbers. If your data includes categories (like ", _jsx(_components.em, {
          children: "campaign name"
        }), ", ", _jsx(_components.em, {
          children: "platform"
        }), ", or ", _jsx(_components.em, {
          children: "audience type"
        }), "), Klarity360 asks smart follow-up questions - such as ", _jsx(_components.em, {
          children: "“Which platform had the highest conversion rate?”"
        }), " - and answers them too."]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Gives You a Ready-to-Use Report"
        }), _jsx(_components.br, {}), "\n", "Once all this is done, Klarity360 puts everything together into a clear, easy-to-understand report that blends numbers, trends, and explanations. You can use this report as-is for team discussions, presentations, or decision-making."]
      }), "\n", _jsx(_components.li, {
        children: "Klarity360 also supports out-of-the-box analyses such as Market Basket Analysis, Cohort Analysis, and Funnel Analysis."
      }), "\n"]
    }), "\n", _jsx(_components.p, {
      children: _jsx(_components.img, {
        src: "/images/extracted/img_4ea4e85e.png",
        alt: ""
      })
    }), "\n", _jsx(_components.h2, {
      children: _jsx(_components.strong, {
        children: "5. Advantages Over Conventional Methods"
      })
    }), "\n", _jsxs(_components.p, {
      children: [_jsx(_components.strong, {
        children: "Klarity360 democratizes data access"
      }), ", enabling every user to create dashboards and insights instantly without relying on technical teams."]
    }), "\n", _jsx(_components.p, {
      children: "| Feature | Traditional Tools | Klarity360 |\n| --- | --- | --- |\n| Requires SQL Knowledge | Users must know SQL or depend on technical teams to write queries and retrieve data. | No technical knowledge required; users simply type their questions in plain English. |\n| Manual Dashboard Configuration | Dashboards often require manual setup, drag-and-drop configurations, filters, and parameters. | Reports are generated automatically using LLMs based on the user’s intent. |\n| Custom Visualizations | Users are limited to predefined chart types offered by the tool (e.g., bar, pie, line). | Supports multiple libraries (e.g., Plotly, Seaborn), allowing rich, tailored visuals. |\n| Data Exploration | Exploration is often static. Requires refreshing filters or creating new views manually. | Exploration is dynamic and conversational, ask follow-up questions and dive deeper. |"
    }), "\n", _jsx(_components.p, {
      children: "| Accessibility | Mostly accessible to data analysts, BI developers, or trained professionals. | Open to everyone - marketers, sales teams, product managers, and CXOs alike. |"
    }), "\n", _jsx(_components.h2, {
      children: _jsx(_components.strong, {
        children: "6. Security and Data Protection Model"
      })
    }), "\n", _jsxs(_components.p, {
      children: ["The Klarity360 on Fabric workload is designed with a ", _jsx(_components.strong, {
        children: "privacy-first and data-minimization"
      }), " security model, ensuring that customer data remains within the client’s Microsoft Fabric environment at all times."]
    }), "\n", _jsxs(_components.p, {
      children: [_jsx(_components.strong, {
        children: "Metadata-Only Access for AI Processing"
      }), ":"]
    }), "\n", _jsx(_components.p, {
      children: "For Natural Language to SQL (NL2SQL) capabilities, the application accesses only metadata from the connected Fabric Lakehouse. This includes:"
    }), "\n", _jsxs(_components.ul, {
      children: ["\n", _jsx(_components.li, {
        children: "Table and column names"
      }), "\n", _jsx(_components.li, {
        children: "Foreign and Primary Key information."
      }), "\n", _jsx(_components.li, {
        children: "Data types"
      }), "\n", _jsx(_components.li, {
        children: "Schema Structure"
      }), "\n"]
    }), "\n", _jsx(_components.p, {
      children: "No factual or row-level data is exposed to the Large Language Model (LLM) or transmitted to the Kanerika-hosted services during query interpretation."
    }), "\n", _jsx(_components.h2, {
      children: "Secure Dynamic Workflow Orchestration:"
    }), "\n", _jsx(_components.p, {
      children: "When a request requires analytical or programmatic execution:"
    }), "\n", _jsxs(_components.ul, {
      children: ["\n", _jsx(_components.li, {
        children: "The system generates SQL using metadata-only context."
      }), "\n", _jsx(_components.li, {
        children: "The SQL is executed entirely within the client's Fabric capacity."
      }), "\n", _jsx(_components.li, {
        children: "The resulting dataset is materialized as a temporary, scoped result table within Fabric."
      }), "\n"]
    }), "\n", _jsx(_components.p, {
      children: "This enables Zero-Data movement from OneLake, while providing reliable and scalable solution for clients."
    }), "\n", _jsx(_components.h2, {
      children: "Client-Side Execution and Data Residency:"
    }), "\n", _jsx(_components.p, {
      children: "All generated Python code is executed inside the customer’s Fabric environment, ensuring:"
    }), "\n", _jsxs(_components.ul, {
      children: ["\n", _jsx(_components.li, {
        children: "Data residency remains unchanged"
      }), "\n", _jsx(_components.li, {
        children: "Compute and execution stay within enterprise-controlled boundaries"
      }), "\n", _jsx(_components.li, {
        children: "No raw or intermediate datasets are transferred externally"
      }), "\n"]
    }), "\n", _jsx(_components.p, {
      children: "Only the minimum required output (such as aggregated values, chart specifications, or analytical summaries) is returned to the backend to construct the user response."
    }), "\n", _jsx(_components.h2, {
      children: "Controlled Output and Minimal Data Exposure:"
    }), "\n", _jsx(_components.p, {
      children: "The system enforces strict output controls:"
    }), "\n", _jsxs(_components.ul, {
      children: ["\n", _jsx(_components.li, {
        children: "Only information necessary to answer the user's request is retrieved"
      }), "\n", _jsx(_components.li, {
        children: "No raw tables or sensitive datasets are exposed"
      }), "\n", _jsx(_components.li, {
        children: "All outputs are transient and request-scoped"
      }), "\n"]
    }), "\n", _jsx(_components.p, {
      children: "This ensures compliance with enterprise security, privacy, and governance expectations."
    }), "\n", _jsx(_components.h2, {
      children: "AI Safety and Responsible AI Controls"
    }), "\n", _jsx(_components.p, {
      children: "The Klarity360 on Fabric platform incorporates built-in AI safety and responsible AI controls to ensure secure, compliant, and trustworthy AI interactions across all workflows."
    }), "\n", _jsx(_components.h2, {
      children: "Input and Output Moderation"
    }), "\n", _jsx(_components.p, {
      children: "The system applies input and output moderation controls to:"
    }), "\n", _jsxs(_components.ul, {
      children: ["\n", _jsx(_components.li, {
        children: "Prevent unsafe, inappropriate, or policy-violating prompts"
      }), "\n", _jsx(_components.li, {
        children: "Validate generated responses before delivery to the user"
      }), "\n", _jsx(_components.li, {
        children: "Enforce enterprise usage guidelines"
      }), "\n"]
    }), "\n", _jsx(_components.p, {
      children: "This ensures consistent and responsible AI behaviour across user interactions."
    }), "\n", _jsx(_components.h2, {
      children: "No Training on Customer Data"
    }), "\n", _jsx(_components.p, {
      children: "Customer data is never used for model training or fine-tuning."
    }), "\n", _jsx(_components.p, {
      children: "All AI interactions are stateless and request-scoped, ensuring that:"
    }), "\n", _jsxs(_components.ul, {
      children: ["\n", _jsx(_components.li, {
        children: "Customer data does not persist beyond execution"
      }), "\n", _jsx(_components.li, {
        children: "No data contributes to future model behaviour"
      }), "\n"]
    }), "\n", _jsx(_components.h2, {
      children: _jsx(_components.strong, {
        children: "7. Real-World Use Cases"
      })
    }), "\n", _jsxs(_components.ul, {
      children: ["\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Marketing Teams"
        }), ": Analyse campaigns, segment performance via natural queries."]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Sales Analysts"
        }), ": Drill into sales trends, comparisons, funnel tracking."]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "CXOs & Stakeholders"
        }), ": Get instant dashboards and reports without dependency on data teams."]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Educators & Researchers"
        }), ": Explore datasets without technical barriers."]
      }), "\n"]
    }), "\n", _jsx(_components.p, {
      children: _jsx(_components.img, {
        src: "/images/extracted/img_c86f9b02.png",
        alt: ""
      })
    }), "\n", _jsx(_components.h2, {
      children: _jsx(_components.strong, {
        children: "8. Conclusion"
      })
    }), "\n", _jsxs(_components.p, {
      children: [_jsx(_components.em, {
        children: "Klarity360 – Insight Agent"
      }), " transforms the way we interact with data. By removing the complexity of SQL and dashboard creation, Klarity360 unlocks the true potential of data for everyone. Whether you are a business user, a data analyst, or a decision-maker, Klarity360 provides a scalable, intelligent, and cost-effective solution to make data-driven decisions accessible, fast, and reliable."]
    }), "\n", _jsx(_components.h2, {
      children: "Product Demos & Overviews"
    }), "\n", _jsx(_components.p, {
      children: "Watch these videos to explore Klarity360's analytical capabilities across different industries and use cases:"
    }), "\n", _jsx(_components.h3, {
      children: "From Data to Decisions"
    }), "\n", _jsx(_components.p, {
      children: "An overview of Klarity360 AI, showing how conversational queries replace complex dashboards and speed up analysis."
    }), "\n", _jsx(_components.h3, {
      children: "Klarity360 the Statistician"
    }), "\n", _jsx(_components.p, {
      children: "A deep dive into connecting Klarity360 to PostgreSQL, generating visualizations, and performing statistical analyses."
    }), "\n", _jsx(_components.h3, {
      children: "Manufacturing Insights"
    }), "\n", _jsx(_components.p, {
      children: "See how Klarity360 monitors plant efficiency (OEE), downtime risks, quality metrics, and supplier performance."
    }), "\n", _jsx(_components.h3, {
      children: "Pharmaceutical Analytics"
    }), "\n", _jsx(_components.p, {
      children: "Analyzing cohort trends, tracking revenue health, and finding profitability issues with plain text queries."
    }), "\n", _jsx(_components.h3, {
      children: "Retail Operations"
    }), "\n", _jsx(_components.p, {
      children: "Tracking sales performance, conversion rates, and dead stock to optimize inventory in retail stores."
    }), "\n", _jsx(_components.h3, {
      children: "FP&A Financial Analysis"
    }), "\n", _jsx(_components.p, {
      children: "Answering complex financial questions regarding top-performing customers and revenue risks in seconds."
    })]
  });
}
export default function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? _jsx(MDXLayout, {
    ...props,
    children: _jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
